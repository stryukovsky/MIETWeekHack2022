import subprocess

from api.models import Trigger
from voip.models import VoIPConfig


def perform_call(config: VoIPConfig, trigger: Trigger, receiver_phone: str):
    call_params = [
        ".\\voip\\Caller.exe",
        config.username,
        config.password,
        config.sip_server_address,
        config.sip_server_port,
        trigger.message_file.path,
        receiver_phone,
    ]
    process = subprocess.Popen(call_params)
    print(call_params)
    process.kill()
