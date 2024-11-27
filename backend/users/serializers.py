from rest_framework import serializers
from .models import User, Processo
from .models import Pessoa


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
    # Altere para CharField ou TextField para permitir texto livre
    honorarios = serializers.CharField(required=False, allow_blank=True)  # Permite texto livre
    porcentagem = serializers.CharField(required=False, allow_blank=True)  # Permite texto livre
    
    status = serializers.ChoiceField(choices=[('Em andamento', 'Em andamento'), ('Arquivado', 'Arquivado')], required=True)

    class Meta:
        model = Processo
        fields = [
            'id', 'codigo', 'numero', 'tipo', 'acao', 'comarca', 'cliente', 
            'tribunal', 'foro', 'vara', 'honorarios', 'porcentagem', 'valorCausa',
            'status', 'desfecho', 'resultadoRecurso', 'ultimoEvento', 
            'ultimosAndamentos', 'anotacoes'
        ]

    def validate_honorarios(self, value):
        """Não há validação, aceita qualquer texto agora."""
        return value

    def validate_porcentagem(self, value):
        """Não há validação, aceita qualquer texto agora."""
        return value

class PessoaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pessoa
        fields = ['id', 'codigo', 'nome', 'cpf', 'rg', 'telefone', 'email', 'cidade', 'estado']
