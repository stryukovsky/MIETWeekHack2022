from django.contrib import admin
from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import CallViewSet, TriggerViewSet, CallsPerYearView
#CallsPerMonthView

router = SimpleRouter()

router.register('calls', CallViewSet)
router.register('triggers', TriggerViewSet)

urlpatterns = router.urls
urlpatterns += [path('callsperyear', CallsPerYearView.as_view())]
#urlpatterns += [path('callspermonth', CallsPerMonthView.as_view())]
