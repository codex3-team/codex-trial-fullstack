from rest_framework import serializers

from cars.models import Car


class CarSerializer(serializers.ModelSerializer):
    """Car model serializer."""

    class Meta:
        model = Car
        fields = (
            'id', 'make', 'model', 'year',
        )
