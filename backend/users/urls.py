from django.urls import path
from .views import UserRegistrationView, UserLoginView
from .views import register_process
from . import views
from .views import get_processes  # Corrigido para 'get_processes'
from .views import ProcessDetails
from .views import registrar_pessoa, listar_pessoas
from .views import ProcessDetails
from .views import TaskEditView
from .views import delete_pessoa, delete_task
from .views import DocumentListCreate, DocumentDelete


urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('api/processes/', register_process, name='register_process'),
    path('processes/<int:id>/', views.delete_process, name='delete_process'),
    path('processes/', views.register_process, name='register_process'),
    path('api/processes/list/', get_processes, name='list_processes'),  # Nova rota para lista de processos
    path('processes/<int:id>/', views.edit_process, name='edit_process'),  # Rota para editar processo
    path('api/processes/details/<int:pk>/', ProcessDetails.as_view(), name='process_details'),  # Detalhes do processo
      path('pessoas/registrar/', registrar_pessoa, name='registrar_pessoa'),
    path('pessoas/', listar_pessoas, name='listar_pessoas'),
 # Adicionando as rotas de documentos
    path('api/documents/', DocumentListCreate.as_view(), name='list_create_documents'),
    path('api/documents/delete/<int:id>/', DocumentDelete.as_view(), name='delete_document'),

    
]


