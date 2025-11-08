# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Expose port 5000 (the same as in server.js/.env)
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start"]
