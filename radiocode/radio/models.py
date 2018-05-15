from django.db import models

# Create your models here.
class Channel(models.Model):
    id = models.IntegerField(db_column='id', primary_key=True)
    c_id = models.CharField(db_column='c_id', max_length=128)
    name = models.CharField(db_column='name', max_length=128)
    p_id = models.IntegerField(db_column='p_id')
    src = models.CharField(db_column='src', max_length=1024, blank=True, null=True)

    class Meta:
        db_table = "channels"

class Place(models.Model):
    id = models.IntegerField(db_column='id', primary_key=True)
    p_id = models.CharField(db_column='p_id', max_length=128)
    city = models.CharField(db_column='city', max_length=128)
    country = models.IntegerField(db_column='country')
    geo = models.CharField(db_column='geo', max_length=128)
    channelCount = models.IntegerField(db_column='channelCount')
    timezone = models.IntegerField(db_column='timezone')

    class Meta:
        db_table = "places"