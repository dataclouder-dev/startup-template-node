## Description

Scaffolding de dataclouder Nest API

The main porpuse of this project is used as template to accelerate backend of the dataclouder frontend template.

- Is highly attached to google cloud services, but removing modules you get rid of everything.

### How to get starting

suposing you know how to run the project.

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
