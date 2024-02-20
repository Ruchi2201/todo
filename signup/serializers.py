
from rest_framework import serializers
# from .models import User
from .models import User


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','Picture','Name','Age','City','Email','Phone','Post','StartDate']
        # fields = ['id','Name','Age','City','Email','Phone','Post','StartDate']


   