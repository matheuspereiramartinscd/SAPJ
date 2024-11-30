from django.contrib.auth import login as django_login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, LoginSerializer, ProcessoSerializer
from .models import User, Processo
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.exceptions import NotFound
from .serializers import PessoaSerializer
from .models import Pessoa 
from .serializers import TaskSerializer
from rest_framework import generics
from .models import Task  # Importa o modelo Task

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        login = serializer.validated_data['login']
        password = serializer.validated_data['password']

        try:
            user = User.objects.get(login=login)
            if user.password == password:
                django_login(request, user)
                return Response({"message": "Login bem-sucedido!"}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Credenciais inválidas!"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "Credenciais inválidas!"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register_process(request):
    data = request.data
    try:
        processo = Processo.objects.create(
            codigo=data.get('codigo'),
            numero=data.get('numero'),
            tipo=data.get('tipo'),
            acao=data.get('acao'),
            comarca=data.get('comarca'),
            cliente=data.get('cliente'),
            tribunal=data.get('tribunal', ''),
            foro=data.get('foro', ''),
            vara=data.get('vara', ''),
            honorarios=data.get('honorarios', ''),
            porcentagem=data.get('porcentagem', ''),
            valorCausa=data.get('valorCausa', ''),
            status=data.get('status', 'Em andamento'),
            desfecho=data.get('desfecho', ''),
            resultadoRecurso=data.get('resultadoRecurso', ''),
            ultimoEvento=data.get('ultimoEvento', ''),
            ultimosAndamentos=data.get('ultimosAndamentos', ''),
            anotacoes=data.get('anotacoes', '')
        )
        return Response({'message': 'Processo cadastrado com sucesso!'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def get_processes(request):
    queryset = Processo.objects.all()

    # Filtragem de acordo com os parâmetros
    if 'archived' in request.query_params:
        archived = request.query_params['archived'] == 'true'
        queryset = queryset.filter(archived=archived)

    if 'ongoing' in request.query_params:
        ongoing = request.query_params['ongoing'] == 'true'
        queryset = queryset.filter(status='Em andamento')

    serializer = ProcessoSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_process(request, id):
    try:
        processo = Processo.objects.get(id=id)  # Tenta encontrar o processo pelo id
        processo.delete()  # Deleta o processo
        return JsonResponse({'message': 'Processo excluído com sucesso'}, status=204)  # Retorna sucesso
    except Processo.DoesNotExist:
        return JsonResponse({'error': 'Processo não encontrado'}, status=404)  # Retorna erro se não encontrado

@api_view(['PUT'])
def edit_process(request, id):
    try:
        # Tenta encontrar o processo pelo ID
        processo = Processo.objects.get(id=id)
    except Processo.DoesNotExist:  # Corrigido para Processo (e não Process)
        return Response({'error': 'Processo não encontrado'}, status=status.HTTP_404_NOT_FOUND)

    # Serializa os dados do processo com os dados fornecidos na requisição
    serializer = ProcessoSerializer(processo, data=request.data, partial=True)  # partial=True permite atualização parcial dos campos

    # Se os dados forem válidos, salva e retorna a resposta
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProcessDetails(APIView):
    def get(self, request, pk, format=None):
        try:
            processo = Processo.objects.get(pk=pk)
        except Processo.DoesNotExist:
            return Response({"error": "Processo não encontrado"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProcessoSerializer(processo)
        return Response(serializer.data)


class ProcessEditView(APIView):
    def put(self, request, id, format=None):
        try:
            processo = Processo.objects.get(id=id)  # Corrigido para Processo
        except Processo.DoesNotExist:  # Corrigido para Processo
            return Response({'error': 'Processo não encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProcessoSerializer(processo, data=request.data, partial=True)  # Corrigido para ProcessoSerializer
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def registrar_pessoa(request):
    """
    Função para registrar uma pessoa.
    """
    serializer = PessoaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Pessoa registrada com sucesso!", "data": serializer.data}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def listar_pessoas(request):
    pessoas = Pessoa.objects.all()
    serializer = PessoaSerializer(pessoas, many=True)
    return Response(serializer.data)
    
@api_view(['GET'])
def detalhes_pessoa(request, id):
    """
    Função para obter os detalhes de uma pessoa específica.
    """
    try:
        pessoa = Pessoa.objects.get(id=id)
        serializer = PessoaSerializer(pessoa)
        return Response(serializer.data, status=200)
    except Pessoa.DoesNotExist:
        return Response({'error': 'Pessoa não encontrada'}, status=404)


@api_view(['DELETE'])
def delete_pessoa(request, id):
    """
    Função para deletar uma pessoa pelo ID.
    """
    try:
        pessoa = Pessoa.objects.get(id=id)  # Tenta encontrar a pessoa pelo ID
        pessoa.delete()  # Deleta a pessoa
        return JsonResponse({'message': 'Pessoa excluída com sucesso'}, status=204)  # Retorna sucesso
    except Pessoa.DoesNotExist:
        return JsonResponse({'error': 'Pessoa não encontrada'}, status=404)  # Retorna erro se não encontrada

class EditPessoaView(APIView):
    def put(self, request, id, format=None):
        try:
            pessoa = Pessoa.objects.get(id=id)  # Tenta encontrar a pessoa pelo ID
        except Pessoa.DoesNotExist:
            return Response({'error': 'Pessoa não encontrada'}, status=status.HTTP_404_NOT_FOUND)

        # Serializa os dados da pessoa com os dados fornecidos na requisição
        serializer = PessoaSerializer(pessoa, data=request.data, partial=True)  # partial=True permite atualização parcial dos campos

        # Se os dados forem válidos, salva e retorna a resposta
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskListCreateView(generics.ListCreateAPIView):
    """
    View para listar todas as tarefas e criar uma nova tarefa.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskEditView(APIView):
    """
    View to edit a task.
    """

    def put(self, request, id, format=None):
        try:
            # Try to find the task by ID
            task = Task.objects.get(id=id)
        except Task.DoesNotExist:
            return Response({'error': 'Tarefa não encontrada'}, status=status.HTTP_404_NOT_FOUND)

        # Serialize the task with the new data provided in the request
        serializer = TaskSerializer(task, data=request.data, partial=True)  # partial=True allows partial updates

        # If the data is valid, save and return the updated task
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def detalhes_task(request, id):
    """
    Função para obter os detalhes de uma tarefa específica.
    """
    try:
        task = Task.objects.get(id=id)  # Tenta encontrar a tarefa pelo ID
        serializer = TaskSerializer(task)  # Serializa a tarefa encontrada
        return Response(serializer.data, status=200)  # Retorna os dados serializados e status HTTP 200
    except Task.DoesNotExist:
        return Response({'error': 'Tarefa não encontrada'}, status=404)  # Retorna erro se a tarefa não for encontrada

@api_view(['DELETE'])
def delete_pessoa(request, id):
    """
    Função para deletar uma pessoa pelo ID.
    """
    try:
        pessoa = Pessoa.objects.get(id=id)  # Tenta encontrar a pessoa pelo ID
        pessoa.delete()  # Deleta a pessoa
        return JsonResponse({'message': 'Pessoa excluída com sucesso'}, status=204)  # Retorna sucesso
    except Pessoa.DoesNotExist:
        return JsonResponse({'error': 'Pessoa não encontrada'}, status=404)  # Retorna erro se não encontrada

@api_view(['DELETE'])
def delete_task(request, id):
    """
    Função para deletar uma tarefa pelo ID.
    """
    try:
        task = Task.objects.get(id=id)  # Tenta encontrar a tarefa pelo ID
        task.delete()  # Deleta a tarefa
        return JsonResponse({'message': 'Tarefa excluída com sucesso'}, status=204)  # Retorna sucesso
    except Task.DoesNotExist:
        return JsonResponse({'error': 'Tarefa não encontrada'}, status=404)  # Retorna erro se não encontrada


from .models import Document
from .serializers import DocumentSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics

class DocumentListCreate(generics.ListCreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        print(f"Data received: {request.data}")  # Adicionando um log para depuração
        return super().create(request, *args, **kwargs)


class DocumentDelete(APIView):
    def delete(self, request, id):
        try:
            # Tenta encontrar o documento pelo ID
            document = Document.objects.get(id=id)
            document.delete()  # Deleta o documento
            return JsonResponse({'message': 'Documento excluído com sucesso'}, status=204)  # Retorna sucesso
        except Document.DoesNotExist:
            return JsonResponse({'error': 'Documento não encontrado'}, status=404)  # Retorna erro se não encontrado

from .models import Pagamento
from .serializers import PagamentoSerializer
from rest_framework import viewsets
from django.conf import settings
import stripe


class PagamentoViewSet(viewsets.ModelViewSet):
    queryset = Pagamento.objects.all()  # Obtém todos os pagamentos
    serializer_class = PagamentoSerializer  # Usa o serializer para formatar os dados

    def destroy(self, request, *args, **kwargs):
        # Este método será chamado quando o endpoint DELETE for chamado
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()




def create_checkout_session(request):
    checkout_session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[
            {
                'price_data': {
                    'currency': 'brl',
                    'product_data': {
                        'name': 'Produto Exemplo',
                    },
                    'unit_amount': 1000,  # Valor em centavos (R$10.00)
                },
                'quantity': 1,
            },
        ],
        mode='payment',
        success_url=request.build_absolute_uri('/success/'),
        cancel_url=request.build_absolute_uri('/cancel/'),
    )
    return JsonResponse({
        'id': checkout_session.id
    })

from django.shortcuts import render


# Função para renderizar a página de sucesso
def success(request):
    return render(request, 'payments/success.html')  # Renderiza o template success.html

def cancel(request):
    return render(request, 'payments/cancel.html')  # Renderiza o template cancel.htm



def payment_success(request):
    return render(request, 'payments/success.html')

def payment_cancel(request):
    return render(request, 'payments/cancel.html')

def stripe_webhook(request):
    # Lógica para verificar o status do pagamento
    if pagamento_confirmado:
        return redirect('payment_success')
    else:
        return redirect('payment_cancel')


import json


from django.views.decorators.csrf import csrf_exempt

 
stripe.api_key = settings.STRIPE_TEST_SECRET_KEY

@csrf_exempt
def create_payment_intent(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            amount = data.get('amount', 0)  # Valor do pagamento
            
            # Cria o PaymentIntent com a chave secreta de teste
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='brl',  # Moeda (Real Brasileiro)
                payment_method_types=['card'],  # Método de pagamento (cartões)
            )

            return JsonResponse({
                'clientSecret': intent.client_secret,
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


def search_view(request):
    if request.method == "POST":
        # Obter o número do processo a partir da requisição POST
        search_query = request.POST.get("numeroProcesso")

        # Definir a URL e cabeçalhos para a requisição à API Pública do Datajud
        api_url = 'https://api-publica.datajud.cnj.jus.br/api_publica_tjmg/_search'
        api_key = 'cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw=='  # Chave Pública
        headers = {
            'Authorization': f'APIKey {api_key}',
            'Content-Type': 'application/json'
        }

        # Corpo da requisição para a API
        data = {
            "query": {
                "match": {
                    "numeroProcesso": search_query
                }
            }
        }

        # Realizar a requisição para a API Pública
        response = requests.post(api_url, json=data, headers=headers)

        if response.status_code == 200:
            result_data = response.json()
            # Extrair os hits (metadados) da resposta da API
            results = result_data.get("hits", {}).get("hits", [])
            return JsonResponse({"results": results})

        else:
            # Caso a requisição falhe, retornar um erro
            return JsonResponse({"error": "Erro ao buscar jurisprudência"}, status=500)

    # Para o método GET, apenas renderizar a página de pesquisa
    return render(request, 'search_page.html')  # A página HTML que contém a pesquisa


from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

@api_view(['POST'])
def upload_photo(request):
    # Verifique se o arquivo foi enviado
    if 'foto' not in request.FILES:
        return Response({'error': 'No photo uploaded'}, status=400)

    foto = request.FILES['foto']

    # Aqui você pode identificar a pessoa e atualizar a foto
    pessoa_id = request.data.get('person_id')  # Supondo que você passe o ID da pessoa
    try:
        pessoa = Pessoa.objects.get(id=pessoa_id)
    except Pessoa.DoesNotExist:
        return Response({'error': 'Pessoa não encontrada'}, status=404)

    # Atualize o campo de foto
    pessoa.foto = foto
    pessoa.save()

    return Response({'message': 'Foto atualizada com sucesso', 'file_name': foto.name})



class UploadPhotoView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        try:
            person_id = kwargs.get('id')  # A chave 'id' deve vir da URL
            person = Pessoa.objects.get(id=person_id)  # Aqui alteramos Person para Pessoa
            photo = request.data.get('file')  # Corrigido para "file", pois no seu frontend o campo se chama 'file'

            if not photo:
                return Response({"detail": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)

            # Salve a foto
            person.foto = photo  # Aqui estamos assumindo que o campo é 'foto' no modelo Pessoa
            person.save()

            return Response({"file_name": photo.name, "photo_url": person.foto.url}, status=status.HTTP_200_OK)

        except Pessoa.DoesNotExist:  # Certifique-se de que está tratando a exceção corretamente
            return Response({"detail": "Person not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def contar_processos(request):
    """
    Conta o total de processos registrados no banco de dados.
    """
    total_processos = Processo.objects.count()  # Conta todos os processos na tabela Processo
    return JsonResponse({'total_processos': total_processos})

from django.db.models import Sum

def get_total_faturamento():
    total_faturamento = Task.objects.filter(status='concluida').aggregate(Sum('valor_total_processo'))
    return total_faturamento['valor_total_processo__sum'] or 0  # Se não houver valor, retorna 0

from rest_framework.views import APIView
from rest_framework.response import Response

class TotalFaturamentoView(APIView):
    def get(self, request):
        total_faturamento = Task.objects.filter(status='concluida').aggregate(Sum('valor_total_processo'))
        return Response({'total_faturamento': total_faturamento['valor_total_processo__sum'] or 0})