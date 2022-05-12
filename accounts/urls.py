from django.urls import path, include
from .api import LoginAPI, RegisterAPI, UserAPI

from knox.views import LogoutView


urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register/', RegisterAPI.as_view()),
    path('api/auth/login/', LoginAPI.as_view()),
    path('api/auth/user/', UserAPI.as_view()),
    path('api/auth/logout/', LogoutView.as_view(), name='knox_logout')
]
