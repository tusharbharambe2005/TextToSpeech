from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('speech_app.urls')),
    path('auth/', include('authapp.urls')),
]
