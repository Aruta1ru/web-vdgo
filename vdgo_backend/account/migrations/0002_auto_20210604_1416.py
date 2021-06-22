# Generated by Django 3.0 on 2021-06-04 11:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Executor',
            fields=[
                ('id', models.IntegerField(db_column='id_bso_user', primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_column='fio', max_length=128, verbose_name='ФИО исполнителя')),
                ('post', models.CharField(db_column='dolgn', max_length=128, verbose_name='Должность')),
                ('is_valid', models.BooleanField(db_column='valid', default=True, verbose_name='Актуальная запись?')),
            ],
            options={
                'verbose_name': 'Исполнитель',
                'verbose_name_plural': 'Исполнители',
                'db_table': 'web_vdgo_executor',
                'ordering': ['is_valid', 'name', 'unit'],
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Unit',
            fields=[
                ('id', models.IntegerField(db_column='id_unit', primary_key=True, serialize=False, verbose_name='ID')),
                ('name_full', models.CharField(db_column='im_full', max_length=128, verbose_name='Полное наименование')),
                ('name_short', models.CharField(db_column='im', max_length=64, verbose_name='Краткое наименование')),
            ],
            options={
                'verbose_name': 'Подразделение',
                'verbose_name_plural': 'Подразделения',
                'db_table': 'web_vdgo_unit',
                'ordering': ['name_full'],
                'managed': False,
            },
        ),
        migrations.AlterModelOptions(
            name='user',
            options={'ordering': ['role', 'username']},
        ),
        migrations.AlterModelManagers(
            name='user',
            managers=[
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='branch',
            field=models.SmallIntegerField(choices=[(0, 'Не указан'), (1, 'Филиал №1 в г.Дзержинск'), (2, 'Филиал №2 в г.Арзамас'), (3, 'Филиал №3 в г.Богородск'), (4, 'Филиал №4 в г.Бор'), (5, 'Филиал №5 в г.Павлово'), (6, 'Филиал №6 в г.Сергач'), (7, 'Нижний Новгород')], db_column='branch', default=0, verbose_name='Филиал/НН'),
        ),
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('admin', 'Administrator'), ('boss', 'Boss'), ('user', 'User')], default='user', max_length=9, verbose_name='Роль'),
        ),
        migrations.AddField(
            model_name='user',
            name='executor',
            field=models.ForeignKey(db_column='id_exec', default=0, on_delete=django.db.models.deletion.PROTECT, to='account.Executor', verbose_name='Исполнитель'),
        ),
    ]