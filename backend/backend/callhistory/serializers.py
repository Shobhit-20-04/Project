from rest_framework import serializers
from .models import CallHistory

class CallHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CallHistory
        fields = '__all__'