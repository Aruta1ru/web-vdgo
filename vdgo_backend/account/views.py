from rest_framework import status, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User
from .permissions import HasAdminRole
from .serializers import UserSerializer


@api_view(['POST'])
@permission_classes((IsAuthenticated, HasAdminRole))
def create_auth(request):
    if not request.user.is_admin_role:
        return Response('Добавлять пользователей может только администратор!',
                        status=status.HTTP_403_FORBIDDEN)
    if 'username' not in request.data:
        return Response('Необходимо поле "логин"',
                        status=status.HTTP_400_BAD_REQUEST)
    if 'password' not in request.data:
        return Response('Необходимо поле "пароль"',
                        status=status.HTTP_400_BAD_REQUEST)
    password = request.data['password']
    username = request.data['username']
    new_user = User.objects.create_user(username=username,
                                        password=password)
    return Response(f'Пользователь {new_user.username} успешно создан!',
                    status=status.HTTP_201_CREATED)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False,
            methods=['get'],
            permission_classes=[IsAuthenticated])
    def profile(self, request):
        serializer = self.get_serializer(self.request.user)
        return Response(serializer.data,
                        status=status.HTTP_200_OK)
