import subprocess

from api.models import Trigger
from voip.models import VoIPConfig


def perform_call(config: VoIPConfig, trigger: Trigger, receiver_phone: str):
    call_string = f".\Caller.exe {config.username} {config.password} {config.sip_server_address}" \
                  f" {config.sip_server_port} {trigger.message_file.path} {receiver_phone}"
    subprocess.call(call_string)
