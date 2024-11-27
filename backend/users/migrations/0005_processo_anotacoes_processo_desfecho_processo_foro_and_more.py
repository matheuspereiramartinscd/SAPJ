# Generated by Django 5.1.3 on 2024-11-27 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_processo'),
    ]

    operations = [
        migrations.AddField(
            model_name='processo',
            name='anotacoes',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='processo',
            name='desfecho',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='processo',
            name='foro',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='processo',
            name='honorarios',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='processo',
            name='porcentagem',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AddField(
            model_name='processo',
            name='resultadoRecurso',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='processo',
            name='tribunal',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='processo',
            name='ultimoEvento',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='processo',
            name='ultimosAndamentos',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='processo',
            name='valorCausa',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True),
        ),
        migrations.AddField(
            model_name='processo',
            name='vara',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
