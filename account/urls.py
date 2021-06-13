from account.views import logged_in_user
from django.urls import path, include
from . import views


urlpatterns = [
    path('', include('djoser.urls')),
    path('', include('djoser.urls.authtoken')),
    path('logged_in_user', views.logged_in_user),
]
