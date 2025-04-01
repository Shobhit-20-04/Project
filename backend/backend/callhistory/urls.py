from django.urls import path
from .views import get_call_history, add_call_history

urlpatterns = [
    path('', get_call_history),
    path('add/', add_call_history),
]
