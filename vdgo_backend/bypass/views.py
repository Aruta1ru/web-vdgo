import os

from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from . import filters, models, serializers


class BypassViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Bypass.objects.all()
    serializer_class = serializers.BypassSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = filters.BypassFilter


class VdgoObjectViewSet(viewsets.ModelViewSet):
    queryset = models.VdgoObject.objects.all()
    serializer_class = serializers.VdgoObjectSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def perform_create(self, serializer):
        vdgo_object = serializer.save(
            phone_vdgo=self.requset.data['phone_vdgo'],
            email_vdgo=self.request.data['email_vdgo'],
            partial=True
        )
        return vdgo_object.data


class ManufacturerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Manufacturer.objects.all()
    serializer_class = serializers.ManufacturerSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None


class EquipmentModelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.EquipmentModel.objects.all()
    serializer_class = serializers.EquipmentModelSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['type', 'manufacturer']
    pagination_class = None


class UndoneReasonViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.UndoneReason.objects.all()
    serializer_class = serializers.UndoneReasonSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None


class ClientViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.ClientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        vdg_object = get_object_or_404(models.VdgoObject, id=self.kwargs['id'])
        return vdg_object.clients.all()


class EquipmentInfoViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.EquipmentInfoSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        equipment = get_object_or_404(models.Equipment, id=self.kwargs['id'])
        return equipment.info.all()


class ObjectBypassViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.ObjectBypassSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        vdg_object = get_object_or_404(models.VdgoObject, id=self.kwargs['id'])
        return vdg_object.bypasses.all().order_by('date_action')


class EquipmentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.EquipmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        vdg_object = get_object_or_404(models.VdgoObject, id=self.kwargs['id'])
        return vdg_object.equipment.all()


class FileViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.FileSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    parser_classes = (MultiPartParser,)
    filterset_fields = ('file_category',)

    def get_queryset(self):
        vdg_object = get_object_or_404(models.VdgoObject, id=self.kwargs['id'])
        return vdg_object.files.filter(is_deleted=False)

    @action(detail=False,
            methods=['post'],
            permission_classes=[IsAuthenticated])
    def load_files(self, request, id):
        for file in self.request.FILES.getlist('files'):
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                object_id = id
                date = str(
                    serializer.validated_data.get('bypass_date')
                ).replace('-', '')
                category = serializer.validated_data.get('file_category')
                file_path = os.path.join(settings.MEDIA_ROOT, str(object_id))
                if not os.path.exists(file_path):
                    os.mkdir(file_path)
                file_num = models.FileInfo.objects.filter(
                    object=serializer.validated_data.get('object'),
                    file_category=category
                ).count() + 1
                new_name = f'{object_id}_{date}_{category}_{file_num}'
                file_extension = os.path.splitext(str(file))[1]
                file.name = new_name + file_extension
                try:
                    default_storage.save(os.path.join(file_path, file.name),
                                         ContentFile(file.read()))
                    serializer.validated_data['filename'] = file.name
                    executor = self.request.user.executor
                    serializer.validated_data['user_add'] = executor
                    serializer.validated_data['file_num'] = file_num
                    size = os.path.getsize(os.path.join(file_path, file.name))
                    serializer.validated_data['file_size'] = size
                    serializer.save()
                except Exception as e:
                    return Response(
                        f'Не удалось загрузить файл {file.name} - {e}',
                        status=status.HTTP_400_BAD_REQUEST
                    )
        vdg_object = get_object_or_404(models.VdgoObject, id=id)
        queryset = vdg_object.files.filter(is_deleted=False)
        return Response(serializers.FileSerializer(queryset, many=True).data,
                        status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def load_data(request, id):
    try:
        bypass_buffer = models.BypassBuffer.objects.get(id_bypass=id)
        serializer = serializers.BypassBufferSerializer(
            bypass_buffer,
            data={'exec_vdgo': request.data['exec_vdgo'],
                  'undone_reason': request.data['undone_reason']},
            partial=True
        )
    except models.BypassBuffer.DoesNotExist:
        serializer = serializers.BypassBufferSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        bypass = get_object_or_404(models.Bypass, id=id)
        bypass_serializer = serializers.BypassSerializer(bypass)
        return Response(bypass_serializer.data,
                        status=status.HTTP_200_OK)
    else:
        return Response('Данные предоставлены неверно!',
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def load_info(request, id):
    try:
        equipment_buffer = models.EquipmentInfoBuffer.objects.get(
            id_st=id,
            id_bypass=request.data['id_bypass'])
        serializer = serializers.EquipmentInfoBufferSerializer(
            equipment_buffer,
            data=request.data,
            partial=True
        )
    except models.EquipmentInfoBuffer.DoesNotExist:
        serializer = serializers.EquipmentInfoBufferSerializer(
            data=request.data
        )
    if serializer.is_valid():
        serializer.save()
        equipment = get_object_or_404(models.Equipment, id=id)
        equipment_serializer = serializers.EquipmentSerializer(equipment)
        return Response(equipment_serializer.data,
                        status=status.HTTP_200_OK)
    else:
        return Response(f'Данные предоставлены неверно! {serializer.errors}',
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
def delete_file(request):
    file_id = request.data['file_id']
    file_record = get_object_or_404(models.FileInfo, id=file_id)
    if file_record.is_deleted:
        return Response(
            f'Файл {file_record.filename} уже был удален!',
            status=status.HTTP_400_BAD_REQUEST
        )
    file_path = os.path.join(
        settings.MEDIA_ROOT,
        str(file_record.object.id),
        str(file_record.filename))
    if not os.path.exists(file_path):
        file_record.is_deleted = True
        file_record.save()
        return Response(
            f'Файл {file_record.filename} не обнаружен в директории!',
            status=status.HTTP_400_BAD_REQUEST
        )
    try:
        os.remove(file_path)
        file_record.is_deleted = True
        file_record.save()
    except Exception as e:
        return Response(
            f'Не удалось удалить файл {file_record.filename} - {e}!',
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('Файл успешно удален',
                    status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def equipment_prev(request, id):
    prev_info = get_object_or_404(models.EquipmentInfoPrev, id=id)
    serializer = serializers.EquipmentInfoPrevSerializer(prev_info)
    return Response(serializer.data)
