from . import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)


urlpatterns = [
    path('Register/', views.UserPostView.as_view(), name='register'),
    path('UserPanel/', views.UserDetailView.as_view(), name='user_detail'),
    path('Logout/', views.LogoutView.as_view(), name='logout'),
    path('Login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('Login/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]
