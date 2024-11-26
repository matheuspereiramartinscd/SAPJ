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
        user.set_password(password)  # Usa hashing para a senha
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
    password = models.CharField(max_length=128)  # A senha será armazenada com hash
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Necessário para admin

    # Adicionando o gerenciador personalizado
    objects = UserManager()

    USERNAME_FIELD = 'login'  # Define 'login' como o campo de autenticação
    REQUIRED_FIELDS = ['full_name', 'cpf', 'birth_date']  # Campos obrigatórios para criação de usuário

    # Relacionamentos com grupos e permissões
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_groups',  # Adiciona um nome relacionado único
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions',  # Adiciona um nome relacionado único
        blank=True
    )
