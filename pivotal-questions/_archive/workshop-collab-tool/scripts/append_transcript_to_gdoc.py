"""
Split the wellbeing workshop transcript by segment and append to Google Doc tabs.

Segment mapping (from transcript timestamps to schedule):
  Seg 1: Stakeholder & PQs     (0:00:00 – 0:39:04)
  Seg 2: WELLBY Reliability     (0:39:04 – 1:16:36)
  Seg 3: DALY-WELLBY Conversion (1:16:36 – 1:55:25)
  [Break + informal discussion  (1:55:25 – 2:25:00)]
  Seg 4+5: UJ Brief + Benjamin (2:25:00 – 3:10:12)
  Seg 6: Evaluator Responses    (3:10:12 – 3:44:32)
  Seg 7: Beliefs Elicitation    (3:44:32 – 4:05:24)
  Seg 8: Practitioner Panel     (4:05:24 – end)
"""

import re
import sys
from pathlib import Path

# Add parent to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))
from src.gdocs.update_tab_content import (
    get_credentials, get_doc_with_tabs, append_to_tab, create_sub_tab, TABBED_DOC_ID
)

from googleapiclient.discovery import build

TRANSCRIPT_PATH = Path(__file__).parent.parent.parent / "wellbeing-workshop" / "wellbeing-workshop-transcript.md"

# Segment boundaries as (start_timestamp, end_timestamp, tab_name, tab_id, segment_title)
# Using content-based timestamps from the transcript
SEGMENTS = [
    ("00:00:05", "00:39:04", "Stakeholder & PQs", "t.0",
     "Segment 1: Stakeholder Problem Statement & Pivotal Questions"),
    ("00:39:04", "01:16:36", "WELLBY Reliability", "t.54qh1431dew",
     "Segment 2: WELLBY Reliability Discussion"),
    ("01:16:36", "02:08:20", "DALY-WELLBY", "t.dsbbi5fqcns4",
     "Segment 3: DALY/QALY↔WELLBY Conversion"),
    ("02:22:00", "03:10:12", "Benjamin et al. + Evaluators", "t.flfoslfoknfy",
     "Segments 4–5: Unjournal & PQ Brief + Benjamin et al. Presentation"),
    ("03:10:12", "03:44:32", "Benjamin et al. + Evaluators", "t.flfoslfoknfy",
     "Segment 6: Evaluator Responses & Discussion"),
    ("03:44:32", "04:05:24", "Beliefs Elicitation", "t.aqpbjqrdtadw",
     "Segment 7: Beliefs Elicitation"),
    ("04:05:24", "99:99:99", "Practitioner Panel & Open Discussion", "t.upxfarlbc4e2",
     "Segment 8: Practitioner Panel & Open Discussion"),
]


def timestamp_to_seconds(ts: str) -> int:
    """Convert HH:MM:SS to seconds."""
    parts = ts.split(":")
    return int(parts[0]) * 3600 + int(parts[1]) * 60 + int(parts[2])


# Terminology normalization patterns (case-insensitive)
TERM_FIXES = [
    # WELLBY variants (order matters - more specific first)
    (r'\bwellbys?\b', lambda m: 'WELLBYs' if m.group().endswith('s') else 'WELLBY'),
    (r'\bwellbees?\b', lambda m: 'WELLBYs' if m.group().endswith('s') else 'WELLBY'),
    (r'\bwellbes?\b', lambda m: 'WELLBYs' if m.group().endswith('s') else 'WELLBY'),
    (r'\bWellbes?\b', lambda m: 'WELLBYs' if m.group().endswith('s') else 'WELLBY'),
    (r'\bWellBes?\b', lambda m: 'WELLBYs' if m.group().endswith('s') else 'WELLBY'),
    (r'\bWellbys?\b', lambda m: 'WELLBYs' if m.group().endswith('s') else 'WELLBY'),
    (r'\bwell-?bes?\b', lambda m: 'WELLBYs' if 's' in m.group() else 'WELLBY'),
    # DALY variants (including "deli" transcription error in context)
    (r'\bthe deli\b', 'the DALY'),
    (r'\b[Dd]ollies\b', 'DALYs'),
    (r'\b[Dd]olly\b', 'DALY'),
    (r'\b[Dd]allies\b', 'DALYs'),
    (r'\b[Dd]ally\b', 'DALY'),
    (r'\bDallies\b', 'DALYs'),
    (r'\bDally\b', 'DALY'),
    (r'\bDALIs\b', 'DALYs'),
    (r'\bDALI\b', 'DALY'),
    # Unjournal variants
    (r'\b[Oo]wn [Jj]ournal\b', 'Unjournal'),
    (r'\b[Yy]oung [Jj]ournal\b', 'Unjournal'),
    (r'\bunjournal\b', 'Unjournal'),
]


def normalize_terminology(text: str) -> str:
    """Fix common transcription errors in terminology."""
    for pattern, replacement in TERM_FIXES:
        if callable(replacement):
            text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)
        else:
            text = re.sub(pattern, replacement, text)
    return text


