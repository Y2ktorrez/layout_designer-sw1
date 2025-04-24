# rooms/routing.py
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/room/(?P<invitation_code>[0-9a-f-]+)/$", consumers.ProjectRoomConsumer.as_asgi()),
]
