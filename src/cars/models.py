import uuid

from django.db import models


# Create your models here.
class Car(models.Model):
    """Model representing a specific car."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    make = models.CharField("Manufacturer name", max_length=128)
    model = models.CharField("Model", max_length=128)
    year = models.CharField("Year of manufacturing", max_length=4)
