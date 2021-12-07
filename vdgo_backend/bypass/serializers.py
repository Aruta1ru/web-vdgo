from rest_framework import serializers

from . import models


class BypassSerializer(serializers.ModelSerializer):
    dog_type = serializers.ChoiceField(choices=models.VdgoDogType)
    exec_status = serializers.ChoiceField(choices=models.ExecStatus)
    date_action = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        fields = '__all__'
        model = models.Bypass
        depth = 1


class VdgoObjectSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = models.VdgoObject


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        exclude = ('object',)
        model = models.Client


class ObjectBypassSerializer(BypassSerializer):
    class Meta:
        exclude = ('object',)
        model = models.Bypass
        depth = 1


class VdgoObjectCommonSerializer(serializers.ModelSerializer):
    clients = ClientSerializer(many=True, read_only=True)
    bypasses = ObjectBypassSerializer(many=True, read_only=True)

    class Meta:
        fields = '__all__'
        model = models.VdgoObject


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Manufacturer
        fields = '__all__'


class EquipmentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EquipmentModel
        fields = '__all__'


class EquipmentInfoPrevSerializer(serializers.ModelSerializer):
    class Meta:
        exclude = ('equipment',)
        model = models.EquipmentInfoPrev


class EquipmentInfoSerializer(serializers.ModelSerializer):
    class Meta:
        exclude = ('equipment',)
        model = models.EquipmentInfo
        depth = 1


class EquipmentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = models.EquipmentType


class EquipmentSerializer(serializers.ModelSerializer):
    info = EquipmentInfoSerializer(many=True)
    previous = EquipmentInfoPrevSerializer(many=True)

    class Meta:
        exclude = ('object',)
        model = models.Equipment
        depth = 1


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id', 'filename', 'file_category', 'file_size',
            'bypass', 'bypass_date', 'object'
        )
        model = models.FileInfo


class ITDLoadSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id', 'filename', 'file_category', 'file_size', 'object'
        )
        model = models.FileInfo


class BypassBufferSerializer(serializers.ModelSerializer):
    class Meta:
        exclude = ('id',)
        model = models.BypassBuffer


class EquipmentInfoBufferSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = models.EquipmentInfoBuffer


class UndoneReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UndoneReason
        fields = '__all__'
