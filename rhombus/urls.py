from django.urls import path, include

urlpatterns = [
    path('api/type-infer/', include('data_type_infer.urls')),
]
