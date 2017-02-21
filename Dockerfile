FROM node:7.5.0-slim

MAINTAINER Christian Le <cle1994> (hi@christianle.com)

# Install Yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Copy over app
RUN mkdir -p /usr/src/app
ADD . /usr/src/app

# Set working directory for app
WORKDIR /usr/src/app

# Remove node_modules
RUN rm -rf node_modules

# Install npm packages
RUN yarn install
RUN npm run build

# Expose port 3000 for app
EXPOSE 3000

# Start node app
CMD [ "npm", "start" ]

