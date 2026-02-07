"""Comment template rendering."""

from __future__ import annotations

from .models import Paper

COMMENT_TEMPLATE = (
    'By the way, the paper "{paper_title}", which seems relevant to this post, '
    "was evaluated by The Unjournal \u2013 see {eval_url}. "
    "Please let us know if you found our evaluation useful and how we can do "
    "better \u2013 contact@unjournal.org"
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
    url = paper.eval_link
    linked_text = '<a href="' + url + '">' + url + '</a>'
    text = text.replace(url, linked_text)
    text = text.replace(
        "contact@unjournal.org",
        '<a href="mailto:contact@unjournal.org">contact@unjournal.org</a>',
    )
    return "<p>" + text + "</p>"
