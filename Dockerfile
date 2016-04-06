FROM node:5.10.0-slim

MAINTAINER Christian Le <christian@outcomes.com>

RUN mkdir -p /usr/src/app
ADD . /usr/src/app
WORKDIR /usr/src/app

EXPOSE 3000

CMD [ "npm", "start" ]
