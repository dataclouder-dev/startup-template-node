## Description

Scaffolding de dataclouder Nest API The main porpuse of this project is used as template to accelerate backend of the dataclouder frontend template.

- Is highly attached to google cloud services, but removing modules you get rid of everything.

### How to get starting

Suposing you know how to run the project.

- Adapt the user model.
- check the .env.example, remove the .example from name file and add environment variables
- Add google cloud credentials, create new folder called .cred.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Remove Modules.

If you dont need a module, remove it, deleting the folder and the import from the app.module.ts file.

### How to deploy

highly recommended doble check is working on local. that means your variables env are working. Hidhly recommended check that docker is working locally.

#### How run run docker locally?

    docker build -t dataclouder-node-server .
    docker run -p 8080:8080 dataclouder-node-server

WIP set .env first it should take the id for the project

is important to run script inside the folder becouse the relative paths.

`cd deploy_scripts`

Run deploy.sh

Will automate all the process, enable apis and set variables

#### Current flow for deploy

1. make sure you have access to the account you want to deploy

`gcloud auth login`

2. make sure you already enable services needed. check script

3. Change variables in script to add the project id

4. run script and wait untuil deploy is already served

### Manual deploy

gcloud builds submit --tag gcr.io/$PROJECT_ID/$IMAGE_NAME ../.

gcloud run deploy $SERVICE_NAME --image gcr.io/$PROJECT_ID/$IMAGE_NAME --platform managed --region $REGION --allow-unauthenticated

### Example Deploy

gcloud builds submit --tag gcr.io/dataclouder-dev/node-app-image .

gcloud run deploy node-web-service --image gcr.io/dataclouder-dev/node-app-image --platform managed --region us-central1 --allow-unauthenticated
