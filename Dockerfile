FROM node:5.5.0

MAINTAINER Christian Le <christian@outcomes.com>

# Copy over app
RUN mkdir -p /usr/src/app
ADD . /usr/src/app

# Set working directory for app
WORKDIR /usr/src/app

# Install npm packages
RUN npm install
RUN npm rebuild node-sass

# Expose port 3000 for app
EXPOSE 3000

# Start node app
CMD [ "npm", "start" ]
