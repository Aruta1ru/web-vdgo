# Generated by Django 3.0 on 2021-06-04 12:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_auto_20210604_1416'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='executor',
            options={'managed': False, 'ordering': ['name', 'unit'], 'verbose_name': 'Исполнитель', 'verbose_name_plural': 'Исполнители'},
        ),
    ]
