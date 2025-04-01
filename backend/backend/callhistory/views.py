from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CallHistory
from .serializers import CallHistorySerializer

@api_view(['GET'])
def get_call_history(request):
    history = CallHistory.objects.all()
    serializer = CallHistorySerializer(history, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_call_history(request):
    serializer = CallHistorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Call history saved"}, status=201)
    return Response(serializer.errors, status=400)
