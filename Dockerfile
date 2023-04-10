FROM node:16.15.1-alpine as build-stage
ARG APP_ENV
WORKDIR /app
RUN apk update \
    && apk add bash
COPY yarn.lock ./
COPY package.json ./
RUN yarn install
COPY ./ ./
RUN yarn build

FROM nginx:1.19 as production-stage
WORKDIR /app
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY site.conf /etc/nginx/nginx.conf
