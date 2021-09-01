from django.db import models
from django.utils.translation import gettext_lazy as _


class VdgoDogType(models.IntegerChoices):
    NONE = 0, _('отсутствует')
    INDIVIDUAL = 1, _('частное лицо')
    LEGALLAWYER = 2, _('юридическое лицо')
    SBK = 3, _('СБК')


class ExecStatus(models.IntegerChoices):
    IN_WORK = 0, _('в работе')
    DONE = 1, _('выполнено')
    UNDONE = 2, _('не выполнено')


class FileCategory(models.IntegerChoices):
    PHOTO = 0, _('фотография')
    ITD = 1, _('ИТД')


class CameraType(models.IntegerChoices):
    NONE = 0, _('не указано')
    OPEN = 1, _('открытая')
    CLOSED = 2, _('закрытая')


class InstallLocation(models.IntegerChoices):
    NONE = 0, _('не указано')
    FLOOR = 1, _('напольный')
    WALL = 2, _('настенный')


class ControlledEnv(models.IntegerChoices):
    NONE = 0, _('не указано')
    METHANE = 1, _('CH4')
    CARBON = 2, _('CO2')
    METHANE_CARBON = 3, _('CH4+CO2')


class VdgoObject(models.Model):
    id = models.IntegerField('ID объекта',
                             primary_key=True,
                             db_column='id_obj')
    address = models.CharField('Адрес объекта',
                               max_length=255,
                               db_column='addr')
    phone_vdgo = models.CharField('Телефон (ВДГО)',
                                  max_length=32,
                                  db_column='phone_vdgo',
                                  null=True)
    email_vdgo = models.CharField('Электронная почта (ВДГО)',
                                  max_length=64,
                                  db_column='email_vdgo',
                                  null=True)

    def __str__(self):
        return self.address

    """
        Обрезать наименование, если адрес длинный
    """
    def get_name_or_cut(self):
        if len(self.address) > 30:
            return self.address[30:] + '...'
        return self.address

    class Meta:
        db_table = 'to_ch_addr_object'
        ordering = ['address']
        verbose_name = 'Объект ВДГО'
        verbose_name_plural = 'Объекты ВДГО'


class Bypass(models.Model):
    id = models.IntegerField('ID ВДГО',
                             primary_key=True,
                             db_column='id')
    object = models.ForeignKey('VdgoObject',
                               on_delete=models.PROTECT,
                               db_column='id_object',
                               related_name='bypasses',
                               verbose_name='Объект')
    executor = models.ForeignKey('account.Executor',
                                 on_delete=models.PROTECT,
                                 db_column='id_exec',
                                 related_name='bypasses',
                                 verbose_name='Исполнитель')
    dog_type = models.SmallIntegerField('Тип договора',
                                        choices=VdgoDogType.choices,
                                        db_column='type_dog')
    exec_status = models.SmallIntegerField('Статус выполнения',
                                           choices=ExecStatus.choices,
                                           db_column='web_exec')
    date_action = models.DateTimeField('Дата назначения',
                                       db_column='date_action')
    undone_reason = models.ForeignKey('UndoneReason',
                                      on_delete=models.PROTECT,
                                      db_column='undone_reason',
                                      verbose_name='Причина невыполнения')
    is_fixed = models.BooleanField('Проведено?',
                                   default=False,
                                   db_column='fixed')

    def __str__(self):
        return (f'{self.object.get_name_or_cut()} | '
                + f'{self.date_action} | '
                + f'{self.executor}')

    class Meta:
        managed = False
        db_table = 'web_vdgo_bypass'
        ordering = ['-date_action', 'object']
        verbose_name = 'ВДГО'
        verbose_name_plural = 'ВДГО'


class Client(models.Model):
    id = models.IntegerField('ID клиента',
                             primary_key=True,
                             db_column='id_klient')
    name = models.CharField('ФИО клиента',
                            max_length=128,
                            db_column='FIO')
    phone = models.CharField('Номер телефона',
                             max_length=32,
                             db_column='telefon')
    object = models.ForeignKey('VdgoObject',
                               on_delete=models.PROTECT,
                               db_column='id_object',
                               related_name='clients',
                               verbose_name='Объект')

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'web_vdgo_client'
        ordering = ['name']
        verbose_name = 'Клиент'
        verbose_name_plural = 'Клиенты'


