# Generated by Django 5.1.1 on 2024-12-30 04:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion', '0005_alter_task_end_alter_task_task_type_alter_task_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='movimiento',
            name='estado_nuevo',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='movimientos_recibidos', to='gestion.estadoarticulo'),
        ),
        migrations.AlterField(
            model_name='historialstock',
            name='tipo_movimiento',
            field=models.CharField(choices=[('Entrada', 'Entrada'), ('Salida', 'Salida'), ('Nuevo Articulo', 'Nuevo Articulo'), ('Cambio de Estado', 'Cambio de Estado'), ('Prestamo', 'Prestamo'), ('Regresado', 'Regresado'), ('Cambio de Estado por Unidad', 'Cambio de Estado por Unidad')], max_length=50),
        ),
        migrations.AlterField(
            model_name='movimiento',
            name='tipo_movimiento',
            field=models.CharField(choices=[('Entrada', 'Entrada'), ('Salida', 'Salida'), ('Nuevo Articulo', 'Nuevo Articulo'), ('Cambio de Estado', 'Cambio de Estado'), ('Cambio de Estado por Unidad', 'Cambio de Estado por Unidad'), ('Prestamo', 'Prestamo'), ('Regresado', 'Regresado')], max_length=50),
        ),
    ]