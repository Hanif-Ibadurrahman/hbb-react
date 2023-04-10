FROM node:16.15.1-alpine as build-stage
ARG APP_ENV
WORKDIR /app
RUN apk update \
    && apk add bash
COPY yarn.lock ./
COPY package.json ./
RUN yarn
COPY ./ ./
RUN ["chmod", "+x", "start.sh"]
RUN ./start.sh

FROM nginx:1.19 as production-stage
WORKDIR /app
RUN rm -rf ./*
COPY --from=build-stage /app/build ./
COPY site.conf /etc/nginx/nginx.conf
