from django.contrib.auth import login as django_login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, LoginSerializer, ProcessoSerializer
from .models import User, Processo
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.exceptions import NotFound

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
