import os
import mailchimp_marketing as MailchimpMarketing
from mailchimp_marketing.api_client import ApiClientError

api_key = os.getenv("MAILCHIMP_API_KEY")
api_server = os.getenv("MAILCHIMP_API_SERVER")

try:
    client = MailchimpMarketing.Client()
    client.set_config({
        "api_key": api_key,
        "server": api_server
    })

    response = client.lists.list_segments("1864cf729e")
    print(response)
except ApiClientError as error:
    print("Error: {}".format(error.text))
