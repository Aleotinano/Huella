from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = router.urls 
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)