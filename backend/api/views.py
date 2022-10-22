import datetime

from django.db.models import Count
from django.db.models.functions import TruncMonth
from rest_framework.decorators import APIView
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Call, Trigger, russian_months, CallStatus
from .serializers import CallSerializer, TriggerSerializer


class CallViewSet(ModelViewSet):
    queryset = Call.objects.all()
    serializer_class = CallSerializer


class CallsPerYearView(APIView):
    def get(self, request):
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


# class CallsPerMonthView(APIView):
#     def get(self, request):
#         now = datetime.datetime.utcnow()
#         all_calls = Call.objects.filter(time_started__month=now.month)
#         result = []
#         for day_iterator in range(12):
#             month_name = russian_months[months_iterator]
#             successful_count = all_calls.filter(status=CallStatus.SUCCESSFUL,
#                                                 time_started__month=months_iterator + 1).count()
#             failed_count = all_calls.filter(status=CallStatus.FAILED, time_started__month=months_iterator + 1).count()
#             result.append({'month': month_name, 'successful': successful_count, 'failed': failed_count})
#         return Response(result)


class TriggerViewSet(ModelViewSet):
    queryset = Trigger.objects.all()
    serializer_class = TriggerSerializer
