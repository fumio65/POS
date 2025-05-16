from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.core.validators import RegexValidator
import uuid
import os

def user_profile_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('profile_pics/accounts/', filename)

class Account(models.Model):
    profile = models.ImageField(upload_to=user_profile_upload_path, blank=True, null=True)
    name = models.CharField(max_length=45)
    username = models.CharField(max_length=45, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=128)  # store hashed password
    contact = models.CharField(
        max_length=15,
        validators=[
            RegexValidator(
                regex=r'^(09|\+639)\d{9}$',
                message="Contact must be in PH format (e.g. 09123456789 or +639123456789)"
            )
        ]
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # Hash password before saving if it's not hashed already
        if not self.password.startswith('pbkdf2_'):  # Django default hash starts with this prefix
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.username
