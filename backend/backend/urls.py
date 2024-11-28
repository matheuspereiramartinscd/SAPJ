from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import register_process, get_processes  # Corrigido para 'get_processes'
from users.views import ProcessDetails
from users.views import ProcessEditView
from users.views import listar_pessoas 
from users.views import detalhes_pessoa
from users.views import delete_pessoa

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),  # Inclui as URLs do app 'users'
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/processes/', get_processes, name='list_processes'),  # Corrigido para 'get_processes'
    path('api/processes/register/', register_process, name='register_process'),
    path('api/processes/list/', get_processes, name='list_processes'),  # Nova rota par
     path('api/processes/details/<int:pk>/', ProcessDetails.as_view(), name='process_details'),  # Detalhes do processo
    path('api/people/list/', listar_pessoas, name='listar_pessoas'),
 path('api/processes/edit/<int:id>/', ProcessEditView.as_view(), name='process-edit'),
 path('api/pessoas/<int:id>/', detalhes_pessoa, name='detalhes_pessoa'),
path('api/pessoas/<int:id>/delete/', delete_pessoa, name='delete_pessoa'),

]
