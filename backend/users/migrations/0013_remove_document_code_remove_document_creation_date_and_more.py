# Generated by Django 5.1.3 on 2024-11-29 13:20

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_document'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='document',
            name='code',
        ),
        migrations.RemoveField(
            model_name='document',
            name='creation_date',
        ),
        migrations.AddField(
            model_name='document',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]