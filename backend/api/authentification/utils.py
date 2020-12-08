from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.conf import settings

from email.mime.image import MIMEImage
from django.contrib.staticfiles import finders
from functools import lru_cache
import threading

import os
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
    def send_qr_email(data):
        email = EmailMultiAlternatives(
            subject=data["email_subject"],
            body=data["email_body"],
            to=[data["to_email"]],
        )
        body_html = """
                    <html>
                        <body>
                            <p>Grattis, din beställning har bekräftats! Lös in ditt Happicard-köp med den här QR-koden:</p>
                            <img src="cid:order_qr" alt="QR-Koden"
                            style="width:200px;height:200px;">
                        </body>
                    </html>
                    """
        email.attach_alternative(body_html, "text/html")
        img_dir = "backend/api/orders/qr_data/"
        image = "order_qr.png"
        file_path = os.path.join(img_dir, image)
        with open(file_path, "rb") as f:
            img = MIMEImage(f.read())
            img.add_header("Content-ID", "<order_qr>")
            email.attach(img)
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