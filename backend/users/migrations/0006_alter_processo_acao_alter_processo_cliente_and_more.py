# Generated by Django 5.1.3 on 2024-11-27 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_processo_anotacoes_processo_desfecho_processo_foro_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='processo',
            name='acao',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='processo',
            name='cliente',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='processo',
            name='codigo',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='processo',
            name='comarca',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='processo',
            name='foro',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='processo',
            name='honorarios',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='processo',
            name='numero',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='processo',
            name='porcentagem',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='processo',
            name='status',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='processo',
            name='tipo',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='processo',
            name='tribunal',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='processo',
            name='ultimoEvento',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='processo',
            name='valorCausa',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='processo',
            name='vara',
            field=models.TextField(blank=True, null=True),
        ),
    ]
