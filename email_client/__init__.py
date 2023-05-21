import os
from .mailchimp import Mailchimp


class EmailClient:
    # TODO: Unbind EmailClient from a specific segment list and id
    # TODO2: Refactor to make email methods agnostic of type (newsletters)
    # TODO2: If it is just newsletters, change names from email to newsletter
    MAILCHIMP_SEGMENT_LIST = os.getenv("MAILCHIMP_SEGMENT_LIST")
    MAILCHIMP_SEGMENT_ID = os.getenv("MAILCHIMP_SEGMENT_ID")
    MAILCHIMP_SEGMENT_ID = int(MAILCHIMP_SEGMENT_ID)  # type: ignore

    def __init__(self) -> None:
        self.__client = Mailchimp()
        self.newsletter_type = None
        self.newsletter_recipients = None
        self.newsletter_settings = None
        self.newsletter_campaign_id = None

    def check_health(self) -> str:
        return self.__client.ping()

    def get_newsletter_recipients(self) -> dict:
        assert (
            self.MAILCHIMP_SEGMENT_LIST
        ), "Segment list is not set as an environment variable"

        return {
            "list_id": self.MAILCHIMP_SEGMENT_LIST,
            "segment_opts": {"saved_segment_id": self.MAILCHIMP_SEGMENT_ID},
        }

    def set_newsletter_type(self, type: str = "plaintext") -> None:
        self.newsletter_type = type

    def set_newsletter_recipients(self) -> None:
        self.newsletter_recipients = {
            "list_id": self.MAILCHIMP_SEGMENT_LIST,
            "segment_opts": {"saved_segment_id": self.MAILCHIMP_SEGMENT_ID},
        }

    def set_newsletter_settings(
        self,
        title: str,
        subject: str,
        from_name: str = "The Unjournal",
        reply_to: str = "theunjournal@gmail.com",
        to_name: str = "*|FNAME|* *|LNAME|*",
        auto_footer: bool = True,
    ) -> None:
        self.newsletter_settings = {
            "subject_line": subject,
            "title": title,
            "from_name": from_name,
            "reply_to": reply_to,
            "to_name": to_name,
            "auto_footer": auto_footer,
        }

    def set_newsletter_content(self, plain_text: str) -> None:
        assert self.newsletter_campaign_id, "You must create an email first"

        self.__client.set_campaign_content(self.newsletter_campaign_id, plain_text)

    def create_email(self) -> str:
        assert self.newsletter_type, "You must set a newsletter type first"
        assert self.newsletter_recipients, "You must set newsletter recipients first"
        assert self.newsletter_settings, "You must set newsletter settings first"

        response = self.__client.create_campaign(
            self.newsletter_type, self.newsletter_recipients, self.newsletter_settings  # type: ignore  # noqa: E501
        )
        print(f"DEBUG: {response}")
        self.newsletter_campaign_id = response["id"]  # type: ignore
        return response

    def send_email(self) -> dict | list:
        assert self.newsletter_campaign_id, "You must create an email first"

        response = self.__client.send_campaign(self.newsletter_campaign_id)
        self.reset_email()
        return response

    def reset_email(self) -> None:
        self.newsletter_type = None
        self.newsletter_recipients = None
        self.newsletter_settings = None
