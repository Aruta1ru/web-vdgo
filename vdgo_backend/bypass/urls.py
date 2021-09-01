from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('bypasses', views.BypassViewSet, basename='bypasses')
router.register('manufacturers',
                views.ManufacturerViewSet,
                basename='manufacturers')
router.register('equipment-models',
                views.EquipmentModelViewSet,
                basename='equipment_models')
router.register('undone-reasons',
                views.UndoneReasonViewSet,
                basename='undone_reasons')
router.register('vdg_objects', views.VdgoObjectViewSet, basename='vdg_objects')
router.register('equipment', views.EquipmentViewSet, basename='equipment')
router.register('files', views.FileViewSet, basename='files')


urlpatterns = [
    path('v1/', include(router.urls)),
]
