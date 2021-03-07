from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status

from .models import Order
from .serializers import OrderSerializer

from django.conf import settings.DEFAULT_FROM_EMAIL as test_email
from backend.tasks import send_happicard_email_task

class HappicardTestCase(TestCase):
    """
    Happicard Unit Test
    """

    def setUp(self):
        Order.objects.create(
            first_name="Test Sender"
            happicard_recipient_myself=False,
            happicard_personal_message="This is a unit test",
            happicard_recipient_email=test_email,
            happicard_recipient_name="Test Receiver",
            happicard_recipient_number="+460720137236",
            happicard_recipient_email_choice=True,
            happicard_recipient_sms_choice=False,
        )

    def test_happicard_delivery(self):
        order = Order.objects.get(happicard_recipient_name="Test Receiver")
        sender_name = order.first_name
        recipient_name = order.happicard_recipient_name
        personal_message = order.happicard_personal_message
        email_subject = f"{sender_name} sent you a Happicard"

        rebate_code = "Your Rebate Code Here"
        redeem_website = "Your Website Here"

        recipient_email = order.happicard_recipient_email
        confirmation = {
            "to_email": order.happicard_recipient_email,
            "email_body": order.happicard_personal_message,
            "email_subject": email_subject,
        }
        resp = send_happicard_email_task.delay(
            confirmation, recipient_name, rebate_code, redeem_website
        )

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)


class StripePaymentIntentTestCase(APITestCase):

    def test_payment_intent(self):
        data = {
            "items": ["eea58e2b-8b76-44f1-94e6-3d653a0048af"], 
            "first_name": "testfirstname", 
            "last_name": "testlastname",
            "email": "drew@manivadigital.com",
            "phone_number": "+460720137236",
            "country": "SE",
            "region": "Uplands",
            "postcode": "75423",
            "town_or_city": "Uppsala",
            "street_address1": "testaddress1",
            "street_address2": "testaddress2",
            "happicard_recipient_myself": False,
            "happicard_recipient_name": "testhappicardname",
            "happicard_recipient_email_choice" : True,
            "happicard_recipient_email" : "drew@manivadigital.com",
            "happicard_recipient_sms_choice" : True,
            "happicard_recipient_number" : "+460720137236",
            "happicard_personal_message" : "This is a test message.",
        }
        resp = self.client.post("api/orders/create/stripe-payment/", data)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

