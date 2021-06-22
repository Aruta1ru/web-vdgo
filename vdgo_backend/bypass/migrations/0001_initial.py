# Generated by Django 3.0 on 2021-06-04 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bypass',
            fields=[
                ('id', models.IntegerField(db_column='id', primary_key=True, serialize=False, verbose_name='ID ВДГО')),
                ('dog_type', models.SmallIntegerField(choices=[(0, 'отсутствует'), (1, 'частное лицо'), (2, 'юридическое лицо'), (3, 'СБК')], db_column='type_dog', verbose_name='Тип договора')),
                ('exec_status', models.SmallIntegerField(choices=[(0, 'в работе'), (1, 'выполнено'), (2, 'не выполнено')], db_column='web_exec', verbose_name='Статус выполнения')),
                ('date_action', models.DateTimeField(db_column='date_action', verbose_name='Дата назначения')),
                ('is_fixed', models.BooleanField(db_column='fixed', default=False, verbose_name='Проведено?')),
            ],
            options={
                'verbose_name': 'ВДГО',
                'verbose_name_plural': 'ВДГО',
                'db_table': 'web_vdgo_bypass',
                'ordering': ['-date_action', 'object'],
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.IntegerField(db_column='id_client', primary_key=True, serialize=False, verbose_name='ID клиента')),
                ('name', models.CharField(db_column='FIO', max_length=128, verbose_name='ФИО клиента')),
                ('phone', models.CharField(db_column='telefon', max_length=32, verbose_name='Номер телефона')),
            ],
            options={
                'verbose_name': 'Клиент',
                'verbose_name_plural': 'Клиенты',
                'db_table': 'web_vdgo_client',
                'ordering': ['name'],
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Equipment',
            fields=[
                ('id', models.IntegerField(db_column='id_st', primary_key=True, serialize=False, verbose_name='ID оборудования')),
                ('name', models.CharField(db_column='name_ob', max_length=128, verbose_name='Наименование оборудования')),
                ('quantity', models.DecimalField(db_column='kol_oborud', decimal_places=5, max_digits=10, verbose_name='Количество')),
                ('part', models.DecimalField(db_column='dol_ob', decimal_places=2, max_digits=3, verbose_name='Доля')),
                ('date_install', models.DateTimeField(db_column='du', verbose_name='Дата установки')),
                ('date_shutdown', models.DateTimeField(db_column='do', verbose_name='Дата отключения')),
            ],
            options={
                'verbose_name': 'Оборудование',
                'verbose_name_plural': 'Оборудования',
                'db_table': 'web_vdgo_ob',
                'ordering': ['object', 'name'],
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='FileInfo',
            fields=[
                ('id', models.IntegerField(db_column='id', primary_key=True, serialize=False, verbose_name='ID файла')),
                ('filename', models.CharField(db_column='name', max_length=32, verbose_name='Название файла')),
                ('is_deleted', models.BooleanField(db_column='deleted', default=False, verbose_name='Файл удален?')),
                ('date_add', models.DateTimeField(auto_now_add=True, db_column='date_add')),
            ],
            options={
                'verbose_name': 'Файл объекта',
                'verbose_name_plural': 'Файлы объекта',
                'db_table': 'web_vdgo_files',
                'ordering': ['is_deleted', 'filename'],
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UndoneReason',
            fields=[
                ('id', models.IntegerField(db_column='id', primary_key=True, serialize=False, verbose_name='ID причины')),
                ('name_full', models.CharField(db_column='full_name', max_length=64, verbose_name='Полное название')),
                ('name_short', models.CharField(db_column='short_name', max_length=32, verbose_name='Краткое название')),
            ],
            options={
                'verbose_name': 'Причина невыполнения',
                'verbose_name_plural': 'Причины невыполнения',
                'db_table': 'web_vdgo_undone_sp',
                'ordering': ['id'],
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='VdgoObject',
            fields=[
                ('id', models.IntegerField(db_column='id_obj', primary_key=True, serialize=False, verbose_name='ID объекта')),
                ('address', models.CharField(db_column='addr', max_length=512, verbose_name='Адрес объекта')),
            ],
            options={
                'verbose_name': 'Объект ВДГО',
                'verbose_name_plural': 'Объекты ВДГО',
                'db_table': 'to_ch_addr_home',
                'ordering': ['address'],
                'managed': False,
            },
        ),
    ]
