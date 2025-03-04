from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Movie, Order, Cart, Review


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "wallet", "birthday"]
        extra_kwargs = {"password": {"write_only": True}}


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ["id", "title", "description", "backdrop", "image", "rating"]


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["user", "movie_id", "movie_title", "image", "timestamp"]


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ["user", "movie_id", "movie_title", "price"]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["user", "movie", "comment", "rating"]
