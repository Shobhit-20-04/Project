from django.db import models

class CallLog(models.Model):
    caller = models.CharField(max_length=100)
    receiver = models.CharField(max_length=100)
    duration = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Call from {self.caller} to {self.receiver} at {self.timestamp}"
