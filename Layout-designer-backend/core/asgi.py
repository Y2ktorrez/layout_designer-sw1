# core/asgi.py
import os
import django                         # ← importa django primero

# 1) Configura el módulo de settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

# 2) Inicializa Django
django.setup()

# 3) Ahora sí puedes importar el resto
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from apps.projects.routing import websocket_urlpatterns
from apps.projects.middleware import TokenAuthMiddleware

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),          # peticiones HTTP

        # WebSocket autenticado por token
        "websocket": TokenAuthMiddleware(
            URLRouter(websocket_urlpatterns)
        ),
    }
)
