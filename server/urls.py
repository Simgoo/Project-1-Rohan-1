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
from django.urls import path, re_path
from django.views.generic import TemplateView
from .views import (
    get_movies,
    get_movie_details,
    EmailView,
    RegistrationView,
    LoginView,
    CartView,
    movie_list,
    movie_detail,
    wallet_view,
    CreateOrderView,
    GetUserOrdersView,
    LeaveReview,
    FetchUserReviews,
    FetchMovieReviews,
    ResetPassword,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/movies/", get_movies, name="get_movies"),
    path("api/email/<str:token>/", EmailView.as_view(), name="get_email"),
    path("api/custommovies/", movie_list, name="movie-list"),
    path("api/order/", CreateOrderView.as_view(), name="create_order"),
    path(
        "api/orders/<str:user_email>/", GetUserOrdersView.as_view(), name="get_orders"
    ),
    path("api/custommovies/<int:id>/", movie_detail, name="movie-detail"),
    path("api/wallet/<str:token>/", wallet_view, name="get_wallet"),
    path("api/movies/<int:movie_id>/", get_movie_details, name="get_movie_details"),
    path("api/register/", RegistrationView.as_view(), name="register"),
    path("api/login/", LoginView.as_view(), name="login"),
    path("api/cart/", CartView.as_view(), name="cart"),
    path("api/cart/<str:email>/", CartView.as_view(), name="cart-detail"),
    path("api/cart/<str:email>/<int:movie_id>/", CartView.as_view()),
    path("api/leave_review/", LeaveReview.as_view(), name="leave_review"),
    path(
        "api/fetch_user_reviews/<str:token>/",
        FetchUserReviews.as_view(),
        name="fetch_user_reviews",
    ),
    path(
        "api/fetch_movie_reviews/<int:id>/",
        FetchMovieReviews.as_view(),
        name="fetch_movie_reviews",
    ),
    path("api/resetpassword/", ResetPassword.as_view(), name="resetpassword"),
    re_path(
        r"^(?!api/).*", TemplateView.as_view(template_name="index.html")
    ),  # serve index.html for all other routes
]
