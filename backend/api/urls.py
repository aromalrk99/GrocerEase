from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', register, name='register'),
    path('auth/login/', login, name='login'),
    path('profile/', profile, name='profile'),
    path('profile/update/', update_profile, name='update_profile'),
    path('cart/', get_cart, name='get_cart'),
    path('cart/add/', add_to_cart, name='add_to_cart'),
    path('cart/remove/<int:item_id>/', remove_from_cart, name='remove_from_cart'),
    path('cart/update/<int:item_id>/', update_cart_item, name='update_cart_item'),
    path('checkout/', checkout, name='checkout'),
    path('orders/', get_orders, name='get_orders'),
    path('orders/<str:order_id>/', get_order_detail, name='get_order_detail'),
    path('staff/dashboard/', staff_dashboard, name='staff_dashboard'),
    path('staff/orders/', staff_orders, name='staff_orders'),
    path('staff/orders/<str:order_id>/update/', update_order_status, name='update_order_status'),
    path('staff/products/<int:product_id>/delete/', delete_product, name='delete_product'),
    path('staff/products/create/', create_product, name='create_product'),
    path('staff/products/<int:product_id>/update/', update_product, name='update_product'),
]
