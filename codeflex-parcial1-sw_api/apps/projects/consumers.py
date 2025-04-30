import uuid
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from django.contrib.auth.models import AnonymousUser
from asgiref.sync import sync_to_async
from .models import ProjectRoom, ChatMessage
from .serializers import ChatMessageSerializer

class ProjectRoomConsumer(AsyncJsonWebsocketConsumer):
    # ---------- lifecycle ----------
    async def connect(self):
        if self.scope["user"] is AnonymousUser():
            await self.close(code=4401)
            return

        try:
            invite_code = uuid.UUID(self.scope["url_route"]["kwargs"]["invitation_code"])
            self.room = await sync_to_async(ProjectRoom.objects.get)(invitation_code=invite_code)
        except (ValueError, ProjectRoom.DoesNotExist):
            await self.close(code=4404)
            return

        await sync_to_async(self.room.members.add)(self.scope["user"])
        self.group_name = f"room_{self.room.id}"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

        # Notificar presencia
        await self.channel_layer.group_send(
            self.group_name,
            {"type": "presence", "event": "join", "user": self.user_payload()},
        )

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
        await self.channel_layer.group_send(
            self.group_name,
            {"type": "presence", "event": "leave", "user": self.user_payload()},
        )

    # ---------- mensajes entrantes ----------
    async def receive_json(self, content, **_):
        msg_type = content.get("type")

        if msg_type == "update":
            # tu lógica de update...
            await self.channel_layer.group_send(
                self.group_name,
                {
                    "type": "forward_update",
                    "payload": content["payload"],
                    "user": self.user_payload(),
                },
            )

        elif msg_type == "presence":
            # tu lógica de presence...
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "presence", **content, "user": self.user_payload()},
            )

        elif msg_type == "chat_message":
            # 1) Guardar mensaje
            msg = await sync_to_async(ChatMessage.objects.create)(
                room=self.room,
                user=self.scope["user"],
                content=content.get("message", "")
            )
            # 2) Serializar y difundir
            data = ChatMessageSerializer(msg).data
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "chat_message", "message": data}
            )

    # ---------- mensajes salientes ----------
    async def forward_update(self, event):
        await self.send_json({"type": "update", **event})

    async def presence(self, event):
        await self.send_json({"type": "presence", **event})

    async def chat_message(self, event):
        await self.send_json({
            "type": "chat_message",
            **event["message"]
        })

    # ---------- helper ----------
    def user_payload(self):
        u = self.scope["user"]
        return {"id": str(u.id), "username": u.username}

