
from .base import *

DEBUG = False

ALLOWED_HOSTS = ['your-production-domain.com']

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
# Seguridad adicional para producción
#SECURE_SSL_REDIRECT = True
#SESSION_COOKIE_SECURE = True
#CSRF_COOKIE_SECURE = True

# Logging para errores en producción
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'logs/errors.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}
