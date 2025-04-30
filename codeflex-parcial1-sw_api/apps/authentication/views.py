from django.contrib.auth import authenticate, login, get_user_model, logout
from rest_framework import status, views, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, email=email, password=password)
        if user:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            token_data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            response_data = {   
                'token': token_data,
                'user': {
                    'email': user.email,
                    'username': user.username,
                },
            }
            return Response(response_data, status=status.HTTP_200_OK)
        return Response({"detail": "Credenciales inválidas"}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):

        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response({"detail": "Se debe proporcionar el refresh token."},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            return Response({"detail": "Token de refresco inválido o ya ha sido invalidado."},
                            status=status.HTTP_400_BAD_REQUEST)

        logout(request)
        
        return Response({"detail": "Se cerró la sesión correctamente."}, status=status.HTTP_200_OK)