def break_into_paragraphs(text: str, max_words: int = 80) -> list[str]:
    """Break a long text block into readable paragraphs.

    Strategy:
    - Split on sentence boundaries (. ? !)
    - Group sentences into paragraphs of ~max_words
    - Prefer breaking at natural thought transitions (So, Now, And, But, Okay)
    """
    # Clean up excessive whitespace and ellipses
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'…\s*…', '…', text)  # Collapse multiple ellipses

    # Split into sentences (keeping the delimiter)
    sentences = re.split(r'(?<=[.!?])\s+', text)

    paragraphs = []
    current_para = []
    current_word_count = 0

    # Words that often start new thoughts
    transition_starters = {'So', 'Now', 'And', 'But', 'Okay', 'Alright', 'Well',
                          'Basically', 'Actually', 'However', 'Therefore', 'Anyways',
                          'First', 'Second', 'Third', 'Finally', 'Also', 'Moreover'}

    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence:
            continue

        words = sentence.split()
        word_count = len(words)

        # Check if this sentence starts with a transition word
        first_word = words[0].rstrip(',') if words else ''
        is_transition = first_word in transition_starters

        # Start new paragraph if:
        # 1. Current paragraph is getting long AND this is a transition
        # 2. Current paragraph exceeds max_words
        should_break = (
            (current_word_count > max_words * 0.6 and is_transition) or
            (current_word_count > max_words)
        )

        if should_break and current_para:
            paragraphs.append(' '.join(current_para))
            current_para = []
            current_word_count = 0

        current_para.append(sentence)
        current_word_count += word_count

    # Don't forget the last paragraph
    if current_para:
        paragraphs.append(' '.join(current_para))

    return paragraphs


def parse_transcript(path: Path) -> list[tuple[str, str, str]]:
    """Parse transcript into list of (timestamp_str, speaker, text) entries."""
    content = path.read_text()

    # Find all speaker blocks: ### [HH:MM:SS] Speaker Name
    pattern = r'### \[(\d{2}:\d{2}:\d{2})\] (.+?)(?:\n\n)(.*?)(?=\n### \[|\Z)'
    matches = re.findall(pattern, content, re.DOTALL)

    entries = []
    for ts, speaker, text in matches:
        text = text.strip()
        if text:
            entries.append((ts, speaker, text))

    return entries


def format_segment(entries: list[tuple[str, str, str]], segment_title: str) -> str:
    """Format a list of transcript entries into clean text for Google Docs.

    Improvements:
    - Breaks long speeches into readable paragraphs
    - Normalizes terminology (WELLBYs, DALYs, etc.)
    - Clear speaker headers with timestamps
    """
    lines = []
    lines.append(f"\n{'─' * 60}")
    lines.append(f"📝 TRANSCRIPT — {segment_title}")
    lines.append(f"{'─' * 60}\n")

    current_speaker = None
    for ts, speaker, text in entries:
        # Convert timestamp to more readable format
        parts = ts.split(":")
        h, m, s = int(parts[0]), int(parts[1]), int(parts[2])
        if h > 0:
            readable_ts = f"{h}:{m:02d}:{s:02d}"
        else:
            readable_ts = f"{m}:{s:02d}"

        # Show speaker name as header when it changes
        if speaker != current_speaker:
            if current_speaker is not None:
                lines.append("")  # blank line between speakers
            lines.append(f"▸ [{readable_ts}] {speaker}")
            lines.append("")
            current_speaker = speaker

        # Clean up and normalize text
        clean_text = " ".join(text.split())
        clean_text = normalize_terminology(clean_text)

        # Break into readable paragraphs
        paragraphs = break_into_paragraphs(clean_text)
        for para in paragraphs:
            lines.append(para)
            lines.append("")

    return "\n".join(lines)


def main():
    print("Parsing transcript...")
    entries = parse_transcript(TRANSCRIPT_PATH)
    print(f"  Found {len(entries)} speaker blocks")

    # Group entries into segments
    segments_content = {}
    for seg_start, seg_end, tab_name, tab_id, seg_title in SEGMENTS:
        start_secs = timestamp_to_seconds(seg_start)
        end_secs = timestamp_to_seconds(seg_end)

        seg_entries = [
            (ts, speaker, text) for ts, speaker, text in entries
            if start_secs <= timestamp_to_seconds(ts) < end_secs
        ]

        if seg_entries:
            key = (tab_id, tab_name)
            formatted = format_segment(seg_entries, seg_title)
            if key in segments_content:
                segments_content[key] += "\n" + formatted
            else:
                segments_content[key] = formatted
            print(f"  {seg_title}: {len(seg_entries)} blocks, {len(formatted)} chars")
        else:
            print(f"  {seg_title}: NO ENTRIES FOUND")

    # Connect to Google Docs and append to tabs
    print("\nConnecting to Google Docs...")
    creds = get_credentials()
    docs_service = build('docs', 'v1', credentials=creds)

    for (tab_id, tab_name), content in segments_content.items():
        print(f"\nAppending to '{tab_name}' ({tab_id})...")
        print(f"  Content length: {len(content)} chars")
        try:
            append_to_tab(docs_service, TABBED_DOC_ID, tab_id, content)
            print(f"  ✓ Done")
        except Exception as e:
            print(f"  ✗ Error: {e}")

    print("\nAll transcripts appended successfully!")


if __name__ == "__main__":
    # Dry-run mode: just print formatted content without uploading
    if "--dry-run" in sys.argv:
        entries = parse_transcript(TRANSCRIPT_PATH)
        for seg_start, seg_end, tab_name, tab_id, seg_title in SEGMENTS:
            start_secs = timestamp_to_seconds(seg_start)
            end_secs = timestamp_to_seconds(seg_end)
            seg_entries = [
                (ts, speaker, text) for ts, speaker, text in entries
                if start_secs <= timestamp_to_seconds(ts) < end_secs
            ]
            if seg_entries:
                print(f"\n{'=' * 70}")
                print(f"TAB: {tab_name}")
                print(format_segment(seg_entries, seg_title)[:500])
                print(f"... ({len(seg_entries)} blocks total)")
        sys.exit(0)

    main()
