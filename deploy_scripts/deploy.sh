#!/bin/bash

# Set variables
PROJECT_ID="dataclouder-dev"
IMAGE_NAME="node-app-image"
REGION="us-central1" # e.g., us-central1
SERVICE_NAME="node-web-service"


# Example of how you might use it

# Authenticate with Google Cloud
# gcloud auth login

# Set the project
gcloud config set project $PROJECT_ID

# # Enable required services
echo "Enabling required services if not already enabled..."
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# # Build the Docker image and push to Google Container Registry
gcloud builds submit --tag gcr.io/$PROJECT_ID/$IMAGE_NAME ../.


echo clonning variables .env for cloud run
ENV_VARS=$(node env_parser.js) # No me acuerdo para que hacia esto. creo que queria automazar el ids salieran del archivo .env
echo "$ENV_VARS" # Now you can use ENV_VARS, es para que las variables de entorno se pasen al cloud run y esten habilidadas desde el inicio.

# # Deploy to Cloud Run
gcloud run deploy $SERVICE_NAME --image gcr.io/$PROJECT_ID/$IMAGE_NAME --platform managed --region $REGION --allow-unauthenticated --set-env-vars $ENV_VARS

echo "Deployment complete. You can check the status using 'gcloud run services describe $SERVICE_NAME --region $REGION'."



