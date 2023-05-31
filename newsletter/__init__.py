"""
Newsletter specific functions
"""


def get_email_contents() -> str:
    email_head = ""
    email_body = ""
    with open("HEAD.md", "r", encoding="utf-8") as file:
        email_head = file.read()

    with open("UPDATES.md", "r", encoding="utf-8") as file:
        email_body = file.read()

    return email_head + email_body
