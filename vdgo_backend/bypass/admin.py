from django.contrib import admin

from .models import FileInfo, UndoneReason

admin.site.register(FileInfo)
admin.site.register(UndoneReason)
