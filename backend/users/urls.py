from django.urls import path
from .views import UserRegistrationView, UserLoginView
from .views import register_process
from . import views
from .views import get_processes  # Corrigido para 'get_processes'


urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('api/processes/', register_process, name='register_process'),
    path('processes/<int:id>/', views.delete_process, name='delete_process'),
     path('processes/', views.register_process, name='register_process'),
    path('api/processes/list/', get_processes, name='list_processes'),  # Nova rota para lista de processos
    
]