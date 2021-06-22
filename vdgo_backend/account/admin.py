from django.contrib import admin

from .models import Executor, Unit, User

admin.site.register(User)
admin.site.register(Unit)
admin.site.register(Executor)
