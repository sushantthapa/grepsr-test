# Use Node.js LTS
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src ./src

# Expose API port
EXPOSE 3000

# Start app
CMD ["node", "src/index.js"]

