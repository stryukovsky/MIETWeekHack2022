import datetime
import math
from datetime import timedelta
import time
import wave

from pyVoIP.VoIP import VoIPPhone, VoIPCall, CallState
from rest_framework.decorators import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from voip.models import VoIPConfig
from .models import Call, Trigger, russian_months, CallStatus, days_in_month, LogEntry, month_quarter_starts
from .serializers import CallSerializer, TriggerSerializer, LogEntrySerializer


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


class CallsPerWeekView(APIView):
    def get(self, request: Request) -> Response:
        now = datetime.datetime.utcnow()
        start_from = now - timedelta(days=7)
        all_calls = Call.objects.filter(time_started__gt=start_from)
        result = []
        for day_iterator in range(1, 8):
            current_day = start_from + timedelta(days=day_iterator)
            successful_count = all_calls.filter(status=CallStatus.SUCCESSFUL,
                                                time_started__day=current_day.day).count()
            failed_count = all_calls.filter(status=CallStatus.FAILED,
                                            time_started__day=current_day.day).count()
            result.append({
                'date': f"{russian_months[current_day.month - 1]} {current_day.day} ",
                'successful': successful_count,
                'failed': failed_count
            })
        return Response(result)


class CallsPerQuarterView(APIView):
    def get(self, request: Request) -> Response:
        start_from = now = datetime.datetime.utcnow()
        current_quarter = math.ceil(now.month / 3)
        start_from = start_from.replace(month=month_quarter_starts[current_quarter - 1], day=1, hour=0, minute=0,
                                        second=0)
        weeks_count = 12
        all_calls = Call.objects.filter(time_started__gt=start_from)
        result = []
        for week_iterator in range(weeks_count):
            week_starts = start_from + timedelta(weeks=week_iterator)
            week_ends = start_from + timedelta(weeks=week_iterator + 1)
            successful_count = all_calls.filter(status=CallStatus.SUCCESSFUL,
                                                time_started__gte=week_starts,
                                                time_started__lte=week_ends
                                                ).count()
            failed_count = all_calls.filter(status=CallStatus.FAILED,
                                            time_started__gte=week_starts,
                                            time_started__lte=week_ends
                                            ).count()
            result.append({
                'weekStart': f"{russian_months[week_starts.month - 1]} {week_starts.day} ",
                'weekEnd': f"{russian_months[week_ends.month - 1]} {week_ends.day}",
                'successful': successful_count,
                'failed': failed_count
            })
        return Response(result)


class TriggerViewSet(ModelViewSet):
    queryset = Trigger.objects.all()
    serializer_class = TriggerSerializer


class LogEntryViewSet(ModelViewSet):
    queryset = LogEntry.objects.all()
    serializer_class = LogEntrySerializer


class PerformCallView(APIView):

    def get(self, request: Request) -> Response:
        receiver_phone = request.query_params.get("to")
        trigger_id = request.query_params.get("trigger")
        try:
            trigger = Trigger.objects.get(id=trigger_id)
            config = VoIPConfig.objects.first()
        except Exception as e:
            return Response({"message": f"In database some data missing {e}"})
        phone = VoIPPhone(config.sip_server_address, config.sip_server_port, config.username, config.password,
                          callCallback=None)
        try:
            phone.start()
            call = phone.call(receiver_phone)
            call_in_database = Call.objects.create(**{
                "sender_phone": config.internal_phone,
                "receiver_phone": receiver_phone,
                "trigger": None,
                "status": CallStatus.NOT_STARTED
            })
            self.play_audio_in_call(trigger.message_file.path, call)
            call_in_database.status = CallStatus.SUCCESSFUL
            phone.stop()
            return Response({"message": "success"})
        except Exception as e:
            phone.stop()
            raise Exception(e)

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
