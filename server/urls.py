"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.db import router
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from .views import get_movies, get_movie_details  # importing static url
from .views import RegistrationView, LoginView
from rest_framework import routers
from server import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/movies/", get_movies, name="get_movies"),
    path("api/movies/<int:movie_id>/", get_movie_details, name="get_movie_details"),
    path("api/register", RegistrationView.as_view(), name = "register"),
    path("api/login", LoginView.as_view(), name = "login"),
    re_path(
        r"^(?!api/).*", TemplateView.as_view(template_name="index.html")
    ),  # serve index.html for all other routes
]