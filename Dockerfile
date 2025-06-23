FROM node:18

# Install Puppeteer dependencies
RUN apt-get update && apt-get install -y \
  gconf-service \
  libasound2 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgcc1 \
  libgconf-2-4 \
  libgdk-pixbuf2.0-0 \
  libglib2.0-0 \
  libnspr4 \
  libnss3 \
  libpango-1.0-0 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxrandr2 \
  libxrender1 \
  libxtst6 \
  ca-certificates \
  fonts-liberation \
  libappindicator1 \
  lsb-release \
  xdg-utils \
  wget \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  libgbm1 \
  libxshmfence1

# Create a non-root user for Puppeteer
RUN useradd --create-home puppeteeruser
USER puppeteeruser

# Set working directory
WORKDIR /home/puppeteeruser/app

# Copy project files
COPY package.json ./
RUN npm install

COPY . .

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["node", "index.js"]