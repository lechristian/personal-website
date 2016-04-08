FROM node:5.10.0-slim

MAINTAINER Christian Le <christian@outcomes.com>

# Copy over app
RUN mkdir -p /usr/src/app
ADD . /usr/src/app

# Set working directory for app
WORKDIR /usr/src/app

# Remove node modules
RUN rm -rf ./node_modules
RUN ls

# Install npm packages
RUN npm install
RUN npm rebuild node-sass
RUN npm run build

# Expose port 3000 for app
EXPOSE 3000

# Start node app
CMD [ "npm", "start" ]
