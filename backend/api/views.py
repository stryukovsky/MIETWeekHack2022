import datetime
import time
import wave

from pyVoIP.VoIP import VoIPPhone, VoIPCall, CallState
from rest_framework.decorators import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from voip.models import VoIPConfig
from .models import Call, Trigger, russian_months, CallStatus, days_in_month
from .serializers import CallSerializer, TriggerSerializer


class CallViewSet(ModelViewSet):
    queryset = Call.objects.all()
    serializer_class = CallSerializer


class CallsPerYearView(APIView):
    def get(self, request: Request) -> Response:
        now = datetime.datetime.utcnow()
        all_calls = Call.objects.filter(time_started__year=now.year)
        result = []
        for months_iterator in range(12):
            month_name = russian_months[months_iterator]
            successful_count = all_calls.filter(status=CallStatus.SUCCESSFUL,
                                                time_started__month=months_iterator + 1).count()
            failed_count = all_calls.filter(status=CallStatus.FAILED, time_started__month=months_iterator + 1).count()
            result.append({'month': month_name, 'successful': successful_count, 'failed': failed_count})
        return Response(result)


class CallsPerMonthView(APIView):
    def get(self, request: Request) -> Response:
        now = datetime.datetime.utcnow()
        all_calls = Call.objects.filter(time_started__month=now.month)
        result = []
        for day_iterator in range(days_in_month[now.month - 1]):
            successful_count = all_calls.filter(status=CallStatus.SUCCESSFUL,
                                                time_started__day=day_iterator + 1).count()
            failed_count = all_calls.filter(status=CallStatus.FAILED, time_started__day=day_iterator + 1).count()
            result.append({'day': day_iterator + 1, 'successful': successful_count, 'failed': failed_count})
        return Response(result)


class TriggerViewSet(ModelViewSet):
    queryset = Trigger.objects.all()
    serializer_class = TriggerSerializer


class PerformCallView(APIView):

    def get(self, request: Request) -> Response:
        if config := VoIPConfig.objects.first():
            try:
                phone = VoIPPhone(config.sip_server_address, config.sip_server_port, config.username, config.password,
                                  callCallback=None)
                phone.start()
                print("Press ENTER to finish")
                phone.stop()
                receiver_phone = request.query_params.get("to")
                trigger_id = request.query_params.get("trigger")
                trigger = Trigger.objects.get(id=trigger_id)
                call = Call.objects.create(**{
                    "sender_phone": config,
                    "receiver_phone": receiver_phone,
                    "trigger": None,
                    "status": CallStatus.NOT_STARTED
                })
            except Exception as e:
                return Response({"message": f"When user={config.username} password={config.password} error: {e}"})
        else:
            return Response({"message": "No configs are provided for VoIP"})

        try:
            call = phone.call(receiver_phone)
            self.play_audio_in_call(trigger.message_file.path, call)
            call.status = CallStatus.SUCCESSFUL
            print({"message": "Call Succeeded"})
        except Exception as e:
            print({"message": f"Call error {e}"})
            call.status = CallStatus.FAILED
        call.save()
        return Response(f"Call has finalized with status {call.status}")

    def play_audio_in_call(self, filename: str, call: VoIPCall):
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
