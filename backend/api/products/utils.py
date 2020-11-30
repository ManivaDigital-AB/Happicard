from .models import Product, GiftCard, Campaign


def get_product(product_id):
    test = Product.objects.get(pk=product_id)
    models = [
        ["gift card", GiftCard],
        ["gift card offers", GiftCard.has_offer(True)],
        ["campaign", Campaign],
    ]

    for m in models:
        try:
            if test.__getattribute__(m[0]):
                product = m[1].objects.get(pk=product_id)
                return [m[0], product]
        except:
            pass