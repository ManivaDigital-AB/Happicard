from django.contrib.auth.models import AbstractUser


class Account(AbstractUser):
    class Meta:
        verbose_name = "Account"
        verbose_name_plural = "Accounts"

    def __str__(self):
        return f"<{self.id}> {self.username}"
