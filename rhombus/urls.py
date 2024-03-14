from django.urls import path, include
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/type-infer/', include('data_type_infer.urls')),
]
