FROM node:5.4.0-slim

MAINTAINER Christian Le <christian@outcomes.com>

RUN mkdir -p /usr/src/app
ADD . /usr/src/app
WORKDIR /usr/src/app

RUN npm run slate
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
