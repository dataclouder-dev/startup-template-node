# Stage 1: Build the application
FROM node:22-alpine AS builder
ARG VERSION
ARG GIT_HASH
LABEL stage="builder"
LABEL version=$VERSION
LABEL git_hash=$GIT_HASH

WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install -g pnpm && pnpm i

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN pnpm run build

# Stage 2: Production image
FROM node:22-alpine AS production
ARG VERSION
ARG GIT_HASH
LABEL stage="production"
LABEL version=$VERSION
LABEL git_hash=$GIT_HASH

WORKDIR /app

# Copy production dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules
# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Expose the application port
EXPOSE 3000

# Start the application
CMD [ "node", "dist/main.js" ]
