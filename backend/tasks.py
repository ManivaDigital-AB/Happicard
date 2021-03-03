from celery.decorators import task
from celery.utils.log import get_task_logger

from .utils import Util


@task(name="send_happicard_email_task")
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


@task(name="outbound_mms")
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
