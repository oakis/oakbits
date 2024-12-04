# Use the official Node.js image as the base
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Set environment variable from build arguments
ARG APIKEY
ENV APIKEY=$APIKEY
ARG COOKIE
ENV COOKIE=$COOKIE
ARG NEXT_PUBLIC_DATADOG_APPID
ENV NEXT_PUBLIC_DATADOG_APPID=$NEXT_PUBLIC_DATADOG_APPID
ARG NEXT_PUBLIC_DATADOG_TOKEN
ENV NEXT_PUBLIC_DATADOG_TOKEN=$NEXT_PUBLIC_DATADOG_TOKEN

# Build the Next.js application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
