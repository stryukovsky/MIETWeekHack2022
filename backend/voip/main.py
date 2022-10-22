import os
import sys

import django
from pyVoIP.VoIP import VoIPPhone, InvalidStateError, CallState
import wave
import time

django_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(django_dir)
sys.path.append(django_dir)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from voip.models import VoIPConfig


def call_callback(call):
    try:
        f = wave.open('announcment.wav', 'rb')
        frames = f.getnframes()
        data = f.readframes(frames)
        f.close()

        call.answer()
        call.write_audio(data)  # This writes the audio data to the transmit buffer, this must be bytes.

        stop = time.time() + (
                frames / 8000)  # frames/8000 is the length of the audio in seconds. 8000 is the hertz of PCMU.

        while time.time() <= stop and call.state == CallState.ANSWERED:
            time.sleep(0.1)
        call.hangup()
    except InvalidStateError:
        pass
    except Exception:
        call.hangup()


def perform_voip(config: VoIPConfig):
    phone = VoIPPhone(config.sip_server_address, config.sip_server_port, config.username, config.password,
                      callCallback=call_callback)
    phone.start()


def main():
    if config := VoIPConfig.objects.first():
        perform_voip(config)
    else:
        print("No configs are provided for VoIP")


if __name__ == "__main__":
    main()
