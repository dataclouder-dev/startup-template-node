# Stage 1: Build the application
FROM node:22-alpine AS builder
ARG VERSION
ARG GIT_HASH
LABEL stage="builder"
LABEL version=$VERSION
LABEL git_hash=$GIT_HASH

WORKDIR /app

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV PNPM_CONFIG_STRICT_DEP_BUILDS=false
ENV PNPM_CONFIG_VERIFY_DEPS_BEFORE_RUN=false

RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm install --frozen-lockfile

# Copy the rest of the application source code (including libs/nest-dataclouder submodule)
COPY . .

# Build the application for production
RUN pnpm run build

# Remove development dependencies to keep the image small
RUN pnpm prune --prod

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

# Create credentials directory
RUN mkdir -p /app/.cred

# Expose the application port
EXPOSE 7991

# Start the application
CMD [ "node", "dist/main.js" ]
