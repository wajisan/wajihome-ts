FROM node:18-alpine3.15
WORKDIR /usr/src/app
COPY package*.json ./
COPY cert ./
RUN apk update && apk add bash
RUN npm install
EXPOSE 9856
