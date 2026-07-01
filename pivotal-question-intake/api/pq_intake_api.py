#!/usr/bin/env python3
"""
Pivotal Question intake API.

Receives guided Pivotal Question submissions, stores them in SQLite, and
optionally uses an LLM to critique drafts before final submission.

Environment:
    DB_PATH             SQLite database path
    PQ_INTAKE_API_KEY  Optional write key for protected deployments
    OPENAI_API_KEY     Optional; enables LLM critique when PQ_LLM_MODEL is set
    PQ_LLM_MODEL       Optional model id for critique; no default is assumed
    PQ_ENABLE_LLM_CRITIQUE  Set to "1" to allow public critique calls to use LLM credit
    ALLOWED_ORIGINS    Comma-separated CORS origins
"""

import json
import logging
import os
import sqlite3
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from typing import Any

from flask import Flask, jsonify, make_response, request
from flask_cors import CORS

DB_PATH = os.environ.get("DB_PATH", "/var/lib/unjournal/unjournal_data.db")
API_KEY = os.environ.get("PQ_INTAKE_API_KEY", "")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
PQ_LLM_MODEL = os.environ.get("PQ_LLM_MODEL", "")
PQ_ENABLE_LLM_CRITIQUE = os.environ.get("PQ_ENABLE_LLM_CRITIQUE", "").strip().lower() in {"1", "true", "yes"}
MAX_JSON_BYTES = int(os.environ.get("MAX_PQ_SUBMISSION_BYTES", str(512 * 1024)))
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get(
        "ALLOWED_ORIGINS",
        "https://info.unjournal.org,http://localhost:8000,http://127.0.0.1:8000",
    ).split(",")
    if origin.strip()
]

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
logger = logging.getLogger("pq_intake_api")

app = Flask(__name__)
CORS(
    app,
    origins=ALLOWED_ORIGINS,
    methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "X-API-Key"],
    always_send=False,
    max_age=600,
)

_recent_submissions: dict[str, float] = {}
_recent_critiques: dict[str, float] = {}


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def get_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def ensure_schema(conn: sqlite3.Connection) -> None:
    conn.execute(
        """CREATE TABLE IF NOT EXISTS pivotal_question_submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question_title TEXT NOT NULL,
            question_text TEXT NOT NULL,
            submitter_name TEXT,
            submitter_email TEXT,
            organization TEXT,
            role TEXT,
            topic_area TEXT,
            decision_context TEXT,
            decision_makers TEXT,
            decision_changes TEXT,
            measurement_target TEXT,
            measurement_unit TEXT,
            timeframe TEXT,
            current_belief TEXT,
            evidence_links TEXT,
            public_permission TEXT,
            follow_up_ok INTEGER DEFAULT 1,
            status TEXT DEFAULT 'new',
            quality_score INTEGER,
            critique_json TEXT,
            raw_json TEXT NOT NULL,
            source TEXT DEFAULT 'pivotal_question_intake',
            remote_addr TEXT,
            user_agent TEXT,
            submitted_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )"""
    )
    conn.execute(
        """CREATE INDEX IF NOT EXISTS idx_pq_submissions_status
           ON pivotal_question_submissions(status)"""
    )
    conn.execute(
        """CREATE INDEX IF NOT EXISTS idx_pq_submissions_email
           ON pivotal_question_submissions(submitter_email)"""
    )
    conn.commit()


def clean_text(value: Any, max_len: int = 6000) -> str:
    if value is None:
        return ""
    text = str(value).strip()
    if len(text) > max_len:
        text = text[:max_len]
    return text


