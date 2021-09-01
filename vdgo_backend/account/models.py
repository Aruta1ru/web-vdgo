from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import UserManager


class MainBranch(models.IntegerChoices):
    BRANCH0 = 0, _('Не указан')
    BRANCH1 = 1, _('Филиал №1 в г.Дзержинск')
    BRANCH2 = 2, _('Филиал №2 в г.Арзамас')
    BRANCH3 = 3, _('Филиал №3 в г.Богородск')
    BRANCH4 = 4, _('Филиал №4 в г.Бор')
    BRANCH5 = 5, _('Филиал №5 в г.Павлово')
    BRANCH6 = 6, _('Филиал №6 в г.Сергач')
    NN = 7, _('Нижний Новгород')


class Unit(models.Model):
    id = models.IntegerField('ID',
                             primary_key=True,
                             db_column='id_unit')
    name_full = models.CharField('Полное наименование',
                                 max_length=128,
                                 db_column='im_full')
    name_short = models.CharField('Краткое наименование',
                                  max_length=64,
                                  db_column='im')

    def __str__(self):
        return f'{self.name_full} ({self.name_short})'

    class Meta:
        managed = False
        db_table = 'web_vdgo_unit'
        ordering = ['name_full']
        verbose_name = 'Подразделение'
        verbose_name_plural = 'Подразделения'


class Executor(models.Model):
    id = models.IntegerField('ID',
                             primary_key=True,
                             db_column='id_bso_user')
    name = models.CharField('ФИО исполнителя',
                            max_length=128,
                            db_column='fio')
    post = models.CharField('Должность',
                            max_length=128,
                            db_column='dolgn')
    unit = models.ForeignKey('Unit',
                             on_delete=models.PROTECT,
                             db_column='unit')

    def __str__(self):
        return f'({self.id}) {self.name} | {self.unit}'

    class Meta:
        managed = False
        db_table = 'web_vdgo_executor'
        ordering = ['name', 'unit']
        verbose_name = 'Исполнитель'
        verbose_name_plural = 'Исполнители'


class User(AbstractUser):

    ADMIN = 'admin'
    BOSS = 'boss'
    USER = 'user'
    ROLES = [
        (ADMIN, 'Администратор'),
        (BOSS, 'Руководитель'),
        (USER, 'Пользователь'),
    ]

    executor = models.ForeignKey('Executor',
                                 on_delete=models.PROTECT,
                                 db_column='id_exec',
                                 default=0,
                                 verbose_name='Исполнитель')
    branch = models.SmallIntegerField('Филиал/НН',
                                      default=0,
                                      choices=MainBranch.choices,
                                      db_column='branch')
    role = models.CharField('Роль',
                            max_length=9,
                            choices=ROLES,
                            default=USER)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['executor', 'branch']
    objects = UserManager()

    def __str__(self):
        return self.username

    @property
    def is_admin_role(self):
        return self.role == self.ADMIN

    @property
    def is_boss_role(self):
        return self.role == self.BOSS

    @property
    def is_user_role(self):
        return self.role == self.USER

    class Meta:
        ordering = ['role', 'username']
