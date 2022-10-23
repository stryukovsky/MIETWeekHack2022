from django.contrib import admin
from .models import Call, Trigger, LogEntry
from django.contrib.admin.decorators import register


@register(Call)
class CallAdmin(admin.ModelAdmin):
    list_display = ("sender_phone", "receiver_phone", "status", "time_started")
    list_filter = ("status",)


@register(Trigger)
class TriggerAdmin(admin.ModelAdmin):
    list_display = ("id", "event", "call", "message_file")
    list_filter = ("event",)


@register(LogEntry)
class LogEntryAdmin(admin.ModelAdmin):
    list_display = ("timestamp", "message", "severity")
    list_filter = ("severity",)
