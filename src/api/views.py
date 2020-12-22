from django.shortcuts import render
from rest_framework import mixins
from rest_framework import viewsets

from cars.models import Car

from .serializers import CarSerializer


# Create your views here.
class CarViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    """Car viewset description."""

    queryset = Car.objects.all()
    serializer_class = CarSerializer
