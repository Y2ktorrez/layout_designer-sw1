import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ProjectRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_code = self.scope['url_route']['kwargs']['invitation_code']
        self.room_group_name = f"room_{self.room_code}"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'broadcast_message',
                'message': text_data,
            }
        )

    async def broadcast_message(self, event):
        await self.send(text_data=event['message'])
