from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from rest_framework.response import Response
from server.settings.base import EMAIL_HOST_USER

def email(username, user_email):
    try:
        html_mensaje = render_to_string('email_account_created.html', {'user_name': username})

        email = EmailMessage(
            subject="Cuenta creada exitosamente",
            body=html_mensaje,
            from_email=EMAIL_HOST_USER,
            to=[user_email], 
        )
        
        email.content_subtype = 'html'
        email.send()

    except Exception as e:
        raise {"Message": e}