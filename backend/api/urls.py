from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import *

router = SimpleRouter()

router.register('calls', CallViewSet)
router.register('triggers', TriggerViewSet)
router.register('logs', LogEntryViewSet)

urlpatterns = router.urls
urlpatterns += [path('callsperyear', CallsPerYearView.as_view())]
urlpatterns += [path('callsperquarter', CallsPerQuarterView.as_view())]
urlpatterns += [path('callspermonth', CallsPerMonthView.as_view())]
urlpatterns += [path('callsperweek', CallsPerWeekView.as_view())]
urlpatterns += [path('callsperday', CallsPerMonthView.as_view())]
urlpatterns += [path('performCall', PerformCallView.as_view())]
