from django.urls import path
from .views import login_view, userauthentication, account_list, account_details, user_list, user_details, balloons_list, balloons_details, color_list, color_details, type_list, type_details, size_list, size_details, product_item_list, product_item_details

urlpatterns = [
  path('login/', login_view, name='login'),
  path('user/', userauthentication, name='user'),

  path('accounts/', account_list, name='account-list'),
  path('accounts/<int:pk>/', account_details, name='account-detail'),

  path('users/', user_list, name='user-list'),
  path('users/<int:pk>/', user_details, name='user-details'),

  path('products/', balloons_list, name='product-list'),
  path('products/<int:pk>/',balloons_details, name='product-details'), 

  path('products/colors/', color_list, name='color-list'),
  path('products/colors/<int:pk>/',color_details, name='color-details'), 

  path('products/types/', type_list, name='type-list'),
  path('products/types/<int:pk>/',type_details, name='type-details'),

  path('products/sizes/', size_list, name='size-list'),
  path('products/sizes/<int:pk>/',size_details, name='size-details'), 

  path('products/product_item/', product_item_list, name='size-list'),
  path('products/product_item/<int:pk>/',product_item_details, name='size-details'), 

]

