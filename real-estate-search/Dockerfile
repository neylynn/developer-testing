# Dockerfile

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Configure npm proxy if needed
# ENV NPM_CONFIG_PROXY http://your-proxy-url
# ENV NPM_CONFIG_HTTPS_PROXY http://your-https-proxy-url

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Expose port and start application
EXPOSE 3000
CMD ["npm", "run", "dev"]
