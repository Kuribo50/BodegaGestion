# Usa una imagen base con Python 3.10 (compatible con Django 5.1.1)
FROM python:3.10-slim

# Actualizar el sistema e instalar dependencias necesarias para compilar algunos paquetes
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    libpq-dev \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo de dependencias
COPY requirements.txt .

# Actualizar pip antes de instalar dependencias
RUN pip install --upgrade pip

# Instalar las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["gunicorn", "inventario_api.wsgi:application", "--bind", "0.0.0.0:8000"]
