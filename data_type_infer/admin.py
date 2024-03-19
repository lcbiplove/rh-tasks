from django.contrib import admin
from data_type_infer.models import CsvFileInfer

class CsvFileInferAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'file']

admin.site.register(CsvFileInfer, CsvFileInferAdmin)