from django.contrib import admin
from django.contrib.admin.decorators import register
from .models import VoIPConfig


@register(VoIPConfig)
class VoIPConfigAdmin(admin.ModelAdmin):
    list_display = ("sip_server_address", "username", "password")
