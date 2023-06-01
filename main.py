from email_client import EmailClient
from newsletter import get_email_contents


email_client = EmailClient()


if __name__ == "__main__":
    email_client.set_newsletter_type("regular")
    email_client.set_newsletter_recipients()
    email_client.set_newsletter_settings(
        title="Test email title",
        subject="Test email subject",
    )

    email_client.create_email()
    email_content = get_email_contents()
    email_client.set_newsletter_content(email_content)
    email_client.send_email()
