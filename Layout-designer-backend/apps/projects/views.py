from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ProjectRoom
from .serializers import ProjectRoomSerializer

class CreateProjectRoomView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        data['creator'] = request.user.id
        serializer = ProjectRoomSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        project = serializer.save()

        return Response({
            "message": "Sala creada exitosamente",
            "room_id": str(project.id),
            "invitation_link": project.get_invitation_link(),
        })
