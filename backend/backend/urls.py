from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),  # Acesso ao painel administrativo do Django
    path('api/', include('users.urls')),  # Inclui as URLs do app 'users', incluindo registro e outras
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Endpoint para gerar o token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Endpoint para renovar o token
]
