from django.db import models
import os

class CategoryEnum(models.TextChoices):
    REMERA = "RM", "Remera"
    ZAPATILLA = "ZP", "Zapatilla"

class SizeEnum(models.TextChoices):
    T_18 = "18", "18"
    T_19 = "19", "19"
    T_20 = "20", "20"
    T_21 = "21", "21"
    T_22 = "22", "22"
    T_23 = "23", "23"
    T_24 = "24", "24"
    T_25 = "25", "25"
    T_26 = "26", "26"
    T_27 = "27", "27"
    T_28 = "28", "28"
    T_29 = "29", "29"
    T_30 = "30", "30"
    T_31 = "31", "31"
    T_32 = "32", "32"
    T_33 = "33", "33"
    T_34 = "34", "34"
    T_35 = "35", "35"
    T_36 = "36", "36"
    T_37 = "37", "37"
    T_38 = "38", "38"
    T_39 = "39", "39"
    T_40 = "40", "40"
    T_41 = "41", "41"
    T_42 = "42", "42"
    T_43 = "43", "43"
    T_44 = "44", "44"
    T_45 = "45", "45"
    T_46 = "46", "46"

    XS = "XS", "XS"
    S = "S", "S"
    M = "M", "M"
    L = "L", "L"
    XL = "XL", "XL"
    XXL = "XXL", "XXL"
    XXXL = "XXXL", "XXXL"
    XXXXL = "XXXXL", "XXXXL"


class Product(models.Model):
    name = models.CharField(max_length=50, blank=False)
    description = models.TextField(max_length=200, blank=False)
    category = models.CharField(max_length=2, choices=CategoryEnum.choices, blank=False)
    price = models.DecimalField(decimal_places=2, max_digits=10, blank=False)
    size = models.CharField(max_length=50, choices=SizeEnum.choices, blank=False)
    stock = models.IntegerField(blank=False)
    img = models.ImageField(upload_to="products/")

    def delete(self, using=None, keep_parents=False):
        # Borrar el archivo de la imagen si existe
        if self.img:
            if os.path.isfile(self.img.path):
                os.remove(self.img.path)
        super().delete(using, keep_parents)

    def __str__(self):  
        return self.name

