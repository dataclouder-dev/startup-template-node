# Dataclouder Template Node Backend 🤖

Warning: Work in progress, not ready for production.

## Description 📝

A NestJS-based backend API template designed to power AI learning and conversation applications. This project serves as the backend infrastructure for an interactive platform that demonstrates advanced AI conversation features and Ionic mobile development.

🎯 Key Features:

- AI conversation management
- Google Cloud Services integration
- Scalable architecture for learning applications
- Ready-to-use authentication system

> 💡 Note: While the project is tightly integrated with Google Cloud services, these modules can be easily removed if not needed.

## Getting Started 🚀

### Prerequisites

- Node.js installed
- Google Cloud account (for cloud features)
- Basic knowledge of NestJS

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

### Module Management

You can remove unnecessary modules by:

1. Deleting the module folder
2. Removing the import from `app.module.ts`

## Deployment 🌐

### Local Docker Testing

Before deploying, test locally with Docker:

```bash
docker build -t ai-learning-backend .
docker run -p 8080:8080 ai-learning-backend
```

### Cloud Deployment

#### Automated Deployment

1. Navigate to deploy scripts:
   ```bash
   cd deploy_scripts
   ```
2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

#### Manual Deployment Steps

1. Authenticate with Google Cloud:

   ```bash
   gcloud auth login
   ```

2. Submit the build:

   ```bash
   gcloud builds submit --tag gcr.io/$PROJECT_ID/$IMAGE_NAME
   ```

3. Deploy to Cloud Run:
   ```bash
   gcloud run deploy $SERVICE_NAME \
     --image gcr.io/$PROJECT_ID/$IMAGE_NAME \
     --platform managed \
     --region $REGION \
     --allow-unauthenticated
   ```

### Automated Deployment With Cloud Build

Pending...

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

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

MIT License
