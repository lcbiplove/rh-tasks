from django.db import models
from django.core.validators import FileExtensionValidator

class CsvFileInfer(models.Model):
    file = models.FileField(null=False, blank=False, upload_to='media/docs/',
            validators=[FileExtensionValidator(allowed_extensions=["csv"])])
    columns = models.JSONField(null=False, blank=False, default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.file.name