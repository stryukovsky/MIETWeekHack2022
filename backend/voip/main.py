import subprocess
import time

from api.models import Trigger
from voip.models import VoIPConfig


def perform_call(config: VoIPConfig, trigger: Trigger, receiver_phone: str):
    call_params = [
        ".\\voip\\Caller.exe",
        str(config.username),
        str(config.password),
        str(config.sip_server_address),
        str(config.sip_server_port),
        str(trigger.message_file.path),
        str(receiver_phone),
    ]
    process = subprocess.Popen(call_params)
    print(call_params)
    time.sleep(40)
    process.kill()
