from django.urls import path
from .views import CsvTypeInferView

urlpatterns = [
    path('csv/', CsvTypeInferView.as_view(), name='csv_type_infer'),
]
