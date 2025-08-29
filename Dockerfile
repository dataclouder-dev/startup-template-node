FROM node:22 AS build
WORKDIR /usr/src/app
COPY . .
RUN npm ci --force
RUN npm run build
# Copy all files except dockerignore install all dependencies including dev to install properly with nest cli
# main purpose is to run npm run and get dist folder


FROM node:22 AS build_node_modules
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY . .
RUN npm ci --legacy-peer-deps --only=production
# here is to get node modules not dev dependencies


# Copy dist folder and node_modules to production image
FROM node:22-alpine AS production
ENV NODE_ENV=production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build_node_modules /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app/dist
COPY --chown=node:node --from=build /usr/src/app/public /usr/src/app/public

CMD [ "node", "dist/main.js" ]
