from enum import Enum

from django.db import models


class TriggerEvent(models.TextChoices):
    EXECUTE = 'Execute'
    TIMER = 'Timer'
    WEB_HOOK = 'Web-Hook'


class CallStatus(models.TextChoices):
    NOT_STARTED = 'Not Started'
    SUCCESSFUL = 'Successful'
    FAILED = 'Failed'


russian_months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
                  'Ноябрь', 'Декабрь']

days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

class Call(models.Model):
    sender_phone = models.CharField(max_length=255)
    receiver_phone = models.CharField(max_length=255)
    time_started = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=255, choices=CallStatus.choices, default=CallStatus.NOT_STARTED)
    message = models.TextField(null=True, blank=True)


class Trigger(models.Model):
    event = models.CharField(max_length=255, choices=TriggerEvent.choices, default=TriggerEvent.EXECUTE)
    call = models.OneToOneField(Call, on_delete=models.CASCADE, null=True)
    #Dima-dzan tut dodelat nado
    #message_file = models.FileField()


