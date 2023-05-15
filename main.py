from email_client import EmailClient


email_client = EmailClient()


if __name__ == "__main__":
    email_client.set_newsletter_type("plaintext")
    email_client.set_newsletter_recipients()
    email_client.set_newsletter_settings(
        title="Test email title",
        subject="Test email subject",
    )
    email_client.create_email()
    email_client.set_newsletter_content("Test email plain text")
    email_client.send_email()
