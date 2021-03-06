from django_filters import rest_framework as filters

from .models import Bypass, FileInfo, Manufacturer, EquipmentModel


class BypassFilter(filters.FilterSet):
    action_date = filters.DateTimeFilter(
        field_name="date_action", lookup_expr='date'
    )

    class Meta:
        model = Bypass
        fields = ['executor', 'action_date']


class ManufacturerFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Manufacturer
        fields = ['name']


class EquipmentModelFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = EquipmentModel
        fields = ['name', 'type', 'manufacturer']


class FilesFilter(filters.FilterSet):
    class Meta:
        model = FileInfo
        fields = ['file_category']
