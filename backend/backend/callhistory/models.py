from django.db import models

class CallHistory(models.Model):
    caller = models.CharField(max_length=255)
    receiver = models.CharField(max_length=255)
    call_time = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.caller} → {self.receiver} at {self.call_time}"