class EquipmentType(models.Model):
    id = models.IntegerField('ID',
                             primary_key=True,
                             db_column='id_ob')
    name = models.CharField('Название',
                            max_length=128,
                            db_column='name_ob')

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'to_ch_ob'
        verbose_name = 'Тип оборудования'
        verbose_name_plural = 'Типы оборудования'


class Equipment(models.Model):
    id = models.IntegerField('ID оборудования',
                             primary_key=True,
                             db_column='id_st')
    object = models.ForeignKey('VdgoObject',
                               on_delete=models.PROTECT,
                               db_column='id_obj',
                               related_name='equipment',
                               verbose_name='Объект')
    type = models.ForeignKey('EquipmentType',
                             on_delete=models.PROTECT,
                             db_column='id_ob',
                             verbose_name='Тип оборудования')
    quantity = models.FloatField('Количество',
                                 db_column='kol_oborud')
    part = models.FloatField('Доля',
                             db_column='dol_ob')
    manufacturer = models.ForeignKey('Manufacturer',
                                     on_delete=models.PROTECT,
                                     db_column='id_izg',
                                     verbose_name='Изготовитель')
    equipment_model = models.ForeignKey('EquipmentModel',
                                        on_delete=models.PROTECT,
                                        db_column='id_model',
                                        verbose_name='Модель')

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'to_ch_story'
        ordering = ['object', 'type']
        verbose_name = 'Оборудование'
        verbose_name_plural = 'Оборудования'


class Manufacturer(models.Model):
    id = models.SmallIntegerField('ID изготовителя',
                                  primary_key=True,
                                  db_column='id_izg')
    name = models.CharField('Название',
                            max_length=64,
                            db_column='name_izg')

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'vdg_izg'
        ordering = ['name']
        verbose_name = 'Изготовитель'
        verbose_name_plural = 'Изготовители'


class EquipmentModel(models.Model):
    id = models.IntegerField('ID модели',
                             primary_key=True,
                             db_column='id_model')
    manufacturer = models.ForeignKey('Manufacturer',
                                     on_delete=models.PROTECT,
                                     db_column='id_izg',
                                     verbose_name='Изготовитель')
    name = models.CharField('Название',
                            max_length=64,
                            db_column='name_model')
    type = models.ForeignKey('EquipmentType',
                             on_delete=models.PROTECT,
                             db_column='id_ob',
                             verbose_name='Тип оборудования')

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'vdg_model'
        ordering = ['name']
        verbose_name = 'Модель оборудования'
        verbose_name_plural = 'Модели оборудования'


class EquipmentInfo(models.Model):
    id = models.IntegerField('ID',
                             primary_key=True,
                             db_column='id_param')
    equipment = models.ForeignKey('Equipment',
                                  on_delete=models.PROTECT,
                                  db_column='id_st',
                                  related_name='info',
                                  verbose_name='Оборудование')
    eyeliner_type = models.BooleanField('Вид подводки')
    factory_num = models.CharField('Заводской №',
                                   max_length=32)
    burners_num = models.SmallIntegerField('Количество конфорок')
    power = models.FloatField('Мощность')
    lifetime = models.SmallIntegerField('Срок эксплуатации')
    extra_info = models.TextField('Дополнительная информация')
    install_date = models.DateTimeField('Дата установки')
    shutdown_date = models.DateTimeField('Дата отключения')
    camera_type = models.SmallIntegerField('Тип камеры',
                                           choices=CameraType.choices)
    install_location = models.SmallIntegerField(
        'Место установки',
        choices=InstallLocation.choices
    )
    meter_value = models.IntegerField('Показание счетчика')
    reading_date = models.DateTimeField('Дата показаний')
    valve_presence = models.BooleanField('Наличие клапана',
                                         default=False)
    controlled_env = models.SmallIntegerField('Контролируемая среда',
                                              choices=ControlledEnv.choices)

    def __str__(self):
        return f'{self.equipment} - {self.manufacturer} | {self.model}'

    class Meta:
        managed = False
        db_table = 'web_vdgo_equipment_info'
        verbose_name = 'Информация об оборудовании'
        verbose_name_plural = 'Информация об оборудовании'


