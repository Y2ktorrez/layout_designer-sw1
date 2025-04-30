# rooms/middleware.py
from urllib.parse import parse_qs
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser   # ← CORRECTO
from channels.db import database_sync_to_async
import jwt
from django.conf import settings

User = get_user_model()


class TokenAuthMiddleware:          # funciona igual que AuthMiddlewareStack
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        query_string = scope["query_string"].decode()
        token = parse_qs(query_string).get("token", [None])[0]
        scope["user"] = await self.get_user(token)
        return await self.inner(scope, receive, send)

    # ---------- helpers ----------
    @database_sync_to_async
    def get_user(self, raw_token):
        if not raw_token:
            return AnonymousUser()
        try:
            payload = jwt.decode(raw_token, settings.SECRET_KEY, algorithms=["HS256"])
            return User.objects.get(id=payload["user_id"])
        except Exception:
            return AnonymousUser()
