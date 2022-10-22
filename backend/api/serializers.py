from rest_framework.serializers import ModelSerializer

from .models import Call, Trigger


class CallSerializer(ModelSerializer):
    class Meta:
        model = Call
        fields = '__all__'


class TriggerSerializer(ModelSerializer):
    class Meta:
        model = Trigger
        fields = '__all__'