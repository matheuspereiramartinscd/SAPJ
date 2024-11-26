from django.contrib.auth.models import User
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

class LoginAuthentication(BaseAuthentication):
    def authenticate(self, request):
        login = request.data.get('username')
        password = request.data.get('password')

        if not login or not password:
            raise AuthenticationFailed('Credenciais inválidas')

        try:
            user = User.objects.get(login=login)
        except User.DoesNotExist:
            raise AuthenticationFailed('No active account found with the given credentials')

        if not user.check_password(password):
            raise AuthenticationFailed('Invalid credentials')

        return (user, None)
