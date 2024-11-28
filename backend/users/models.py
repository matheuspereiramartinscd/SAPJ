from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission


class UserManager(BaseUserManager):
    def create_user(self, login, password=None, full_name=None, cpf=None, birth_date=None, **extra_fields):
        """
        Cria e retorna um usuário com o login e senha fornecidos.
        """
        if not login:
            raise ValueError('O login é obrigatório')

        user = self.model(login=login, full_name=full_name, cpf=cpf, birth_date=birth_date, **extra_fields)
        user.password = password  # Não criptografa a senha
        user.save(using=self._db)
        return user

    def create_superuser(self, login, password=None, full_name=None, cpf=None, birth_date=None, **extra_fields):
        """
        Cria e retorna um superusuário.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(login, password, full_name, cpf, birth_date, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    full_name = models.CharField(max_length=255)
    login = models.CharField(max_length=150, unique=True)  # Este é o 'username'
    cpf = models.CharField(max_length=14, unique=True, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    password = models.CharField(max_length=128)  # Armazena a senha diretamente
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Necessário para admin

    objects = UserManager()

    USERNAME_FIELD = 'login'
    REQUIRED_FIELDS = ['full_name', 'cpf', 'birth_date']

    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_groups',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions',
        blank=True
    )

    # Remover ou alterar o método set_password para não criptografar a senha
    def set_password(self, raw_password):
        """
        Método vazio ou sem criptografia.
        """
        self.password = raw_password  # Salva a senha sem hashing

    def __str__(self):
        return self.login  # Armazena a senha de forma segura


class Processo(models.Model):
    codigo = models.TextField(blank=True, null=True)  # Aceita qualquer tipo de dado, inclusive texto ou números
    numero = models.TextField(blank=True, null=True)  # Aceita qualquer tipo de dado, inclusive texto ou números
    tipo = models.TextField(blank=True, null=True)  # Aceita qualquer tipo de dado, inclusive texto ou números
    acao = models.TextField(blank=True, null=True)  # Aceita qualquer tipo de dado, inclusive texto ou números
    comarca = models.TextField(blank=True, null=True)  # Aceita qualquer tipo de dado, inclusive texto ou números
    cliente = models.TextField(blank=True, null=True)  # Aceita qualquer tipo de dado, inclusive texto ou números
    
    # Campos adicionais
    tribunal = models.TextField(blank=True, null=True)  # Aceita qualquer tipo de dado, inclusive texto ou números
    foro = models.TextField(blank=True, null=True)  # Aceita qualquer tipo de dado, inclusive texto ou números
    vara = models.TextField(blank=True, null=True)  # Aceita qualquer tipo de dado, inclusive texto ou números
    honorarios = models.TextField(blank=True, null=True)  # Agora aceita qualquer tipo de dado
    porcentagem = models.TextField(blank=True, null=True)  # Agora aceita qualquer tipo de dado
    valorCausa = models.TextField(blank=True, null=True)  # Agora aceita qualquer tipo de dado
    status = models.TextField(blank=True, null=True)  # Aceita qualquer tipo de dado, inclusive texto ou números
    
    # Campos de progresso do processo
    desfecho = models.TextField(blank=True, null=True)  # Aceita qualquer tipo de dado
    resultadoRecurso = models.TextField(blank=True, null=True)  # Aceita qualquer tipo de dado
    ultimoEvento = models.TextField(blank=True, null=True)  # Aceita qualquer tipo de dado
    ultimosAndamentos = models.TextField(blank=True, null=True)  # Aceita qualquer tipo de dado
    anotacoes = models.TextField(blank=True, null=True)  # Aceita qualquer tipo de dado

    def __str__(self):
        return f"{self.codigo} - {self.numero}"


class Pessoa(models.Model):
    codigo = models.CharField(max_length=10)
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14, unique=True)
    rg = models.CharField(max_length=20, blank=True, null=True)
    telefone = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=2)
    
    tipo = models.CharField(
        max_length=20,
        choices=[('Fisica', 'Física'), ('Juridica', 'Jurídica')]  # Aqui agora aceita 'Física' e 'Jurídica' com acento
    )

    def __str__(self):
        return self.nome

from django.db import models

class Task(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('em_andamento', 'Em andamento'),
        ('concluida', 'Concluída'),
    ]

    titulo = models.CharField(max_length=255)
    processo = models.ForeignKey(Processo, on_delete=models.CASCADE, related_name='tasks')
    pessoas = models.ManyToManyField(Pessoa, related_name='tasks')
    data_conclusao = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pendente')
    criado_em = models.DateTimeField(auto_now_add=True)  # Preenche automaticamente a data de criação
    descricao = models.TextField(blank=True, null=True)  # Campo de descrição opcional

    def __str__(self):
        return f"{self.titulo} - {self.status}"
