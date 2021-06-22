from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('username', 'executor', 'branch', 'role')
        model = User
        depth = 2
