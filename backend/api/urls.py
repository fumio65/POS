from django.urls import path
from .views import account_list, account_details, user_list, user_details, product_list, product_details, color_list, color_details, type_list, type_details, size_list, size_details

urlpatterns = [
  path('accounts/', account_list, name='account-list'),
  path('accounts/<int:pk>/', account_details, name='account-detail'),

  path('users/', user_list, name='user-list'),
  path('users/<int:pk>/', user_details, name='user-details'),

  path('products/', product_list, name='product-list'),
  path('products/<int:pk>/',product_details, name='product-details'), 

  path('products/colors', color_list, name='product-list'),
  path('products/colors/<int:pk>/',color_details, name='product-details'), 
  
  path('products/types', type_list, name='product-list'),
  path('products/types/<int:pk>/',type_details, name='product-details'), 

  path('products/sizes', size_list, name='product-list'),
  path('products/sizes/<int:pk>/',size_details, name='product-details'), 
]
