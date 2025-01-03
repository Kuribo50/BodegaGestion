# Generated by Django 5.1.3 on 2024-12-22 17:59

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100, unique=True)),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('requiere_codigo_interno', models.BooleanField(default=False)),
                ('requiere_codigo_minvu', models.BooleanField(default=False)),
                ('requiere_numero_serie', models.BooleanField(default=False)),
                ('requiere_mac', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'categoria',
            },
        ),
        migrations.CreateModel(
            name='EstadoArticulo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100, unique=True)),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'estado_articulo',
            },
        ),
        migrations.CreateModel(
            name='Marca',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100, unique=True)),
                ('descripcion', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'marca',
            },
        ),
        migrations.CreateModel(
            name='Motivo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100, unique=True)),
                ('descripcion', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'motivo',
            },
        ),
        migrations.CreateModel(
            name='Personal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
                ('seccion', models.CharField(max_length=100, null=True)),
                ('correo_institucional', models.EmailField(max_length=254, unique=True)),
            ],
            options={
                'db_table': 'personal',
            },
        ),
        migrations.CreateModel(
            name='Ubicacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100, unique=True)),
                ('descripcion', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'ubicacion',
            },
        ),
        migrations.CreateModel(
            name='Modelo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100, unique=True)),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('marca', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='gestion.marca')),
            ],
            options={
                'db_table': 'modelo',
            },
        ),
        migrations.CreateModel(
            name='Articulo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(db_index=True, max_length=255)),
                ('stock_actual', models.IntegerField(default=0)),
                ('stock_minimo', models.IntegerField(default=0)),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('codigo_interno', models.CharField(blank=True, db_index=True, max_length=100, null=True, unique=True)),
                ('codigo_minvu', models.CharField(blank=True, max_length=100, null=True, unique=True)),
                ('numero_serie', models.CharField(blank=True, db_index=True, max_length=100, null=True, unique=True)),
                ('mac', models.CharField(blank=True, max_length=17, null=True, unique=True)),
                ('prestado', models.BooleanField(default=False)),
                ('stock_prestado', models.PositiveIntegerField(default=0)),
                ('categoria', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='gestion.categoria')),
                ('estado', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='gestion.estadoarticulo')),
                ('marca', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='gestion.marca')),
                ('modelo', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='gestion.modelo')),
                ('ubicacion', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='gestion.ubicacion')),
            ],
            options={
                'db_table': 'articulo',
            },
        ),
        migrations.CreateModel(
            name='Movimiento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo_movimiento', models.CharField(choices=[('Entrada', 'Entrada'), ('Salida', 'Salida'), ('Nuevo Articulo', 'Nuevo Articulo'), ('Cambio de Estado', 'Cambio de Estado'), ('Prestamo', 'Prestamo'), ('Regresado', 'Regresado')], max_length=50)),
                ('cantidad', models.PositiveIntegerField(default=0)),
                ('fecha', models.DateTimeField(default=django.utils.timezone.now)),
                ('comentario', models.TextField(blank=True, null=True)),
                ('articulo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='movimientos', to='gestion.articulo')),
                ('motivo', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='gestion.motivo')),
                ('prestamo_relacionado', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='devoluciones', to='gestion.movimiento')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('personal', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='gestion.personal')),
                ('ubicacion', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='gestion.ubicacion')),
            ],
            options={
                'db_table': 'movimiento',
                'ordering': ['-fecha'],
            },
        ),
        migrations.CreateModel(
            name='Notificacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mensaje', models.TextField()),
                ('leido', models.BooleanField(default=False)),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('articulo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion.articulo')),
            ],
            options={
                'db_table': 'notificacion',
            },
        ),
        migrations.CreateModel(
            name='HistorialPrestamo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_prestamo', models.DateTimeField(auto_now_add=True)),
                ('fecha_devolucion', models.DateTimeField(blank=True, null=True)),
                ('cantidad', models.PositiveIntegerField()),
                ('cantidad_restante', models.PositiveIntegerField()),
                ('articulo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion.articulo')),
                ('motivo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion.motivo')),
                ('movimiento_prestamo', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='historial_prestamo', to='gestion.movimiento')),
                ('personal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion.personal')),
            ],
        ),
        migrations.CreateModel(
            name='HistorialStock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo_movimiento', models.CharField(choices=[('Entrada', 'Entrada'), ('Salida', 'Salida'), ('Cambio de Estado', 'Cambio de Estado'), ('Prestamo', 'Prestamo'), ('Regresado', 'Regresado')], max_length=50)),
                ('cantidad', models.PositiveIntegerField()),
                ('stock_anterior', models.PositiveIntegerField()),
                ('stock_actual', models.PositiveIntegerField()),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('comentario', models.TextField(blank=True, null=True)),
                ('articulo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion.articulo')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('motivo', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='gestion.motivo')),
                ('ubicacion', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='gestion.ubicacion')),
            ],
            options={
                'db_table': 'historial_stock',
            },
        ),
    ]
