# Generated by Django 3.0 on 2021-06-17 12:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bypass', '0005_bypassbuffer'),
    ]

    operations = [
        migrations.CreateModel(
            name='EquipmentInfo',
            fields=[
                ('id', models.IntegerField(db_column='id_param', primary_key=True, serialize=False, verbose_name='ID')),
                ('eyeliner_type', models.BooleanField(db_column='podvod', verbose_name='Вид подводки')),
                ('model', models.CharField(db_column='model', max_length=64, verbose_name='Модель оборудования')),
                ('factory_num', models.CharField(db_column='z_num', max_length=32, verbose_name='Заводской №')),
                ('burners_num', models.SmallIntegerField(db_column='k_count', verbose_name='Количество конфорок')),
                ('power', models.FloatField(db_column='Pwr', verbose_name='Мощность')),
                ('lifetime', models.SmallIntegerField(db_column='Expl', verbose_name='Срок эксплуатации')),
                ('extra_info', models.TextField(db_column='dopinf', verbose_name='Дополнительная информация')),
            ],
            options={
                'verbose_name': 'Информация об оборудовании',
                'verbose_name_plural': 'Информация об оборудовании',
                'db_table': 'vdg_param',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='EquipmentType',
            fields=[
                ('id', models.IntegerField(db_column='id_ob', primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_column='name_ob', max_length=128, verbose_name='Название')),
            ],
            options={
                'verbose_name': 'Тип оборудования',
                'verbose_name_plural': 'Типы оборудования',
                'db_table': 'to_ch_ob',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Manufacturer',
            fields=[
                ('id', models.SmallIntegerField(db_column='id_izg', primary_key=True, serialize=False, verbose_name='ID изготовителя')),
                ('name', models.CharField(db_column='name_izg', max_length=64, verbose_name='Название')),
            ],
            options={
                'verbose_name': 'Изготовитель',
                'verbose_name_plural': 'Изготовители',
                'db_table': 'vdg_izg',
                'ordering': ['name'],
                'managed': False,
            },
        ),
        migrations.AlterModelOptions(
            name='equipment',
            options={'managed': False, 'ordering': ['object', 'type'], 'verbose_name': 'Оборудование', 'verbose_name_plural': 'Оборудования'},
        ),
        migrations.AlterModelTable(
            name='equipment',
            table='to_ch_story',
        ),
        migrations.CreateModel(
            name='EquipmentModel',
            fields=[
                ('id', models.IntegerField(db_column='id_model', primary_key=True, serialize=False, verbose_name='ID модели')),
                ('name', models.CharField(db_column='name_model', max_length=64, verbose_name='Название')),
                ('manufacturer', models.ForeignKey(db_column='id_izg', on_delete=django.db.models.deletion.PROTECT, to='bypass.Manufacturer', verbose_name='Изготовитель')),
                ('type', models.ForeignKey(db_column='id_ob', on_delete=django.db.models.deletion.PROTECT, to='bypass.EquipmentType', verbose_name='Тип оборудования')),
            ],
        ),
    ]