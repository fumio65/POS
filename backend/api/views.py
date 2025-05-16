from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Account, UserProfile, Product, Color, Type, Size
# ProductVariant, Transaction, TransactionItem
from .serializer import AccountSerializer, UserProfileSerializer, ProductSerializer, ColorSerializer, TypeSerializer, SizeSerializer
# ProductVariantSerializer, TransactionSerializer, TransactionItemSerializer


# === Account Model ===
@api_view(['GET', 'POST'])
def account_list(request):
    if request.method == 'GET':
        accounts = Account.objects.all()
        serializer = AccountSerializer(accounts, many=True, context={'request': request})
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def account_details(request, pk):
    try:
        account = Account.objects.get(pk=pk)
    except Account.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AccountSerializer(account)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = AccountSerializer(account, many=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        account.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

# === UserProfile Model ===
@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        user = UserProfile.objects.all()
        serializer = UserProfileSerializer(user, many=True, context={'request': request})
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def user_details(request, pk):
    try:
        user = UserProfile.objects.get(pk=pk)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = UserProfileSerializer(user, many=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# === UserProfile Model ===
@api_view(['GET', 'POST'])
def product_list(request):
    if request.method == 'GET':
        product = Product.objects.all()
        serializer = ProductSerializer(product, many=True, context={'request': request})
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def product_details(request, pk):
    try:
        user = Product.objects.get(pk=pk)
    except ProductSerializer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ProductSerializer(user)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ProductSerializer(user, many=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



# === Color Model ===
@api_view(['GET', 'POST'])
def color_list(request):
    if request.method == 'GET':
        color = Color.objects.all()
        serializer = ColorSerializer(color, many=True, context={'request': request})
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ColorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def color_details(request, pk):
    try:
        color = Color.objects.get(pk=pk)
    except ColorSerializer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ColorSerializer(color)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ColorSerializer(color, many=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        color.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# === Type Model ===
@api_view(['GET', 'POST'])
def type_list(request):
    if request.method == 'GET':
        type = Type.objects.all()
        serializer = TypeSerializer(type, many=True, context={'request': request})
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = TypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def type_details(request, pk):
    try:
        type = Type.objects.get(pk=pk)
    except TypeSerializer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = TypeSerializer(type)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = TypeSerializer(type, many=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        type.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

# === Type Model ===
@api_view(['GET', 'POST'])
def size_list(request):
    if request.method == 'GET':
        size = Size.objects.all()
        serializer = SizeSerializer(size, many=True, context={'request': request})
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = SizeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def size_details(request, pk):
    try:
        size = Size.objects.get(pk=pk)
    except SizeSerializer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = SizeSerializer(size)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = SizeSerializer(size, many=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        type.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)