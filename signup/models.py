# from django.db import models
# from django.core.validators import MinLengthValidator, FileExtensionValidator 
# from django.core.validators import MinLengthValidator
# from django.core.exceptions import ValidationError
# import os

# def validate_picture_size(value):
#     # Max size in bytes (1MB)
#     max_size = 1024 * 1024

#     if value.size > max_size:
#         raise ValidationError(f"Max file size is {max_size} bytes")

# def validate_picture_extension(value):
#     ext = os.path.splitext(value.name)[1]  # Get the file extension
#     valid_extensions = ['.jpg', '.jpeg', '.png', '.svg']
#     if not ext.lower() in valid_extensions:
#         raise ValidationError('Unsupported file format. Please upload a JPEG, PNG, or SVG file.')

# class User (models.Model):
#     # Picture = models.ImageField(upload_to='images/', validators=[validate_picture_extension],)
#     Picture = models.ImageField(upload_to='images/', validators=[validate_picture_size,FileExtensionValidator(['jpg', 'jpeg', 'png', 'svg'])])
#     Name = models.CharField (max_length = 150)
#     Age = models.IntegerField ()
#     City = models.CharField (max_length = 150)
#     Email = models.EmailField (unique=True)
#     Phone = models.CharField(max_length=10 , validators=[MinLengthValidator(10)],unique=True)
#     Post = models.CharField(max_length = 150)
#     StartDate = models.DateField()



# class Meta:
#     db_table = 'signup'



from django.db import models
from django.core.validators import MinLengthValidator, FileExtensionValidator 
from django.core.exceptions import ValidationError
import os

def validate_picture_size(value):
    # Max size in bytes (1MB)
    max_size = 1024 * 1024

    if value.size > max_size:
        raise ValidationError(f"Max file size is {max_size} bytes")

def validate_picture_extension(value):
    ext = os.path.splitext(value.name)[1]  # Get the file extension
    valid_extensions = ['.jpg', '.jpeg', '.png', '.svg']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file format. Please upload a JPEG, PNG, or SVG file.')

class User(models.Model):
    Picture = models.ImageField(upload_to='images/', validators=[validate_picture_size, FileExtensionValidator(['jpg', 'jpeg', 'png', 'svg'])])
    Name = models.CharField(max_length=150)
    Age = models.IntegerField()
    City = models.CharField(max_length=150)
    Email = models.EmailField(unique=True)
    Phone = models.CharField(max_length=10, validators=[MinLengthValidator(10)], unique=True)
    Post = models.CharField(max_length=150)
    StartDate = models.DateField()

    class Meta:
        db_table = 'signup_user'
