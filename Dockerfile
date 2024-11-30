# Dockerfile
# Use the official Node.js image for version 16.20.2 as the base image
FROM node:16.20.2
LABEL authors="hoangky"

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to start the application
CMD ["npm", "start", "${NODE_ENV:-start}"]
