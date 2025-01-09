from .base import *

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

"""
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',          # Motor de base de datos
        'NAME': os.environ.get('LOCAL_DB_NAME'),             # Nombre de tu base de datos
        'USER': os.environ.get('LOCAL_DB_USER'),             # Usuario de la base de datos
        'PASSWORD': os.environ.get('LOCAL_DB_PASSWORD'),     # Contraseña del usuario
        'HOST': os.environ.get('LOCAL_DB_HOST'),                           # Host, usa '127.0.0.1' si está en tu máquina local
        'PORT': os.environ.get('LOCAL_DB_PORT'),                                # Puerto de MySQL (default: 3306)
        'OPTIONS': {
            'sql_mode': 'STRICT_TRANS_TABLES',         # Opcional para evitar problemas con MySQL
        },
    }
}
"""

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',          # Motor de base de datos
        'NAME': os.environ.get('DB_NAME'),             # Nombre de tu base de datos
        'USER': os.environ.get('DB_USER'),             # Usuario de la base de datos
        'PASSWORD': os.environ.get('DB_PASSWORD'),     # Contraseña del usuario
        'HOST': os.environ.get('DB_HOST'),             # Host, usa '127.0.0.1' si está en tu máquina local
        'PORT': os.environ.get('DB_PORT'),             # Puerto de MySQL (default: 3306)
        'OPTIONS': {
            'sql_mode': 'STRICT_TRANS_TABLES',         # Opcional para evitar problemas con MySQL
        },
    }
}

# Renderizadores adicionales para desarrollo
REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] += (
    'rest_framework.renderers.BrowsableAPIRenderer',
)