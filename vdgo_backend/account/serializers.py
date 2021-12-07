from rest_framework import serializers

from .models import Executor, User, Unit


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('id', 'username', 'executor', 'role')
        model = User
        depth = 2


class ExecutorSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Executor


class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name_short')
        model = Unit
