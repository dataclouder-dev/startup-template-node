# Dataclouder Template Node Backend 🤖

This repository is the main backend for the startup template. For reference implementations, check out our other templates:

- [DataClouder Angular Template](https://github.com/dataclouder-dev/startup-template-angular)
- [DataClouder Node Template](https://github.com/dataclouder-dev/startup-template-node)

## Description 📝

A NestJS-based backend API template designed to power AI learning and conversation applications. This project serves as the backend infrastructure for an interactive platform that demonstrates advanced AI conversation features and Ionic mobile development.

🎯 Key Features:

- AI conversation management
- Google Cloud Services integration
- Scalable architecture for learning applications
- Ready-to-use authentication system

> 💡 Note: While the project is tightly integrated with Google Cloud services, these modules can be easily removed if not needed.

## Getting Started 🚀

Clone the Project git clone https://github.com/dataclouder-dev/startup-template-node [your-project-name] or use the button on github right top corner CREATE TEMPLATE

## ✅ Prerequisites

- node >= 22.0.0
- Make >= 3.0.0 (Optional but highly recommended)
- Docker (Optional)
- Google Cloud credentials and environment variables
- MongoDB credentials

### Initial Setup

1. Clone the repository
2. Configure your environment:
   - Copy `.env.example` to `.env`
   - Add your environment variables
   - Create `.cred` folder and add Google Cloud credentials
3. Customize the user model for your needs

## Development 💻

### Install Dependencies

```bash
npm install
```

### Run the Project

```bash
# Development mode
npm run start

# Watch mode (recommended for development)
npm run start:dev

# Production mode
npm run start:prod
```

### Testing 🧪

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2d

# Test coverage
npm run test:cov
```

## Customization 🛠️

## User and Firebase

You can handle users easialy, create google credentials, for Gcp service, firebase included, and save in .cred/keys.json, check .env.example for variables you may need.

GOOGLE_APPLICATION_CREDENTIALS=./.cred/keys.json

### Module Management

You can remove unnecessary modules by:

1. Deleting the module folder
2. Removing the import from `app.module.ts`

## Deployment 🌐

### Local Docker Testing

Before deploying, test locally with Docker:

```bash
docker build -t dc-template-node .
docker run -p 8080:8080 --env-file ./.env dc-template-node
```

### Cloud Deployment

#### Manual Deployment Steps

1. Authenticate with Google Cloud:

   ```bash
   gcloud auth login
   ```

2. Submit the build: i recommend use the make commands i created to automate, but you can use manual gcloud commands if you have the knowledge.

- First set environments in makefile or .env, you can leave IMAGE_NAME, REGION, SERVICE_NAME, but PROJECT_ID is uniqui to your project

  ```bash
  make gcp-enable-services # will ask to enable bill on GCP this is required to deploy
  make build-push #
  make deploy-service
  ```

3. Next time you can just run:

   ```bash
   make deploy
   ```

### Automated Deployment With Cloud Build

Note: before try to automate the deployment, i highly recommend do one manual deployment to check if everything is working. specially becouse for every cloud run service, variables need to be set first time, consicutive times no need.

1. Fork the repository
2. Go to cloud build and create a new trigger
3. Grant github access, select the repository and accept conditions
4. Add seetings for the trigger to your needs
5. Optional: Add permissions to the service account, Logs Writer, Cloud Run Admin or log only default logs
6. Add the repository in artifact registry (recommended add policies to remove old versions)

### Example Deployment Command

```bash
gcloud builds submit --tag gcr.io/ai-learning-dev/node-app-image .
gcloud run deploy ai-learning-service \
  --image gcr.io/ai-learning-dev/node-app-image \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Clone and Reuse template for new projects

```bash
git clone https://github.com/adamofig/dataclouder-template-node [new-project-name]
cd [new-project-name]
npm install
```

### Unistall what you don't need

```bash
npm uninstall @dataclouder/conversation-card-nestjs @dataclouder/lessons-nestjs @dataclouder/storage-uploader
```

remove module from app module. you are ready to go.

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

MIT License
