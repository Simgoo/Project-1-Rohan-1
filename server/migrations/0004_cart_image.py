# Generated by Django 5.1.5 on 2025-02-14 00:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_remove_cart_movie_cart_movie_id_cart_price_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='image',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]
