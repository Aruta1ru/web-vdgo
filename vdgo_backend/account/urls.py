from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView

from . import views

router = DefaultRouter()
router.register('users', views.UserViewSet, basename='users')
router.register('units', views.UnitViewSet, basename='units')
router.register('executors', views.ExecutorViewSet, basename='executors')

urlpatterns = [
    path('v1/token/',
         TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('v1/', include(router.urls)),
]
