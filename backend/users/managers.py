from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, login, password=None, full_name=None, cpf=None, birth_date=None, **extra_fields):
        """
        Cria e retorna um usuário com o login e senha fornecidos.
        """
        if not login:
            raise ValueError('O login é obrigatório')
        
        user = self.model(login=login, full_name=full_name, cpf=cpf, birth_date=birth_date, **extra_fields)
        user.set_password(password)  # Criptografa a senha
        user.save(using=self._db)
        return user

    def create_superuser(self, login, password=None, full_name=None, cpf=None, birth_date=None, **extra_fields):
        """
        Cria e retorna um superusuário.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(login, password, full_name, cpf, birth_date, **extra_fields)
