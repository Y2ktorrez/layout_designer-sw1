# rooms/models.py
import uuid
from django.db import models
from django.conf import settings
from django.utils import timezone


class ProjectRoom(models.Model):
    id              = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    name            = models.CharField(max_length=200)
    description     = models.TextField(blank=True)

    creator         = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="created_rooms",
    )
    members         = models.ManyToManyField(          # ① NUEVO
        settings.AUTH_USER_MODEL,
        related_name="rooms",
        blank=True,
    )

    created_at      = models.DateTimeField(default=timezone.now)
    updated_at      = models.DateTimeField(auto_now=True)

    invitation_code = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    class Meta:
        unique_together = ("name", "creator")          # ② Opcional pero útil

    # helper
    def get_invitation_link(self) -> str:
        return f"https://codeflex.ai/join/{self.invitation_code}"

    def __str__(self):
        return self.name


class ChatMessage(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    room = models.ForeignKey(
        ProjectRoom,
        related_name='messages',
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    content = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"[{self.timestamp:%Y-%m-%d %H:%M}] {self.user.username}: {self.content}"