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
    return os.path.join('profile_pics/products/', filename)


class Account(models.Model):
    profile = models.ImageField(upload_to=user_profile_upload_path, blank=True, null=True)
    name = models.CharField(max_length=45)
    username = models.CharField(max_length=45, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=128)
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
        if not self.password.startswith('pbkdf2_'):
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
    product_image = models.ImageField(upload_to=product_image_upload_path, blank=True, null=True)
    product_name = models.CharField(max_length=45)

    def __str__(self):
        return self.product_name
    

class Color(models.Model):
    color_name = models.CharField(max_length=45)

    def __str__(self):
        return self.color_name
    
class Type(models.Model):
    product_type = models.CharField(max_length=45)

    def __str__(self):
        return self.product_type
    
class Size(models.Model):
    size_label = models.CharField(max_length=45)

    def __str__(self):
        return self.size_label
    
class Product_item(models.Model):
    product_name = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='productName')
    color_name = models.ForeignKey(Color, on_delete=models.CASCADE, related_name='productColor')
    product_type = models.ForeignKey(Type, on_delete=models.CASCADE, related_name='productType')
    size_label = models.ForeignKey(Size, on_delete=models.CASCADE, related_name='sizeLabel')

    product_price = models.PositiveIntegerField()
    product_quantity = models.PositiveBigIntegerField()

    def __str__(self):
        return f"{self.product_name.product_name} - {self.color_name.color_name} - {self.product_type.product_type} - {self.size_label.size_label}"


