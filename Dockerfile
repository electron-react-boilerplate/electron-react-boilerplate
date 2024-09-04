# Build the application and this project requires Node.js 14 and above
FROM node:14-slim AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose port (1212 is the default port of this project)
EXPOSE 1212

# Command to run the application
CMD ["npm", "start"]
