from storages.backends.s3boto3 import S3Boto3Storage
from django.conf import settings

DEV = True

if DEV:
    stage = "dev"
else:
    stage = "prod"


class StaticStorage(S3Boto3Storage):
    location = "static"
    default_acl = "public-read"


class MediaStorage(S3Boto3Storage):
    location = "media"
    default_acl = "public-read"
    file_overwrite = False


class StoreProfileStorage(S3Boto3Storage):
    bucket_name = f"happicard-stores-{stage}"
    custom_domain = "{}.s3.amazonaws.com".format(bucket_name)
    location = "profiles"


class NGOProfileStorage(S3Boto3Storage):
    bucket_name = f"happicard-ngos-{stage}"
    custom_domain = "{}.s3.amazonaws.com".format(bucket_name)
    location = "profiles"


class GiftCardStorage(S3Boto3Storage):
    bucket_name = f"happicard-stores-{stage}"
    custom_domain = "{}.s3.amazonaws.com".format(bucket_name)
    location = "giftcards"


class CampaignStorage(S3Boto3Storage):
    bucket_name = f"happicard-ngos-{stage}"
    custom_domain = "{}.s3.amazonaws.com".format(bucket_name)
    location = "campaigns"


class HappicardImageStorage(S3Boto3Storage):
    bucket_name = f"happicard-orders-{stage}"
    custom_domain = "{}.s3.amazonaws.com".format(bucket_name)
    location = "images"


class HappicardVideoStorage(S3Boto3Storage):
    bucket_name = f"happicard-orders-{stage}"
    custom_domain = "{}.s3.amazonaws.com".format(bucket_name)
    location = "videos"


class CustomStorage(S3Boto3Storage):
    bucket_name = f"happicard-promo-{stage}"
    custom_domain = "{}.s3.amazonaws.com".format(bucket_name)