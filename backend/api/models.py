from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
import uuid
import os

def user_profile_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('profile_pics/accounts/', filename)

def user_avatar_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('profile_pics/users/', filename)

def product_image_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('profile_pics/users/', filename)


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



class UserProfile(models.Model):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        OWNER = 'OWNER', 'Owner'
        STAFF = 'STAFF', 'Staff'
        CASHIER = 'CASHIER', 'Cashier'

    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='users')
    profile = models.ImageField(upload_to=user_avatar_upload_path, blank=True, null=True)
    names = models.CharField(max_length=45)
    pin = models.PositiveIntegerField(
        unique=True,
        validators=[
            MinValueValidator(10000000),
            MaxValueValidator(99999999)
        ]
    )
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.STAFF)

    def __str__(self):
        return f"{self.account.name} ({self.names})"


class Product(models.Model):
    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"

    image = models.ImageField(upload_to=product_image_upload_path, blank=True, null=True)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Color(models.Model):
    color = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Type(models.Model):
    type = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Size(models.Model):
    label = models.CharField(max_length=5)

    def __str__(self):
        return self.label
