### Makefile

this contains some comands

make docker-build: creates the image. make docker-run: run the last image but passing the credencials locally,

Note the building process a clean image will need credentials, and variables. but run uses the default.

### deploy to container register

make push-ghcr will not include your credentials in the image.

.dockerignore Exclusion: Your .dockerignore file explicitly excludes .env, .env.\*, and the .cred directory. This means these files are never even sent to the Docker daemon during the build process, so they cannot be accidentally included in any laye

### How to deploy a copy

1. You need your config for credencials in frontend.
2. You need your environment variables and .cred.
3. you must have it in the same folder.
4. run the composer.
