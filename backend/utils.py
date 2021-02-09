from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.conf import settings

from email.mime.image import MIMEImage
from django.contrib.staticfiles import finders
from functools import lru_cache
import threading

import os
import qrcode
from django.template.loader import render_to_string
from django.template import Context
from PIL import Image

from twilio.rest import Client
from twilio.twiml.messaging_response import Body, Media, Message, MessagingResponse

twilio = Client(
    settings.TWILIO_ACCOUNT_SID,
    settings.TWILIO_AUTH_TOKEN,
)


def happicard_mms_body(
    recipient_name,
    sender_name,
    personal_message,
    rebate_code,
    redeem_website,
):
    body = f"Hej {recipient_name}!\nYou received a Happicard from {sender_name} who says '{personal_message}'\nHere's your rebate code:\n{rebate_code}\nYou can redeem it here:\n{redeem_website}"
    return body


class EmailThread(threading.Thread):
    """
    Speed up email
    """

    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()


class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(
            subject=data["email_subject"],
            body=data["email_body"],
            to=[data["to_email"]],
        )
        EmailThread(email).start()

    @staticmethod
    def send_onboarding_email(data):
        html_content = render_to_string(
            "onboarding_email.html",
            {
                "body": data["email_body"],
            },
        )
        email = EmailMultiAlternatives(
            subject=data["email_subject"],
            body=data["email_body"],
            to=[data["to_email"]],
        )
        email.attach_alternative(
            html_content,
            "text/html",
        )
        EmailThread(email).start()

    @staticmethod
    def send_contactform(data):
        email = EmailMessage(
            subject=data["email_subject"],
            body=data["email_body"],
            to=[settings.DEFAULT_FROM_EMAIL],
            from_email=data["from_email"],
        )
        EmailThread(email).start()

    @staticmethod
    def send_happicard_email(data, recipient_name, rebate_code, redeem_website):
        html_content = render_to_string(
            "happicard.html",
            {
                "personal_message": data["email_body"],
                "recipient_name": recipient_name,
                "rebate_code": rebate_code,
                "redeem_website": redeem_website,
            },
        )
        email = EmailMultiAlternatives(
            subject=data["email_subject"],
            body=data["email_body"],
            to=[data["to_email"]],
        )
        email.attach_alternative(
            html_content,
            "text/html",
        )
        img_dir = "backend/api/orders/qr_data/"
        image = "order_qr.png"
        file_path = os.path.join(img_dir, image)
        with open(file_path, "rb") as f:
            img = MIMEImage(f.read())
            img.add_header("Content-ID", "<order_qr>")
        EmailThread(email).start()

    @staticmethod
    def create_qrcode(photo, data):
        logo = Image.open(photo)
        basewidth = 150
        wpercent = basewidth / float(logo.size[0])
        hsize = int((float(logo.size[1]) * float(wpercent)))
        logo = logo.resize((basewidth, hsize), Image.ANTIALIAS)
        qr_big = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H)
        qr_big.add_data(data)
        qr_big.make()
        img_qr_big = qr_big.make_image(fill_color="black", back_color="orange").convert(
            "RGB"
        )
        pos = (
            (img_qr_big.size[0] - logo.size[0]) // 2,
            (img_qr_big.size[1] - logo.size[1]) // 2,
        )
        img_qr_big.paste(logo, pos)
        img_qr_big.save("backend/api/orders/qr_data/order_qr.png")

    @staticmethod
    def outbound_sms(to_number, from_number, message_body):
        twilio.messages.create(
            to=to_number,
            from_=from_number,
            body=message_body,
        )

    @staticmethod
    def outbound_mms(
        to_number,
        from_number,
        personal_message,
        recipient_name,
        sender_name,
        rebate_code,
        redeem_website,
    ):
        twilio.messages.create(
            to=to_number,
            from_=from_number,
            body=happicard_mms_body(
                recipient_name,
                sender_name,
                personal_message,
                rebate_code,
                redeem_website,
            ),
        )
