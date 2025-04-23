import uuid
from django.db import models
from django.conf import settings
from django.utils import timezone

class ProjectRoom(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="created_rooms"
    )

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    invitation_code = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    def get_invitation_link(self):
        return f"https://codeflex.ai/join/{self.invitation_code}"

    def __str__(self):
        return self.name