def submission_ip() -> str:
    forwarded = request.headers.get("X-Forwarded-For", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.remote_addr or ""


def check_api_key() -> bool:
    if not API_KEY:
        return True
    supplied = request.headers.get("X-API-Key", "")
    return supplied == API_KEY


def too_many_recent_submissions(ip_address: str) -> bool:
    if not ip_address:
        return False
    now = time.time()
    last = _recent_submissions.get(ip_address, 0)
    _recent_submissions[ip_address] = now
    return now - last < 8


def too_many_recent_critiques(ip_address: str) -> bool:
    if not ip_address:
        return False
    now = time.time()
    last = _recent_critiques.get(ip_address, 0)
    _recent_critiques[ip_address] = now
    return now - last < 4


def validate_submission(data: dict[str, Any]) -> tuple[bool, list[str]]:
    errors: list[str] = []

    if clean_text(data.get("website")):
        errors.append("Spam check failed")

    required = {
        "questionTitle": "A short question title is required",
        "questionText": "The pivotal question is required",
        "decisionContext": "Please describe the decision this would inform",
        "measurementTarget": "Please describe what would be measured",
        "measurementUnit": "Please specify units, outcome scale, or observable indicator",
        "decisionChanges": "Please describe what would change under different answers",
    }
    for key, message in required.items():
        if not clean_text(data.get(key)):
            errors.append(message)

    email = clean_text(data.get("submitterEmail"), 320)
    if email and ("@" not in email or "." not in email.split("@")[-1]):
        errors.append("Submitter email does not look valid")

    question_text = clean_text(data.get("questionText"))
    if question_text and len(question_text) < 35:
        errors.append("The question text is too short to evaluate")

    if len(json.dumps(data)) > MAX_JSON_BYTES:
        errors.append("Submission is too large")

    return len(errors) == 0, errors


def heuristic_critique(data: dict[str, Any]) -> dict[str, Any]:
    checks = [
        {
            "id": "measurement",
            "label": "Measurement",
            "field": "measurementTarget",
            "prompt": "Specify the observable outcome and data source.",
            "min_words": 12,
        },
        {
            "id": "unit",
            "label": "Units or scale",
            "field": "measurementUnit",
            "prompt": "Name the unit, denominator, probability scale, or threshold.",
            "min_words": 4,
        },
        {
            "id": "decision",
            "label": "Decision relevance",
            "field": "decisionChanges",
            "prompt": "Say what a funder, policymaker, or organization would do differently.",
            "min_words": 16,
        },
        {
            "id": "timeframe",
            "label": "Timeframe",
            "field": "timeframe",
            "prompt": "Add the relevant year, window, or decision deadline.",
            "min_words": 3,
        },
        {
            "id": "evidence",
            "label": "Existing evidence",
            "field": "evidenceLinks",
            "prompt": "List relevant papers, datasets, forecasts, or expert disagreements.",
            "min_words": 8,
        },
    ]

    issues: list[dict[str, str]] = []
    strengths: list[str] = []
    score = 100

    for check in checks:
        text = clean_text(data.get(check["field"]))
        words = [word for word in text.replace("\n", " ").split(" ") if word.strip()]
        if len(words) < int(check["min_words"]):
            issues.append(
                {
                    "field": str(check["field"]),
                    "label": str(check["label"]),
                    "message": str(check["prompt"]),
                }
            )
            score -= 14
        else:
            strengths.append(str(check["label"]))

    question = clean_text(data.get("questionText"))
    lower_question = question.lower()
    measurable_terms = ["how many", "how much", "probability", "rate", "share", "cost", "effect", "by "]
    if question and not any(term in lower_question for term in measurable_terms):
        issues.append(
            {
                "field": "questionText",
                "label": "Question precision",
                "message": "Try turning the question into a quantity, probability, effect size, cost, rate, or threshold.",
            }
        )
        score -= 12

    if not clean_text(data.get("decisionMakers")):
        issues.append(
            {
                "field": "decisionMakers",
                "label": "Decision maker",
                "message": "Name the actor or class of actors whose decision would change.",
            }
        )
        score -= 8

    score = max(0, min(100, score))
    follow_up_questions = [issue["message"] for issue in issues[:5]]
    return {
        "mode": "heuristic",
        "score": score,
        "readyToSubmit": score >= 70 and len(issues) <= 2,
        "issues": issues,
        "strengths": strengths,
        "followUpQuestions": follow_up_questions,
        "summary": "This draft is usable for triage." if score >= 70 else "This draft needs more precision before review.",
    }


def llm_critique(data: dict[str, Any]) -> dict[str, Any] | None:
    if not PQ_ENABLE_LLM_CRITIQUE or not OPENAI_API_KEY or not PQ_LLM_MODEL:
        return None

    prompt = {
        "task": "Critique a proposed Pivotal Question for decision relevance and operational precision.",
        "criteria": [
            "Is the question answerable as a quantity, probability, effect size, cost, rate, threshold, or clearly observable claim?",
            "Does it state who would make a different decision under different answers?",
            "Does it specify measurement target, unit or scale, timeframe, and relevant evidence?",
            "Ask concise follow-up questions where the draft is vague.",
        ],
        "return_json_shape": {
            "score": "integer 0-100",
            "readyToSubmit": "boolean",
            "issues": [{"field": "string", "label": "string", "message": "string"}],
            "strengths": ["string"],
            "followUpQuestions": ["string"],
            "summary": "string",
        },
        "submission": data,
    }

    body = json.dumps(
        {
            "model": PQ_LLM_MODEL,
            "input": [
                {
                    "role": "system",
                    "content": "You review research-question intake forms. Return only compact JSON.",
                },
                {"role": "user", "content": json.dumps(prompt)},
            ],
        }
    ).encode("utf-8")

    req = urllib.request.Request(
        "https://api.openai.com/v1/responses",
        data=body,
        headers={
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
        logger.warning("LLM critique failed, falling back to heuristic: %s", exc)
        return None

    output_text = payload.get("output_text", "")
    if not output_text:
        for item in payload.get("output", []):
            for content in item.get("content", []):
                if content.get("type") in {"output_text", "text"}:
                    output_text += content.get("text", "")

    try:
        result = json.loads(output_text)
    except json.JSONDecodeError:
        logger.warning("LLM critique returned non-JSON output")
        return None

    if isinstance(result, dict):
        result["mode"] = "llm"
        return result
    return None


def critique_submission(data: dict[str, Any]) -> dict[str, Any]:
    return llm_critique(data) or heuristic_critique(data)


def store_submission(conn: sqlite3.Connection, data: dict[str, Any], critique: dict[str, Any]) -> int:
    now = utc_now()
    values = {
        "question_title": clean_text(data.get("questionTitle"), 500),
        "question_text": clean_text(data.get("questionText")),
        "submitter_name": clean_text(data.get("submitterName"), 300),
        "submitter_email": clean_text(data.get("submitterEmail"), 320),
        "organization": clean_text(data.get("organization"), 500),
        "role": clean_text(data.get("role"), 200),
        "topic_area": clean_text(data.get("topicArea"), 300),
        "decision_context": clean_text(data.get("decisionContext")),
        "decision_makers": clean_text(data.get("decisionMakers")),
        "decision_changes": clean_text(data.get("decisionChanges")),
        "measurement_target": clean_text(data.get("measurementTarget")),
        "measurement_unit": clean_text(data.get("measurementUnit"), 1000),
        "timeframe": clean_text(data.get("timeframe"), 1000),
        "current_belief": clean_text(data.get("currentBelief")),
        "evidence_links": clean_text(data.get("evidenceLinks")),
        "public_permission": clean_text(data.get("publicPermission"), 100),
        "follow_up_ok": 1 if data.get("followUpOk", True) else 0,
        "status": "new",
        "quality_score": int(critique.get("score", 0)),
        "critique_json": json.dumps(critique, ensure_ascii=True),
        "raw_json": json.dumps(data, ensure_ascii=True),
        "source": clean_text(data.get("source"), 100) or "pivotal_question_intake",
        "remote_addr": submission_ip(),
        "user_agent": clean_text(request.headers.get("User-Agent"), 1000),
        "submitted_at": now,
        "updated_at": now,
    }
    columns = list(values.keys())
    placeholders = ", ".join(["?"] * len(columns))
    conn.execute(
        f"INSERT INTO pivotal_question_submissions ({', '.join(columns)}) VALUES ({placeholders})",
        list(values.values()),
    )
    conn.commit()
    return int(conn.execute("SELECT last_insert_rowid()").fetchone()[0])


def parse_json_request() -> tuple[dict[str, Any] | None, Any]:
    if request.content_length and request.content_length > MAX_JSON_BYTES:
        return None, (jsonify({"ok": False, "errors": ["Request body is too large"]}), 413)
    try:
        data = request.get_json(force=True)
    except Exception:
        return None, (jsonify({"ok": False, "errors": ["Invalid JSON"]}), 400)
    if not isinstance(data, dict):
        return None, (jsonify({"ok": False, "errors": ["JSON body must be an object"]}), 400)
    return data, None


@app.after_request
def add_security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["Cache-Control"] = "no-store"
    return response


@app.route("/api/pq/", methods=["GET"])
def pq_root():
    return jsonify({"ok": True, "service": "pivotal-question-intake", "health": "/api/pq/health"})


@app.route("/api/pq/health", methods=["GET"])
def health():
    try:
        with get_db() as conn:
            ensure_schema(conn)
            conn.execute("SELECT 1")
        return jsonify({"ok": True, "db": "connected", "llm": bool(PQ_ENABLE_LLM_CRITIQUE and OPENAI_API_KEY and PQ_LLM_MODEL)})
    except Exception as exc:
        logger.error("Health check failed: %s", exc, exc_info=True)
        return jsonify({"ok": False, "error": str(exc)}), 500


@app.route("/api/pq/critique", methods=["POST"])
def critique():
    ip_address = submission_ip()
    if too_many_recent_critiques(ip_address):
        return jsonify({"ok": False, "errors": ["Please wait a few seconds before requesting another review"]}), 429
    data, error = parse_json_request()
    if error:
        return error
    assert data is not None
    return jsonify({"ok": True, "critique": critique_submission(data)})


@app.route("/api/pq/submit", methods=["POST"])
def submit():
    if not check_api_key():
        return jsonify({"ok": False, "errors": ["Unauthorized"]}), 401
    ip_address = submission_ip()
    if too_many_recent_submissions(ip_address):
        return jsonify({"ok": False, "errors": ["Please wait a few seconds before resubmitting"]}), 429

    data, error = parse_json_request()
    if error:
        return error
    assert data is not None

    valid, errors = validate_submission(data)
    critique_result = critique_submission(data)
    if not valid:
        return jsonify({"ok": False, "errors": errors, "critique": critique_result}), 400

    try:
        with get_db() as conn:
            ensure_schema(conn)
            submission_id = store_submission(conn, data, critique_result)
    except Exception as exc:
        logger.error("Failed to store PQ submission: %s", exc, exc_info=True)
        return jsonify({"ok": False, "errors": ["Could not store submission"]}), 500

    return jsonify(
        {
            "ok": True,
            "submissionId": submission_id,
            "qualityScore": critique_result.get("score"),
            "critique": critique_result,
        }
    )


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Unjournal Pivotal Question intake API")
    parser.add_argument("--db-path", default=DB_PATH)
    parser.add_argument("--port", type=int, default=8003)
    parser.add_argument("--host", default="127.0.0.1")
    args = parser.parse_args()

    DB_PATH = args.db_path
    with get_db() as startup_conn:
        ensure_schema(startup_conn)
    app.run(host=args.host, port=args.port)
