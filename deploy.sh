#!/bin/bash

# Set variables
PROJECT_ID="my project id"
IMAGE_NAME="my-node-test"
REGION="us-central1" # e.g., us-central1
SERVICE_NAME="node-test"


echo reading .env file
ENV_VARS=$(node env_parser.js)

# Now you can use ENV_VARS

echo "$ENV_VARS"

# Example of how you might use it

# Authenticate with Google Cloud
# gcloud auth login

# Set the project
# gcloud config set project $PROJECT_ID

# Enable required services
# gcloud services enable run.googleapis.com
# gcloud services enable cloudbuild.googleapis.com

# Build the Docker image and push to Google Container Registry
gcloud builds submit --tag gcr.io/$PROJECT_ID/$IMAGE_NAME .

# # Deploy to Cloud Run
gcloud run deploy $SERVICE_NAME --image gcr.io/$PROJECT_ID/$IMAGE_NAME --platform managed --region $REGION --allow-unauthenticated --set-env-vars $ENV_VARS

# echo "Deployment complete. You can check the status using 'gcloud run services describe $SERVICE_NAME --region $REGION'."



