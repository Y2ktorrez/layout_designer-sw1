# rooms/serializers.py
from rest_framework import serializers
from .models import ProjectRoom, ChatMessage


class ProjectRoomSerializer(serializers.ModelSerializer):
    invitation_code = serializers.ReadOnlyField()
    invitation_link = serializers.SerializerMethodField()

    class Meta:
        model  = ProjectRoom
        fields = [
            "id",
            "name",
            "description",
            "creator",
            "invitation_code",
            "invitation_link",
        ]
        read_only_fields = ("creator",)

    # ---------- helpers ----------
    def get_invitation_link(self, obj):
        return obj.get_invitation_link()

class ChatMessageSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = ChatMessage
        fields = ['id', 'user', 'content', 'timestamp']