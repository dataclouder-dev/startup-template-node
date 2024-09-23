FROM node:20 AS build
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build
# Copy all files except dockerignore install all dependencies including dev to install properly with nest cli
# main purpose is to run npm run and get dist folder


FROM node:20 AS build_node_modules
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY . .
RUN npm ci --only=production
# here is to get node modules not dev dependencies


# Copy dist folder and node_modules to production image
FROM node:20-alpine AS production
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build_node_modules /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app/dist
# only for local test copy .env and .credentials to add variables
# COPY --chown=node:node --from=build /usr/src/app/.env /usr/src/app/.env
# COPY --chown=node:node --from=build /usr/src/app/.credentials /usr/src/app/.credentials
CMD [ "node", "dist/main.js" ]
