# Generated by Django 5.1.1 on 2024-12-23 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion', '0002_delete_notificacion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historialstock',
            name='tipo_movimiento',
            field=models.CharField(choices=[('Entrada', 'Entrada'), ('Salida', 'Salida'), ('Nuevo Articulo', 'Nuevo Articulo'), ('Cambio de Estado', 'Cambio de Estado'), ('Prestamo', 'Prestamo'), ('Regresado', 'Regresado')], max_length=50),
        ),
    ]
