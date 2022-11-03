import io
import os
import subprocess
import time

from api.models import Trigger
from voip.models import VoIPConfig


def perform_call(config: VoIPConfig, trigger: Trigger, receiver_phone: str):
    call_params = [
        "dotnet",
        "Caller.dll",
        str(config.username),
        str(config.password),
        str(config.sip_server_address),
        str(config.sip_server_port),
        str(trigger.message_file.path),
        str(receiver_phone),
    ]
    process = subprocess.Popen(call_params, cwd="voip", stdout=subprocess.PIPE)
    print(call_params)

    time.sleep(40)

    result = ""
    for line in io.TextIOWrapper(process.stdout, encoding="utf-8"):
        result += line
        print(line)

    if "InCall" not in result and "Completed" not in result:
        raise Exception('Unsuccessful call')

    process.kill()
