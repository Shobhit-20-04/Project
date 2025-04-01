from rest_framework import serializers
from .models import CallLog  # Ensure this import is correct

class CallLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallLog
        fields = '__all__'  # or specify required fields
