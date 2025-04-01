from django.urls import path
from .views import get_call_logs, add_call_log

urlpatterns = [
    path('', get_call_logs),
    path('add/', add_call_log),
]
