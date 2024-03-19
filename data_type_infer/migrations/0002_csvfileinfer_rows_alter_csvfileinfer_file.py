# Generated by Django 5.0.3 on 2024-03-19 08:47

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_type_infer', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='csvfileinfer',
            name='rows',
            field=models.JSONField(blank=True, default=dict, null=True),
        ),
        migrations.AlterField(
            model_name='csvfileinfer',
            name='file',
            field=models.FileField(upload_to='media/docs/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['csv', 'xlsx', 'xls'])]),
        ),
    ]
