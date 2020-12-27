from storages.backends.s3boto3 import S3Boto3Storage


class StaticStorage(S3Boto3Storage):
    location = "static"
    default_acl = "public-read"


class MediaStorage(S3Boto3Storage):
    location = "media"
    default_acl = "public-read"
    file_overwrite = False


class StoreProfileStorage(S3Boto3Storage):
    bucket_name = "happicard-stores"
    custom_domain = "{}.s3.amazonaws.com".format(bucket_name)
    location = "profiles"


class NGOProfileStorage(S3Boto3Storage):
    bucket_name = "happicard-ngos"
    custom_domain = "{}.s3.amazonaws.com".format(bucket_name)
    location = "profiles"


class GiftCardStorage(S3Boto3Storage):
    bucket_name = "happicard-stores"
    custom_domain = "{}.s3.amazonaws.com".format(bucket_name)
    location = "giftcards"


class CampaignStorage(S3Boto3Storage):
    bucket_name = "happicard-ngos"
    custom_domain = "{}.s3.amazonaws.com".format(bucket_name)
    location = "campaigns"
