from rest_framework import serializers
from .models import User
from .models import Processo


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['login', 'full_name', 'cpf', 'birth_date', 'password']
        extra_kwargs = {'password': {'write_only': True}}  # Esconde a senha no retorno

    def create(self, validated_data):
        user = User.objects.create_user(
            login=validated_data['login'],
            password=validated_data['password'],
            full_name=validated_data['full_name'],
            cpf=validated_data['cpf'],
            birth_date=validated_data['birth_date'],
        )
        return user





class LoginSerializer(serializers.Serializer):
    login = serializers.CharField()
    password = serializers.CharField(write_only=True)

class ProcessoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Processo
        fields = ['id', 'codigo', 'numero', 'tipo', 'acao', 'comarca', 'cliente', 'status']