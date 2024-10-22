from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from accounts.views import SignupView, LoginView, predict_protein_content, SendSMSView


# Simple view for root URL
def home(request):
    return HttpResponse('<h1>Welcome to the Django-Backend..!</h1>')

urlpatterns = [
    path('', home, name='home'),  # Root URL now points to this view
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('api/predict/', predict_protein_content, name='predict_protein_content'),
    path('api/send-sms/', SendSMSView.as_view(), name='send_sms'),  # New SMS sending endpoint
]
