from django.contrib import admin
from .models import Account, UserProfile, Product, Color, Type, Size, Product_item

# Product_item

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'email', 'is_active', 'is_staff']

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['id', 'names', 'pin', 'role', 'account']
    list_filter = ['role']

@admin.register(Product)
class ProductSerializer(admin.ModelAdmin):
    list_display = ['id', 'product_name',]

@admin.register(Color)
class ColorSerializer(admin.ModelAdmin):
    list_display = ['id', 'color_name']

@admin.register(Type)
class TypeSerializer(admin.ModelAdmin):
    list_display = ['id', 'product_type']

@admin.register(Size)
class TypeSerializer(admin.ModelAdmin):
    list_display = ['id', 'size_label']

@admin.register(Product_item)
class TypeSerializer(admin.ModelAdmin):
    list_display = ['id', 'product_name', 'color_name', 'product_type', 'size_label', 'product_price', 'product_quantity']

# @admin.register(Product_item)
# class Product_itemSerializer(admin.ModelAdmin):
#     list_display = ['id', 'product_name', 'color_name', 'product_price']