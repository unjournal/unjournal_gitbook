"""Comment template rendering."""

from __future__ import annotations

from .models import Paper

COMMENT_TEMPLATE = (
    'By the way, the paper "{paper_title}", which seems relevant to this post, '
    "was evaluated by The Unjournal \u2013 see {eval_url}. "
    "Please let us know if you found our evaluation useful and how we can do better; "
    "we\u2019re working to measure and boost our impact. "
    "You can email us at contact@unjournal.org, and we can schedule a chat. "
    "(Semi-automated comment)"
)


def render_comment_text(paper: Paper) -> str:
    """Render the plain-text version of the comment."""
    return COMMENT_TEMPLATE.format(
        paper_title=paper.title,
        eval_url=paper.eval_link,
    )


def render_comment_html(paper: Paper) -> str:
    """Render the HTML version of the comment for the forum API."""
    text = render_comment_text(paper)
    # Wrap in paragraph, linkify the eval URL
    url = paper.eval_link
    linked_text = text.replace(url, f'<a href="{url}">{url}</a>')
    # Also linkify the email
    linked_text = linked_text.replace(
        "contact@unjournal.org",
        '<a href="mailto:contact@unjournal.org">contact@unjournal.org</a>',
    )
    return f"<p>{linked_text}</p>"
