import os
from wsgiref.util import FileWrapper

from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

from . import filters, models, serializers


class BypassViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Bypass.objects.all()
    serializer_class = serializers.BypassSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = filters.BypassFilter

    @action(['post'], detail=True, permission_classes=[IsAuthenticated])
    def load_data(self, request, pk):
        try:
            bypass_buffer = models.BypassBuffer.objects.get(id_bypass=pk)
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
            bypass = get_object_or_404(models.Bypass, id=pk)
            bypass_serializer = serializers.BypassSerializer(bypass)
            return Response(bypass_serializer.data,
                            status=status.HTTP_200_OK)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


class VdgoObjectViewSet(viewsets.ModelViewSet):
    queryset = models.VdgoObject.objects.all()
    serializer_class = serializers.VdgoObjectCommonSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def perform_create(self, serializer):
        vdgo_object = serializer.save(
            phone_vdgo=self.requset.data['phone_vdgo'],
            email_vdgo=self.request.data['email_vdgo'],
            partial=True
        )
        return vdgo_object.data

    @action(detail=True,
            methods=['post'],
            permission_classes=[IsAuthenticated])
    def load_files(self, request, pk):
        if not self.request.FILES:
            return Response('Нет файлов для загрузки!',
                            status=status.HTTP_400_BAD_REQUEST)
        for file in self.request.FILES.getlist('files'):
            try:
                if int(request.data['file_category']) == 0:
                    serializer = serializers.FileSerializer(data=request.data)
                else:
                    serializer = serializers.ITDLoadSerializer(
                        data=request.data
                    )
                if serializer.is_valid():
                    object_id = pk
                    date = str(
                        serializer.validated_data.get('bypass_date')
                    ).replace('-', '')
                    category = serializer.validated_data.get('file_category')
                    file_path = os.path.join(
                        settings.MEDIA_ROOT, str(object_id)
                    )
                    if not os.path.exists(file_path):
                        os.mkdir(file_path)
                    file_num = models.FileInfo.objects.filter(
                        object=serializer.validated_data.get('object'),
                        file_category=category
                    ).count() + 1
                    if category == 0:
                        new_name = f'{object_id}_{date}_{category}_{file_num}'
                    else:
                        new_name = f'{object_id}_{category}_{file_num}'
                    file_extension = os.path.splitext(str(file))[1]
                    file.name = new_name + file_extension
                    default_storage.save(os.path.join(file_path, file.name),
                                         ContentFile(file.read()))
                    serializer.validated_data['filename'] = file.name
                    executor = self.request.user.executor
                    serializer.validated_data['user_add'] = executor
                    serializer.validated_data['file_num'] = file_num
                    size = os.path.getsize(os.path.join(file_path, file.name))
                    serializer.validated_data['file_size'] = size
                    serializer.save()
                else:
                    return Response(
                        serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST
                    )
            except Exception as e:
                return Response(
                    f'Не удалось загрузить файл {file.name} - {e}',
                    status=status.HTTP_400_BAD_REQUEST
                )
        vdg_object = get_object_or_404(models.VdgoObject, id=pk)
        queryset = vdg_object.files.filter(
            is_deleted=False,
            file_category=category)
        return Response(serializers.FileSerializer(queryset, many=True).data,
                        status=status.HTTP_201_CREATED)


class ManufacturerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Manufacturer.objects.all()
    serializer_class = serializers.ManufacturerSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = filters.ManufacturerFilter
    pagination_class = None


class EquipmentModelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.EquipmentModel.objects.all()
    serializer_class = serializers.EquipmentModelSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = filters.EquipmentModelFilter
    pagination_class = None


class UndoneReasonViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.UndoneReason.objects.all()
    serializer_class = serializers.UndoneReasonSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None


class EquipmentTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.EquipmentType.objects.filter(
        id__in=[
            30, 35, 257, 41, 273, 275, 274, 277, 276, 39, 272, 271, 47, 48
        ]
    )
    serializer_class = serializers.EquipmentTypeSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None


class EquipmentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.EquipmentSerializer
    queryset = models.Equipment.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('object',)
    permission_classes = [IsAuthenticated]
    pagination_class = None

    @action(['post'], detail=True, permission_classes=[IsAuthenticated])
    def load_info(self, request, pk):
        try:
            equipment_buffer = models.EquipmentInfoBuffer.objects.get(
                id_st=pk,
                id_bypass=request.data['id_bypass']
            )
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
            equipment = get_object_or_404(models.Equipment, id=pk)
            equipment_serializer = serializers.EquipmentSerializer(equipment)
            return Response(equipment_serializer.data,
                            status=status.HTTP_200_OK)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


class FileViewSet(mixins.ListModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):
    serializer_class = serializers.FileSerializer
    queryset = models.FileInfo.objects.filter(is_deleted=False)
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('file_category', 'object')
    parser_classes = (MultiPartParser,)
    pagination_class = None

    @swagger_auto_schema(operation_description="Получить файл объекта",
                         responses={404: 'Файл не обнаружен'})
    @action(['get'], detail=True, permission_classes=[IsAuthenticated])
    def get_file(self, request, pk):
        file_record = get_object_or_404(models.FileInfo, pk=pk)
        file_path = os.path.join(
            settings.MEDIA_ROOT,
            str(file_record.object.id),
            str(file_record.filename)
        )
        if not os.path.exists(file_path):
            file_record.is_deleted = True
            file_record.save()
            return Response(
                {'error': (f'Файл {file_record.filename} '
                           'не обнаружен в директории!')},
                status=status.HTTP_404_NOT_FOUND
            )
        index = str(file_record.filename).find('.')
        extension = str(file_record.filename)[index + 1:].lower()
        if extension in ['jpeg', 'jpg', 'png', 'tiff']:
            if extension == 'jpg':
                extension = 'jpeg'
            content_type = f'image/{extension}'
        else:
            content_type = 'application/pdf'
        file_path = os.path.join(
            settings.MEDIA_ROOT,
            str(file_record.object.id),
            str(file_record.filename)
        )
        file = open(file_path, 'rb')
        return HttpResponse(FileWrapper(file),
                            content_type=content_type)

    @swagger_auto_schema(operation_description="Удалить файл объекта",
                         responses={404: 'Файл не обнаружен'})
    def destroy(self, request, pk):
        file_record = get_object_or_404(models.FileInfo, pk=pk)
        if file_record.is_deleted:
            return Response(
                {'error': f'Файл {file_record.filename} уже был удален!'},
                status=status.HTTP_404_NOT_FOUND
            )
        file_path = os.path.join(
            settings.MEDIA_ROOT,
            str(file_record.object.id),
            str(file_record.filename)
        )
        if not os.path.exists(file_path):
            file_record.is_deleted = True
            file_record.save()
            return Response(
                {'error': (f'Файл {file_record.filename} '
                           'не обнаружен в директории!')},
                status=status.HTTP_404_NOT_FOUND
            )
        try:
            os.remove(file_path)
            file_record.is_deleted = True
            file_record.save()
        except Exception as e:
            return Response(
                {'error': ('Не удалось удалить файл '
                           f'{file_record.filename} - {e}!')},
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response(status=status.HTTP_204_NO_CONTENT)
