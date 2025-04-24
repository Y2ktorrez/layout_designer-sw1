# rooms/views.py
from rest_framework import generics, permissions
from .models import ProjectRoom
from .serializers import ProjectRoomSerializer


class ProjectRoomListCreateView(generics.ListCreateAPIView):
    """
    GET → lista las salas del usuario
    POST → crea una nueva sala
    """
    serializer_class   = ProjectRoomSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ProjectRoom.objects.filter(creator=self.request.user)

    def perform_create(self, serializer):
        project = serializer.save(creator=self.request.user)
        project.members.add(self.request.user)         # ① agrega creador a members


class ProjectRoomDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Permite editar nombre/descripcion; sólo el creador puede modificar.
    """
    serializer_class   = ProjectRoomSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ProjectRoom.objects.filter(creator=self.request.user)
