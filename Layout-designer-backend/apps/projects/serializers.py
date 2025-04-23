from rest_framework import serializers
from .models import ProjectRoom

class ProjectRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectRoom
        fields = ['id', 'name', 'description', 'creator']
