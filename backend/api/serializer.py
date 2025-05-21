from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import (
    Account,
    UserProfile,
    Product,
    Color,
    Type,
    Size,
    Product_item
)

# --- UserProfile Serializer with PIN validation ---
class UserProfileSerializer(serializers.ModelSerializer):
    profile_url = serializers.SerializerMethodField()
    
    class Meta:
        model = UserProfile
        fields = ['id', 'names', 'role', 'profile_url']
        read_only_fields = fields

    def get_profile_url(self, obj):
        request = self.context.get('request')
        if obj.profile:
            return request.build_absolute_uri(obj.profile.url)
        return None  # Return None if no image exists


# --- Account Serializer with nested UserProfiles ---
class AccountSerializer(serializers.ModelSerializer):
    users = UserProfileSerializer(many=True, read_only=True)
    profile_url = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = '__all__'
        read_only_fields = ['id', 'is_staff', 'is_active']

    def get_profile_url(self, obj):
        request = self.context.get('request')
        if obj.profile and hasattr(obj.profile, 'url'):
            return request.build_absolute_uri(obj.profile.url)
        return None

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password:
            instance.password = make_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.password = make_password(password)
        instance.save()
        return instance


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'


class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = '__all__'


class Product_itemSerializer(serializers.ModelSerializer):
    product_name_display = serializers.CharField(source='product_name.product_name', read_only=True)
    color_name_display = serializers.CharField(source='color_name.color_name', read_only=True)
    product_type_display = serializers.CharField(source='product_type.product_type', read_only=True)
    size_label_display = serializers.CharField(source='size_label.size_label', read_only=True)

    class Meta:
        model = Product_item
        fields = '__all__'



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
