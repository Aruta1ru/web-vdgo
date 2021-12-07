from django_filters import rest_framework as filters

from .models import Unit, Executor


class UnitFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name_short', lookup_expr='icontains')

    class Meta:
        model = Unit
        fields = ['name_short']


class ExecutorFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Executor
        fields = ['name', 'unit']
