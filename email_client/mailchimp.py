import os
import json
from mailchimp_marketing import Client
from mailchimp_marketing.api_client import ApiClientError


class Mailchimp:
    API_KEY = os.getenv("MAILCHIMP_API_KEY")
    API_SERVER = os.getenv("MAILCHIMP_API_SERVER")

    def __init__(self) -> None:
        self.__client = Client()
        self.__set_config()

    def __set_config(self) -> None:
        assert self.API_KEY and self.API_SERVER, "API key or server is not set"

        self.__client.set_config({"api_key": self.API_KEY, "server": self.API_SERVER})

    def ping(self) -> str:
        response = self.__client.ping.get()
        return response

    def create_campaign(
        self, type: str, recipients: dict, settings: dict
    ) -> dict | list:
        try:
            return self.__client.campaigns.create(
                {
                    "type": type,
                    "recipients": recipients,
                    "settings": settings,
                }
            )
        except ApiClientError as error:
            return json.loads(error.text)

    def set_campaign_content(self, campaign_id: str, plain_text: str) -> dict | list:
        try:
            return self.__client.campaigns.set_content(
                campaign_id,
                {
                    "plain_text": plain_text,
                },
            )
        except ApiClientError as error:
            return json.loads(error.text)

    def send_campaign(self, campaign_id: str) -> dict | list:
        try:
            return self.__client.campaigns.send(campaign_id)
        except ApiClientError as error:
            return json.loads(error.text)