class EquipmentInfoPrev(models.Model):
    id = models.IntegerField('ID',
                             primary_key=True,
                             db_column='id_param')
    equipment = models.ForeignKey('Equipment',
                                  on_delete=models.PROTECT,
                                  db_column='id_st',
                                  related_name='previous',
                                  verbose_name='Оборудование')
    prev_manufacturer = models.CharField('Изготовитель',
                                         max_length=80,
                                         db_column='name_izg')
    prev_model = models.CharField('Модель',
                                  max_length=50,
                                  db_column='model')

    def __str__(self):
        return f'{self.prev_manufacturer} - {self.prev_model}'

    class Meta:
        managed = False
        db_table = 'web_vdgo_ob_prev'
        verbose_name = 'Предыдущее значение оборудования'
        verbose_name_plural = 'Предыдущее значения оборудований'


class FileInfo(models.Model):
    id = models.AutoField('ID файла',
                          primary_key=True,
                          db_column='id')
    object = models.ForeignKey('VdgoObject',
                               on_delete=models.PROTECT,
                               db_column='id_obj',
                               related_name='files',
                               verbose_name='Объект')
    filename = models.CharField('Название файла',
                                max_length=32,
                                blank=True,
                                db_column='name')
    file_num = models.SmallIntegerField('Порядковый №',
                                        db_column='num')
    file_category = models.SmallIntegerField('Категория файла',
                                             choices=FileCategory.choices,
                                             db_column='file_type')
    file_size = models.BigIntegerField('Размер файла',
                                       blank=True,
                                       db_column='size')
    bypass = models.ForeignKey('Bypass',
                               on_delete=models.PROTECT,
                               db_column='id_bypass',
                               related_name='files',
                               verbose_name='ВДГО',
                               default=0)
    bypass_date = models.DateField('Дата ВДГО',
                                   db_column='bypass_date',
                                   null=True)
    is_deleted = models.BooleanField('Файл удален?',
                                     default=False,
                                     db_column='deleted')
    user_add = models.ForeignKey('account.Executor',
                                 on_delete=models.PROTECT,
                                 db_column='user_add',
                                 related_name='files',
                                 verbose_name='Исполнитель')
    date_add = models.DateTimeField(auto_now_add=True,
                                    db_column='date_add')

    def __str__(self):
        return self.filename

    class Meta:
        managed = False
        db_table = 'web_vdgo_files'
        ordering = ['file_category', 'filename']
        verbose_name = 'Файл объекта'
        verbose_name_plural = 'Файлы объекта'


class UndoneReason(models.Model):
    id = models.IntegerField('ID причины',
                             primary_key=True,
                             db_column='id')
    name_full = models.CharField('Полное название',
                                 max_length=64,
                                 db_column='name_full')
    name_short = models.CharField('Краткое название',
                                  max_length=32,
                                  db_column='name_short')

    def __str__(self):
        return self.name_full

    class Meta:
        managed = False
        db_table = 'web_vdgo_undone_spr'
        ordering = ['id']
        verbose_name = 'Причина невыполнения'
        verbose_name_plural = 'Причины невыполнения'


class BypassBuffer(models.Model):
    id = models.AutoField(primary_key=True)
    id_bypass = models.IntegerField()
    id_obj = models.IntegerField()
    id_exec = models.IntegerField()
    date_action = models.DateTimeField()
    exec_vdgo = models.SmallIntegerField()
    undone_reason = models.SmallIntegerField()
    fixed = models.BooleanField(default=False)

    class Meta:
        db_table = 'web_vdgo_buff_bypass'


class EquipmentInfoBuffer(models.Model):
    id = models.AutoField(primary_key=True)
    id_bypass = models.IntegerField()
    id_st = models.IntegerField()
    id_izg = models.IntegerField(default=0)
    id_model = models.IntegerField(default=0)
    podvod = models.BooleanField(default=0)
    z_num = models.CharField(max_length=32, blank=True)
    k_count = models.SmallIntegerField(default=0)
    Pwr = models.FloatField(default=0)
    Expl = models.SmallIntegerField(default=0)
    dopinf = models.TextField(blank=True)
    d_ust = models.DateTimeField(default='2050-01-01 00:00:00')
    d_otkl = models.DateTimeField(default='2050-01-01 00:00:00')
    tip_kam = models.SmallIntegerField(default=0)
    m_ust = models.SmallIntegerField(default=0)
    pokaz = models.IntegerField(default=0)
    d_pokaz = models.DateTimeField(default='2050-01-01 00:00:00')
    klapan = models.BooleanField(default=False)
    kontr_sr = models.SmallIntegerField(default=0)
    user_add = models.SmallIntegerField()
    date_add = models.DateTimeField(auto_now_add=True)
    fixed = models.BooleanField(default=False)

    class Meta:
        db_table = 'web_vdgo_buff_ob'
