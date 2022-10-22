from django.contrib import admin
from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import CallViewSet, TriggerViewSet

router = SimpleRouter()

router.register('calls', CallViewSet)
router.register('triggers', TriggerViewSet)

urlpatterns = router.urls

