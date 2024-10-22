from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth import authenticate
from .models import MyUser
from django.contrib.auth.models import update_last_login
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from .serializers import UserSerializer
import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from rest_framework.decorators import api_view
import joblib  # To save/load the model
from twilio.rest import Client
from django.conf import settings  # To get Twilio credentials
import logging

User = get_user_model()

# Load and train the model once on server startup
def train_and_save_model():
    df = pd.read_csv(r"R:\ML CAT-2\ML-Login-page-main\frontend\public\spirulina_dataset_final.csv")

    # Selecting features for training
    selected_features = ['Seawater Medium', 'Temperature', 'Pond System', 'Aeration', 'Light Time', 'BG11 Medium', 'Salinity']
    X = df[selected_features]

    # Function to categorize protein content
    def categorize_protein_content(value):
        if value == 0.5:
            return 1  # Low
        elif value == 0.75:
            return 2  # Medium
        else:
            return 3  # High

    # Transform the target variable into categorical
    df['Protein Content'] = df['Protein Content'].apply(categorize_protein_content)
    y = df['Protein Content']

    # Split the dataset
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train the classifier
    clf = DecisionTreeClassifier(random_state=42)
    clf.fit(X_train, y_train)

    # Save the trained model
    joblib.dump(clf, 'decision_tree_model.joblib')

    # Model accuracy for reference (can be logged)
    y_pred = clf.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model trained with accuracy: {accuracy}")

# Train the model on server startup
train_and_save_model()

# Signup View
class SignupView(generics.CreateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')
        phone_number = request.data.get('phone_number')

        # Check if passwords match
        if password != confirm_password:
            return Response({"detail": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        # Create user and save
        user = MyUser(username=username, email=email, phone_number=phone_number)
        user.set_password(password)
        user.save()

        return Response({"detail": "Signup successful!"}, status=status.HTTP_201_CREATED)

# Login View
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(request, email=email, password=password)

        if user is not None:
            # Generate token if authentication is successful
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': str(token)}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

# Set up logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
def predict_protein_content(request):
    data = request.data
    try:
        # Collect input features for prediction
        input_data = [
            float(data['seawater_medium']),
            float(data['temperature']),
            float(data['pond_system']),
            float(data['aeration']),
            float(data['light_time']),
            float(data['bg11_medium']),
            float(data['salinity'])
        ]

        input_array = np.array([input_data])  # Convert the inputs into a numpy array

        # Load the saved model
        clf = joblib.load('decision_tree_model.joblib')

        # Predict using the model
        prediction = clf.predict(input_array)

        return Response({'prediction': prediction[0]})  # Return the prediction
    except KeyError as e:
        logger.error(f'Missing input feature: {str(e)}')
        return Response({'error': f'Missing input feature: {str(e)}'}, status=400)
    except ValueError as e:
        logger.error(f'Invalid input value: {str(e)}')
        return Response({'error': 'Invalid input value: {}'.format(str(e))}, status=400)
    except Exception as e:
        logger.error(f'Unexpected error: {str(e)}')
        return Response({'error': 'An unexpected error occurred: {}'.format(str(e))}, status=500)

logger = logging.getLogger(__name__)

class SendSMSView(APIView):
    def post(self, request):
        # Twilio credentials (defined in settings)
        account_sid = settings.TWILIO_ACCOUNT_SID
        auth_token = settings.TWILIO_AUTH_TOKEN
        from_phone = settings.TWILIO_PHONE_NUMBER
        to_phone = settings.TWILIO_PHONE_NUMBER_RECIPIENT  # Recipient's predefined phone number

        # Collect feedback and email from the request
        feedback = request.data.get('feedback')
        email = request.data.get('email')

        # Check if both feedback and email are provided
        if not feedback or not email:
            return Response({'error': 'Both feedback and email are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create a Twilio client
            client = Client(account_sid, auth_token)

            # Send the SMS with the feedback and email message
            message_body = f"Feedback From Spirulina:\nEmail: {email}\nFeedback: {feedback}"

            # Send the SMS
            message = client.messages.create(
                body=message_body,
                from_=from_phone,
                to=to_phone
            )

            return Response({'message': 'THANK YOU FOR YOUR VALUABLE FEEDBACK!'}, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f'Failed to send SMS: {str(e)}')
            return Response({'error': f'Failed to send SMS: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)