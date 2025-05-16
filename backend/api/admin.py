from django.contrib import admin
from .models import Account, UserProfile, Product, Color, Type, Size

admin.site.register(Account)
admin.site.register(UserProfile)
admin.site.register(Product)
admin.site.register(Color)
admin.site.register(Type)
admin.site.register(Size)