from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend


from .filters import UnitFilter, ExecutorFilter
from .models import Executor, Unit, User
from .permissions import HasAdminRole
from .serializers import UnitSerializer, ExecutorSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, HasAdminRole]

    def create(self, request, *args, **kwargs):
        if not request.user.is_admin_role:
            return Response(
                {'error': ('Добавлять пользователей может '
                           'только администратор!')},
                status=status.HTTP_403_FORBIDDEN
            )
        if 'username' not in request.data:
            return Response({'error': 'Необходимо поле - Логин'},
                            status=status.HTTP_400_BAD_REQUEST)
        if 'password' not in request.data:
            return Response({'error': 'Необходимо поле - Пароль'},
                            status=status.HTTP_400_BAD_REQUEST)
        if 'executor' not in request.data:
            return Response({'error': 'Необходимо поле - Исполнитель'},
                            status=status.HTTP_400_BAD_REQUEST)
        password = request.data['password']
        username = request.data['username']
        if Executor.objects.filter(pk=request.data['executor']).exists():
            executor = Executor.objects.get(pk=request.data['executor'])
        else:
            return Response({'error': 'Такого Исполнителя не существует!'},
                            status=status.HTTP_400_BAD_REQUEST)
        new_user = User.objects.create_user(username=username,
                                            password=password,
                                            executor=executor)
        user_serializer = UserSerializer(new_user)
        return Response(user_serializer.data,
                        status=status.HTTP_201_CREATED)

    @action(detail=False,
            methods=['get'],
            permission_classes=[IsAuthenticated])
    def profile(self, request):
        serializer = self.get_serializer(self.request.user)
        return Response(serializer.data,
                        status=status.HTTP_200_OK)


class UnitViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UnitSerializer
    queryset = Unit.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = UnitFilter
    permission_classes = [IsAuthenticated, HasAdminRole]
    pagination_class = None


class ExecutorViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ExecutorSerializer
    queryset = Executor.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = ExecutorFilter
    permission_classes = [IsAuthenticated, HasAdminRole]
    pagination_class = None
