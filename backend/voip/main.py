import os
import sys

import django
from pyVoIP.VoIP import VoIPPhone, InvalidStateError, CallState, VoIPCall
import wave
import time

django_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(django_dir)
sys.path.append(django_dir)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
from django.conf import settings

from voip.models import VoIPConfig
from api.models import Call, Trigger, CallStatus


def play_audio_in_call(filename: str, call: VoIPCall):
    with wave.open(filename, 'rb') as file:
        frames_count = file.getnframes()
        data = file.readframes(frames_count)
        framerate = file.getframerate()
    audio_duration = frames_count / framerate
    call.answer()
    call.write_audio(data)

    time_to_stop = time.time() + audio_duration
    while time.time() <= time_to_stop and call.state == CallState.ANSWERED:
        time.sleep(0.1)
    call.hangup()


def call_callback(call: VoIPCall):
    try:
        play_audio_in_call(settings.IDLE_FILE, call)
    except InvalidStateError:
        pass
    except Exception:
        call.hangup()


def call_invoke(phone: VoIPPhone, sender_phone: str, receiver_phone: str, trigger: Trigger):
    call = Call.objects.create(**{
        "sender_phone": sender_phone,
        "receiver_phone": receiver_phone,
        "trigger": trigger,
        "status": CallStatus.NOT_STARTED
    })
    try:
        call = phone.call(receiver_phone)
        play_audio_in_call(trigger.message_file.path, call)
        call.status = CallStatus.SUCCESSFUL
    except Exception as e:
        call.status = CallStatus.FAILED
    call.save()


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
