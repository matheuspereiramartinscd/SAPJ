from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import register_process, get_processes  # Corrigido para 'get_processes'
from users.views import ProcessDetails
from users.views import ProcessEditView
from users.views import listar_pessoas
from users.views import detalhes_pessoa
from users.views import delete_pessoa
from users.views import EditPessoaView
from users.views import TaskListCreateView
from users.views import TaskEditView
from users.views import detalhes_task
from users.views import delete_pessoa, delete_task
from users.views import DocumentListCreate, DocumentDelete
from users.views import PagamentoViewSet  # Importando o viewset de Pagamento
from django.conf.urls.static import static
from django.conf import settings
from users.views import create_checkout_session
from users.views import success, cancel
from users.views import create_payment_intent
from users.views import search_view
from users.views import UploadPhotoView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),  # Inclui as URLs do app 'users'
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/processes/', get_processes, name='list_processes'),
    path('api/processes/register/', register_process, name='register_process'),
    path('api/processes/list/', get_processes, name='list_processes'),
    path('api/processes/details/<int:pk>/', ProcessDetails.as_view(), name='process_details'),
    path('api/people/list/', listar_pessoas, name='listar_pessoas'),
    path('api/processes/edit/<int:id>/', ProcessEditView.as_view(), name='process-edit'),
    path('api/pessoas/<int:id>/', detalhes_pessoa, name='detalhes_pessoa'),
    path('api/pessoas/<int:id>/delete/', delete_pessoa, name='delete_pessoa'),
    path('api/pessoas/edit/<int:id>/', EditPessoaView.as_view(), name='edit_pessoa'),
    path('api/tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('api/tasks/edit/<int:id>/', TaskEditView.as_view(), name='edit_task'),
    path('api/tasks/<int:id>/', detalhes_task, name='detalhes_task'),
    path('api/tasks/<int:id>/delete/', delete_task, name='delete_task'),
    path('api/documents/', DocumentListCreate.as_view(), name='list_create_documents'),
    path('api/documents/delete/<int:id>/', DocumentDelete.as_view(), name='delete_document'),
 path('create-checkout-session/', create_checkout_session, name='create_checkout_session'),
    # Adicionando a rota para pagamentos
    path('api/upload-photo/', UploadPhotoView.as_view(), name='upload_photo'),
     path('api/create-payment-intent/', create_payment_intent, name='create-payment-intent'),
    path('success/', success, name='success'),
    path('cancel/', cancel, name='cancel'),
path('api/pessoas/<int:id>/upload-photo/', UploadPhotoView.as_view(), name='upload_photo'),


    path('api/pagamentos/', PagamentoViewSet.as_view({'get': 'list', 'post': 'create','patch': 'partial_update'}), name='pagamento-list-create'),
    path('api/pagamentos/<int:pk>/', PagamentoViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update','delete': 'destroy'}), name='pagamento-detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
