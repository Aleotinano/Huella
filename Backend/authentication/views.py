from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from authentication.utils.email_sender import email

class UserPostView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            email(user.username, user.email)
            return Response(data=UserSerializer(user).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response(UserSerializer(user).data)