from django.urls import include
from django.urls import path
from rest_framework import routers

from . import views


app_name = 'api'

router = routers.DefaultRouter()
router.register('cars', views.CarViewSet)


urlpatterns = [
    path('', include(router.urls), name='api'),
]
