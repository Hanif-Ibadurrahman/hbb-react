FROM node:16.13.2-alpine as build-stage
WORKDIR /app
COPY yarn.lock ./
COPY package.json ./
RUN yarn
COPY ./ ./
RUN yarn build

FROM nginx:1.19 as production-stage
WORKDIR /app
RUN rm -rf ./*
COPY --from=build-stage /app/build ./
COPY site.conf /etc/nginx/nginx.conf
