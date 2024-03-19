from django.urls import path
from .views import CsvTypeInferView, CsvColumnEdit

urlpatterns = [
    path('csv/', CsvTypeInferView.as_view(), name='csv_type_infer'),
    path('csv/<int:pk>/edit', CsvColumnEdit.as_view(), name='csv_type_infer'),
]
