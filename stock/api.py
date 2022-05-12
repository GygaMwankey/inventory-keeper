from stock.models import Item
from rest_framework import viewsets
from .serializers import ItemSerializer


# Lead ViewSet
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
