import os
import sys

import django

django_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(django_dir)
sys.path.append(django_dir)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from voip.models import VoIPConfig
from api.models import LogEntry, LogSeverityChoices, Trigger


def perform_call(config: VoIPConfig, trigger: Trigger, receiver_phone: str):
    raise ValueError("Not implemented")
