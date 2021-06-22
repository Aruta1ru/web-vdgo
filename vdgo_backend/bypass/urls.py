from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('bypasses', views.BypassViewSet, basename='bypasses')
router.register('service/manufacturers',
                views.ManufacturerViewSet,
                basename='manufacturers')
router.register('service/equipment-models',
                views.EquipmentModelViewSet,
                basename='equipment_models')
router.register('service/undone-reasons',
                views.UndoneReasonViewSet,
                basename='undone_reasons')
router.register('vdg_objects', views.VdgoObjectViewSet, basename='vdg_objects')
router.register(
    r'vdg_objects/(?P<id>\d+)/clients',
    views.ClientViewSet,
    basename='clients'
)
router.register(
    r'vdg_objects/(?P<id>\d+)/bypasses',
    views.ObjectBypassViewSet,
    basename='obj_bypasses'
)
router.register(
    r'vdg_objects/(?P<id>\d+)/equipment',
    views.EquipmentViewSet,
    basename='equipment'
)
router.register(
    r'equipment/(?P<id>\d+)/info',
    views.EquipmentInfoViewSet,
    basename='equipment_info'
)
router.register(
    r'vdg_objects/(?P<id>\d+)/files',
    views.FileViewSet,
    basename='files'
)

urlpatterns = [
    path('v1/', include(router.urls)),
    path('v1/bypasses/<int:id>/load_data',
         views.load_data,
         name='load_data'),
    path('v1/delete_file/',
         views.delete_file,
         name='delete_file'),
    path('v1/equipment/<int:id>/prev',
         views.equipment_prev,
         name='equipment_prev'),
    path('v1/equipment/<int:id>/load_info',
         views.load_info,
         name='load_info')
]
