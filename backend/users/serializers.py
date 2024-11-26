from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['login', 'full_name', 'cpf', 'birth_date', 'password']
        extra_kwargs = {'password': {'write_only': True}}  # Criptografando a senha

    def create(self, validated_data):
        # Agora estamos usando 'login' como campo de autenticação
        user = User.objects.create_user(
            login=validated_data['login'],  # 'login' será o campo de autenticação
            password=validated_data['password'],
            full_name=validated_data['full_name'],
            cpf=validated_data['cpf'],
            birth_date=validated_data['birth_date'],
        )
        return user
