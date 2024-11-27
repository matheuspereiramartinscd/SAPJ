from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import register_process, get_processes  # Corrigido para 'get_processes'


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),  # Inclui as URLs do app 'users'
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/processes/', get_processes, name='list_processes'),  # Corrigido para 'get_processes'
    path('api/processes/register/', register_process, name='register_process'),
    path('api/processes/list/', get_processes, name='list_processes'),  # Nova rota par



]
