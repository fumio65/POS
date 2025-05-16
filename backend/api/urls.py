from django.urls import path
from .views import account_list, account_details

urlpatterns = [
  path('accounts/', account_list, name='account-list'),
  path('accounts/<int:pk>/', account_details, name='account-detail'),

]
