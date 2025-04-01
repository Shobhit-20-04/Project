from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CallLog
from .serializers import CallLogSerializer

@api_view(['GET'])
def get_call_logs(request):
    logs = CallLog.objects.all()
    serializer = CallLogSerializer(logs, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_call_log(request):
    serializer = CallLogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Call log saved"}, status=201)
    return Response(serializer.errors, status=400)
