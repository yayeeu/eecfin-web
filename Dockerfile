FROM node:20.11.1-alpine

# Set working directory
WORKDIR /app

# Accept port as build argument with default
ARG PORT=8082
ENV PORT=${PORT}

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Expose the port from environment variable
EXPOSE ${PORT}

# Sync node_modules on each start (bind mount keeps a stale anonymous volume otherwise)
ENTRYPOINT ["/bin/sh", "/app/docker-entrypoint.sh"]
CMD ["npm", "run", "dev"]

