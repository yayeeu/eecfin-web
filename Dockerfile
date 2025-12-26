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

# Start the app in development mode with hot reloading
#CMD ["npm", "run", "dev", "--", "--host"]
#CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8080"]
CMD ["npm", "run", "dev"]

