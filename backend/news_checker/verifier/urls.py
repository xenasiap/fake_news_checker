from django.urls import path
from . import views

urlpatterns = [
    path('check-news/', views.check_news, name='check_news'),
]
