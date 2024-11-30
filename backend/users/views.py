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