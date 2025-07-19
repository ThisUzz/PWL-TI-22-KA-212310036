# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.13.1
FROM node:${NODE_VERSION}-slim AS builder
WORKDIR /app

# Install dependencies using npm ci for deterministic builds
COPY --link package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the application source
COPY --link public ./public
COPY --link src ./src
COPY --link tailwind.config.js ./

# Build the React app for production
RUN --mount=type=cache,target=/root/.npm \
    npm run build

# --- Production image ---
FROM node:${NODE_VERSION}-slim AS final
WORKDIR /app

# Create a non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Copy only the build output and minimal files needed to serve
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

# Install a minimal HTTP server to serve the static files
RUN --mount=type=cache,target=/root/.npm \
    npm install -g serve

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

USER appuser
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
