from django.contrib.auth import login as django_login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, LoginSerializer
from .models import User


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
