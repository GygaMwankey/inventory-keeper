from django.db import models


# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=20, unique=True)
    description = models.CharField(max_length=250)
    amount = models.IntegerField()

    def __str__(self):
        return self.name
