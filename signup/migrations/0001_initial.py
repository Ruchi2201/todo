# Generated by Django 5.0.1 on 2024-02-16 12:25

import django.core.validators
import signup.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Picture', models.ImageField(upload_to='images/', validators=[signup.models.validate_picture_size, django.core.validators.FileExtensionValidator(['jpg', 'jpeg', 'png', 'svg'])])),
                ('Name', models.CharField(max_length=150)),
                ('Age', models.IntegerField()),
                ('City', models.CharField(max_length=150)),
                ('Email', models.EmailField(max_length=254, unique=True)),
                ('Phone', models.CharField(max_length=10, unique=True, validators=[django.core.validators.MinLengthValidator(10)])),
                ('Post', models.CharField(max_length=150)),
                ('StartDate', models.DateField()),
            ],
            options={
                'db_table': 'signup_user',
            },
        ),
    ]
