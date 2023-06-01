"""
Newsletter specific functions
"""
import markdown
import re


def pre_parse_md_from_gitbook(markdown: str) -> str:
    # Parse {% embed url="" %} tags
    for match in re.finditer(r"\{% embed url=[^%]*%\}", markdown):
        embed_start, embed_end = match.span()
        embed_tag = match.group()
        embed_url = re.search(r"(?<=url=\").*?(?=\")", embed_tag).group()
        markdown = markdown.replace(
            embed_tag, f'<a href="{embed_url}">Read more</a>'
        )
    return markdown


def get_email_contents() -> str:
    email_body = ""
    with open("UPDATES.md", "r", encoding="utf-8") as file:
        raw_body = file.read()

    try:
        raw_body = pre_parse_md_from_gitbook(raw_body)
    except Exception as error:
        print("Could not pre-parse Gitbook markdown: ", error)

    try:
        email_body = markdown.markdown(raw_body)
    except Exception as error:
        print("Could not parse markdown into HTML: ", error)

    return email_body
