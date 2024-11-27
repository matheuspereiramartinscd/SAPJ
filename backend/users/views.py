from django.contrib.auth import login as django_login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, LoginSerializer
from .models import User
from .models import Processo
from rest_framework.decorators import api_view
from .serializers import ProcessoSerializer
from django.http import JsonResponse

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
            status=data.get('status', 'Em andamento'),
        )
        return Response({'message': 'Processo cadastrado com sucesso!'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Processo

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
        raise Http404("Processo não encontrado")  # Se não encontrar o processo, retorna erro 404