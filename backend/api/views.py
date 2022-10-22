from rest_framework.decorators import APIView
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Call, Trigger
from .serializers import CallSerializer, TriggerSerializer


class CallViewSet(ModelViewSet):
    queryset = Call.objects.all()
    serializer_class = CallSerializer


class TriggerViewSet(ModelViewSet):
    queryset = Trigger.objects.all()
    serializer_class = TriggerSerializer
