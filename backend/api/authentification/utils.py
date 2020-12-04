from django.core.mail import EmailMessage
from django.conf import settings
import threading

import qrcode
from PIL import Image


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
    def send_contactform(data):
        email = EmailMessage(
            subject=data["email_subject"],
            body=data["email_body"],
            to=[settings.DEFAULT_FROM_EMAIL],
            from_email=data["from_email"],
        )
        EmailThread(email).start()

    @staticmethod
    def create_qrcode(photo):
        logo = Image.open(photo)
        basewidth = 90
        wpercent = basewidth / float(logo.size[0])
        hsize = int((float(logo.size[1]) * float(wpercent)))
        logo = logo.resize((basewidth, hsize), Image.ANTIALIAS)
        qr_big = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H)
        qr_big.make()
        img_qr_big = qr_big.make_image(fill_color="black", back_color="orange").convert(
            "RGB"
        )
        pos = (
            (img_qr_big.size[0] - logo.size[0]) // 2,
            (img_qr_big.size[1] - logo.size[1]) // 2,
        )
        img_qr_big.paste(logo, pos)
        img_qr_big.save("created_qr.png")