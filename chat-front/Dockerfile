# Use an official Node.js LTS runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Install serve to serve the React app
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "build"]
