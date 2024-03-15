from django.db import models
from django.core.validators import FileExtensionValidator

class CsvFileInfer(models.Model):
    title = models.CharField(max_length=255, unique=True)
    file = models.FileField(upload_to='media/docs/',
            validators=[FileExtensionValidator(allowed_extensions=["csv"])])
    columns = models.JSONField(blank=True, null=True,  default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.file.name