from django.urls import path
from .views import CreateProjectRoomView

urlpatterns = [
    path('create/', CreateProjectRoomView.as_view(), name='create-room'),
]
