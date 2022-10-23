import os
import sys

import django
from pyVoIP.VoIP import VoIPPhone, InvalidStateError, VoIPCall

django_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(django_dir)
sys.path.append(django_dir)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from voip.models import VoIPConfig


def call_callback(call: VoIPCall):
    try:
        call.answer()
        call.hangup()
    except InvalidStateError:
        pass
    except Exception:
        call.hangup()


def main():
    if config := VoIPConfig.objects.first():
        try:
            phone = VoIPPhone(config.sip_server_address, config.sip_server_port, config.username, config.password,
                              callCallback=call_callback)
            phone.start()
            print("Press ENTER to finish")
            phone.stop()
        except Exception as e:
            print(f"When user={config.username} password={config.password} error: {e}")
    else:
        print("No configs are provided for VoIP")


if __name__ == "__main__":
    main()
