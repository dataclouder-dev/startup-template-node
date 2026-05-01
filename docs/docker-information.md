# Docker Configuration & Local Deployment

This guide covers everything related to the docker. 

## Fundamentals

#### Build it:

```bash
docker build -t startup-template-node:latest .
```

#### Run it:
** Usually only to test is working**

```bash
docker run -it --rm startup-template-node:latest
```


#### Run it with Credentials


```bash
docker run -d \
  --name startup-template-node-container \
  -p 7991:7991 \
  --env-file .env \
  -v $(pwd)/.cred/key-dev.json:/app/key.json:ro \
  -e GOOGLE_APPLICATION_CREDENTIALS=/app/key.json \
  startup-template-node:latest
```
