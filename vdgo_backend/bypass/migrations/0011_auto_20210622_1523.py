# Generated by Django 3.0.10 on 2021-06-22 12:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bypass', '0010_auto_20210622_1509'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='vdgoobject',
            options={'ordering': ['address'], 'verbose_name': 'Объект ВДГО', 'verbose_name_plural': 'Объекты ВДГО'},
        ),
    ]