from django_filters import DateTimeFilter, FilterSet

from .models import Bypass


class BypassFilter(FilterSet):
    action_date = DateTimeFilter(field_name="date_action", lookup_expr='date')

    class Meta:
        model = Bypass
        fields = ['executor', 'action_date']
