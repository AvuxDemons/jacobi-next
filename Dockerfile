# Use the official Node.js 18 image as a base
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Run the Next.js app in production mode
CMD ["npm", "run", "start"]
