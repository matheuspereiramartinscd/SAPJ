from rest_framework import serializers
from .models import User, Processo
from .models import Pessoa
from .models import Task 


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
    tipo = serializers.ChoiceField(choices=[('Fisica', 'Física'), ('Juridica', 'Jurídica')])  # Use os valores sem acento nas escolhas

    class Meta:
        model = Pessoa
        fields = ['id', 'codigo', 'nome', 'cpf', 'rg', 'foto', 'telefone', 'email', 'cidade', 'estado', 'tipo']

class TaskSerializer(serializers.ModelSerializer):
    processo = serializers.PrimaryKeyRelatedField(queryset=Processo.objects.all())
    pessoas = serializers.PrimaryKeyRelatedField(queryset=Pessoa.objects.all(), many=True)

    class Meta:
        model = Task
        fields = [
            'id', 'titulo', 'processo', 'pessoas', 'data_conclusao', 'status', 
            'criado_em', 'descricao', 'valor_total_processo', 'valor_advogado'  # Inclua os novos campos
        ]


# serializers.py

from .models import Document

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'file', 'description', 'created_at']

    file = serializers.FileField()  # Verifique se o campo FileField está sendo utilizado
from .models import Pagamento 

class PagamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagamento
        fields = ['id', 'codigo', 'nome', 'data', 'tipo', 'status', 'conta_bancaria', 'valor']

    def validate_codigo(self, value):
        """
        Verifica se o código do pagamento já existe.
        """
        if Pagamento.objects.filter(codigo=value).exists():
            raise serializers.ValidationError("Este código já existe. Por favor, forneça um código único.")
        return value