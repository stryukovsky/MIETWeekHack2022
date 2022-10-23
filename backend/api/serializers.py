from rest_framework.serializers import ModelSerializer

from .models import Call, Trigger, LogEntry


class CallSerializer(ModelSerializer):
    class Meta:
        model = Call
        fields = '__all__'


class TriggerSerializer(ModelSerializer):
    class Meta:
        model = Trigger
        fields = '__all__'


class LogEntrySerializer(ModelSerializer):
    class Meta:
        model = LogEntry
        fields = '__all__'
