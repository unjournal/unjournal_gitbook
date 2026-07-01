# Pivotal Question intake

This is a first version of a Coda-free intake flow for The Unjournal's Pivotal Questions project.

## Pieces

- `landing-pages/pivotal-question-submit.html` is the public guided form.
- `api/pq_intake_api.py` is a Flask API that writes to SQLite.
- The API creates `pivotal_question_submissions` if it does not already exist.

## Local static-page test

Open `landing-pages/pivotal-question-submit.html` directly or serve `landing-pages/` with a simple local server. The page has a local heuristic review fallback, so the "Review my draft" button works even before the API is running.

## Production deployment

The production API currently runs on the Linode host behind `api.unjournal.org`:

```text
API file:        /opt/pq_intake_api.py
SQLite DB:       /var/lib/unjournal/unjournal_data.db
Service:         unjournal-pq-intake
Internal port:   127.0.0.1:8003
Public route:    https://api.unjournal.org/api/pq/
Static form:     https://info.unjournal.org/pivotal-question-submit.html
```

The systemd service uses Gunicorn:

```text
/var/lib/unjournal/venv/bin/gunicorn --bind 127.0.0.1:8003 --workers 2 --timeout 30 pq_intake_api:app
```

The service is sandboxed with systemd restrictions including `NoNewPrivileges`,
`PrivateTmp`, `PrivateDevices`, `ProtectSystem=full`, kernel/control-group
protections, namespace restrictions, an empty capability bounding set, and
write access limited to `/var/lib/unjournal` and `/root/.gunicorn`.

Nginx routes `^~ /api/pq/` to the Gunicorn service and applies:

```text
limit_req zone=pq_intake burst=20 nodelay;
client_max_body_size 512k;
```

The rate-limit zone is defined in `/etc/nginx/conf.d/pq-rate-limit.conf`:

```text
limit_req_zone $binary_remote_addr zone=pq_intake:10m rate=30r/m;
```

## Environment

```text
DB_PATH=/var/lib/unjournal/unjournal_data.db
PQ_INTAKE_API_KEY=
ALLOWED_ORIGINS=https://info.unjournal.org,http://localhost:8000,http://127.0.0.1:8000
OPENAI_API_KEY=
PQ_LLM_MODEL=
PQ_ENABLE_LLM_CRITIQUE=
```

`PQ_LLM_MODEL` intentionally has no default. Public LLM critiques are disabled unless `PQ_ENABLE_LLM_CRITIQUE=1`, `OPENAI_API_KEY`, and `PQ_LLM_MODEL` are all set. Otherwise, the API uses deterministic heuristic pushbacks.

CORS is limited to configured allowed origins and does not emit an allow-origin
header for requests without a matching `Origin`.

## Endpoints

- `GET /api/pq/health`
- `POST /api/pq/critique`
- `POST /api/pq/submit`

Both POST endpoints accept the same JSON shape emitted by the form. `submit` validates required fields, runs the same critique, and stores the raw JSON plus structured columns in SQLite.
