# Generated by Django 5.1.3 on 2024-11-30 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0017_alter_pagamento_codigo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pagamento',
            name='nome',
        ),
        migrations.AlterField(
            model_name='pagamento',
            name='codigo',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]