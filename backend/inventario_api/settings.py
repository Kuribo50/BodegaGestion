from pathlib import Path
from datetime import timedelta
import os
from decouple import config, Csv  # Importa config y Csv
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY', default='django-insecure-g-0!v=%py_+t946f=7*#pqfr7b9!45orm4(c(ms7-sv8l0&iq%')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Define los hosts permitidos
ALLOWED_HOSTS = ['*']  # Temporalmente permite todos los hosts para pruebas

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',  # Django REST Framework
    'gestion',  # Tu aplicación para la API
    'corsheaders',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Colocado antes de CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'inventario_api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # Puedes agregar directorios de plantillas si es necesario
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',  # Necesario para admin
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'inventario_api.wsgi.application'

# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': dj_database_url.config(
        default=config('DATABASE_URL'),
        conn_max_age=600,
        conn_health_checks=True,
    )
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = config('DJANGO_TIMEZONE', default='UTC')

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Si tienes archivos estáticos adicionales, puedes agregarlos aquí
STATICFILES_DIRS = [
]

# Directorio para archivos multimedia
MEDIA_URL = '/media/'
MEDIA_ROOT = config('DJANGO_MEDIA_ROOT', default=os.path.join(BASE_DIR, 'media'))

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://frontend-production-4686.up.railway.app",
    "https://backend-production-d80c.up.railway.app",
]

CORS_ALLOW_CREDENTIALS = True  # Permitir cookies y credenciales


# Configuración adicional para Simple JWT
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=120),  # Duración del token de acceso
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),    # Duración del token de refresco
    'ROTATE_REFRESH_TOKENS': True,                 # Rotar tokens de refresco automáticamente
    'BLACKLIST_AFTER_ROTATION': True,              # Invalidar tokens antiguos tras rotación
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),              # Tipo de encabezado
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'JTI_CLAIM': 'jti',
}

# Configuración para archivos estáticos en producción
if not DEBUG:
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
    MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')

# Configuración de CORS para producción
if not DEBUG:
    CORS_ALLOWED_ORIGINS = [
        "https://your-frontend-domain.com",  # Cambiar por el dominio de tu frontend
    ]
