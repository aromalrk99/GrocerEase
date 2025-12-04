from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import UserProfile, Product, Order, OrderItem, Cart, CartItem
from .serializers import (
    UserProfileSerializer, ProductSerializer, OrderSerializer,
    CartSerializer, CartItemSerializer, UserRegistrationSerializer
)
import uuid

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_id': user.id,
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        profile = UserProfile.objects.get(user=user)
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_id': user.id,
            'role': profile.role,
        })
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    profile = UserProfile.objects.get(user=request.user)
    serializer = UserProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    profile = UserProfile.objects.get(user=request.user)
    request.user.first_name = request.data.get('first_name', request.user.first_name)
    request.user.last_name = request.data.get('last_name', request.user.last_name)
    request.user.email = request.data.get('email', request.user.email)
    request.user.save()
    profile.phone = request.data.get('phone', profile.phone)
    profile.address = request.data.get('address', profile.address)
    profile.save()
    serializer = UserProfileSerializer(profile)
    return Response(serializer.data)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)
    product = Product.objects.get(id=product_id)
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += int(quantity)
    else:
        cart_item.quantity = int(quantity)
    cart_item.save()
    return Response({'message': 'Added to cart'}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, item_id):
    CartItem.objects.filter(id=item_id).delete()
    return Response({'message': 'Removed from cart'}, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart_item(request, item_id):
    cart_item = CartItem.objects.get(id=item_id)
    cart_item.quantity = request.data.get('quantity', cart_item.quantity)
    cart_item.save()
    return Response({'message': 'Updated'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkout(request):
    cart = Cart.objects.get(user=request.user)
    items = cart.items.all()
    if not items:
        return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)
    
    total = sum(item.product.price * item.quantity for item in items)
    order_id = f"ORD-{uuid.uuid4().hex[:8].upper()}"
    order = Order.objects.create(
        user=request.user,
        order_id=order_id,
        total=total,
        shipping_address=request.data.get('shipping_address', ''),
        payment_method=request.data.get('payment_method', 'Card')
    )
    for item in items:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price
        )
    cart.items.all().delete()
    return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_detail(request, order_id):
    order = Order.objects.get(order_id=order_id, user=request.user)
    serializer = OrderSerializer(order)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def staff_dashboard(request):
    profile = UserProfile.objects.get(user=request.user)
    if profile.role != 'staff':
        return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    return Response({
        'total_products': Product.objects.count(),
        'total_orders': Order.objects.count(),
        'pending_orders': Order.objects.filter(status='Pending').count(),
        'out_of_stock': Product.objects.filter(stock=0).count(),
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def staff_orders(request):
    profile = UserProfile.objects.get(user=request.user)
    if profile.role != 'staff':
        return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    orders = Order.objects.all().order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_status(request, order_id):
    profile = UserProfile.objects.get(user=request.user)
    if profile.role != 'staff':
        return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    order = Order.objects.get(order_id=order_id)
    order.status = request.data.get('status', order.status)
    order.save()
    return Response(OrderSerializer(order).data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_product(request, product_id):
    profile = UserProfile.objects.get(user=request.user)
    if profile.role != 'staff':
        return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    Product.objects.filter(id=product_id).delete()
    return Response({'message': 'Product deleted'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product(request):
    profile = UserProfile.objects.get(user=request.user)
    if profile.role != 'staff':
        return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_product(request, product_id):
    profile = UserProfile.objects.get(user=request.user)
    if profile.role != 'staff':
        return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    product = Product.objects.get(id=product_id)
    serializer = ProductSerializer(product, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
