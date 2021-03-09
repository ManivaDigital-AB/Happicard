from celery import shared_task
from celery.utils.log import logger

from .utils import Util


@shared_task
def send_happicard_email_task(
    data,
    recipient_name,
    rebate_code,
    redeem_website,
):
    logger.info("Sent Happicard Email")
    return Util.send_happicard_email(
        data,
        recipient_name,
        rebate_code,
        redeem_website,
    )


@shared_task
def outbound_mms_task(
    to_number,
    from_number,
    personal_message,
    recipient_name,
    sender_name,
    rebate_code,
    redeem_website,
):
    logger.info("Sent Happicard MMS")
    return Util.outbound_mms(
        to_number,
        from_number,
        personal_message,
        recipient_name,
        sender_name,
        rebate_code,
        redeem_website,
    )
