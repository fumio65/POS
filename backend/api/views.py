from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
import json
from .models import (
    Account, UserProfile, Product, Color, Type, Size, Product_item
)
from .serializer import (
    AccountSerializer, UserProfileSerializer, ProductSerializer, ColorSerializer, TypeSerializer, SizeSerializer, Product_itemSerializer
    
    # Product_itemSerializer
)

    
# === Reusable Detail View Handler ===
def get_object_or_404(model, pk):
    try:
        return model.objects.get(pk=pk)
    except model.DoesNotExist:
        return None


def detail_handler(model, serializer_class, pk, request):
    instance = get_object_or_404(model, pk)
    if not instance:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = serializer_class(instance, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = serializer_class(instance, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def list_handler(model, serializer_class, request):
    if request.method == 'GET':
        items = model.objects.all()
        serializer = serializer_class(items, many=True, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])  # Only allow POST
def login_view(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')

        account = Account.objects.get(username=username)

        if not account.is_active:
            return Response({'error': 'Account is inactive.'}, status=status.HTTP_403_FORBIDDEN)

        if not account.check_password(password):
            return Response({'error': 'Invalid password.'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({'message': 'Login successful!', 'user': account.username})

    except Account.DoesNotExist:
        return Response({'error': 'Account not found.'}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
def userauthentication(request):
    try:
        names = request.data.get('names')
        pin = request.data.get('pin')

        if not names or not pin:
            return Response(
                {'error': 'Both names and pin are required.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            pin_int = int(pin)
        except ValueError:
            return Response(
                {'error': 'PIN must be a number.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user_profile = UserProfile.objects.get(names=names, pin=pin_int)
            if not user_profile.account.is_active:
                return Response(
                    {'error': 'Account is inactive.'}, 
                    status=status.HTTP_403_FORBIDDEN
                )

            return Response({
                'message': 'Login successful!',
                'user_profile': {
                    'id': user_profile.id,
                    'names': user_profile.names,
                    'role': user_profile.role,
                    'account': user_profile.account.username,
                }
            })

        except UserProfile.DoesNotExist:
            return Response(
                {'error': 'Invalid names or PIN.'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )

    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# === Account Views ===
@api_view(['GET', 'POST'])
def account_list(request):
    return list_handler(Account, AccountSerializer, request)


# === UserProfile Views ===
@api_view(['GET'])
def user_list(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    items = UserProfile.objects.all()
    result_page = paginator.paginate_queryset(items, request)
    serializer = UserProfileSerializer(result_page, many=True, context={'request': request})
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def account_details(request, pk):
    return detail_handler(Account, AccountSerializer, pk, request)

@api_view(['GET', 'PUT', 'DELETE'])
def user_details(request, pk):
    return detail_handler(UserProfile, UserProfileSerializer, pk, request)


# === Product Balloons Views ===
@api_view(['GET', 'POST'])
def balloons_list(request):
    return list_handler(Product, ProductSerializer, request)

@api_view(['GET', 'PUT', 'DELETE'])
def balloons_details(request, pk):
    return detail_handler(Product, ProductSerializer, pk, request)


# === Color Views ===
@api_view(['GET', 'POST'])
def color_list(request):
    return list_handler(Color, ColorSerializer, request)

@api_view(['GET', 'PUT', 'DELETE'])
def color_details(request, pk):
    return detail_handler(Color, ColorSerializer, pk, request)



# === Type Views ===
@api_view(['GET', 'POST'])
def type_list(request):
    return list_handler(Type, TypeSerializer, request)

@api_view(['GET', 'PUT', 'DELETE'])
def type_details(request, pk):
    return detail_handler(Type, TypeSerializer, pk, request)


# === Size Views ===
@api_view(['GET', 'POST'])
def size_list(request):
    return list_handler(Size, SizeSerializer, request)

@api_view(['GET', 'PUT', 'DELETE'])
def size_details(request, pk):
    return detail_handler(Size, SizeSerializer, pk, request)


# === Product_item Views ===
@api_view(['GET', 'POST'])
def product_item_list(request):
    return list_handler(Product_item, Product_itemSerializer, request)

@api_view(['GET', 'PUT', 'DELETE'])
def product_item_details(request, pk):
    return detail_handler(Product_item, Product_itemSerializer, pk, request)
