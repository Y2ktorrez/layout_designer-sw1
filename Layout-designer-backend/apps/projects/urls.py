# rooms/urls.py
from django.urls import path
from .views import ProjectRoomListCreateView, ProjectRoomDetailView

urlpatterns = [
    path("create/", ProjectRoomListCreateView.as_view(), name="rooms"),          # GET, POST
    path("rooms/<uuid:pk>/", ProjectRoomDetailView.as_view(), name="room-detail"),  # GET, PATCH, DELETE
]
