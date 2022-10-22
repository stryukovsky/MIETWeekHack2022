from django.db import models


class VoIPConfig(models.Model):
    sip_server_address = models.CharField(max_length=255)
    sip_server_port = models.PositiveBigIntegerField(default=5060)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    sip_client_address = models.CharField(max_length=255)
    sip_client_port = models.PositiveBigIntegerField(default=5060)
    internal_phone = models.CharField(max_length=255, null=True, blank=True)
