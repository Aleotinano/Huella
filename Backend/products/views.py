from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from .permissions import IsSuperUserOrReadOnly

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsSuperUserOrReadOnly]

