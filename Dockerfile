FROM node:16.15.1-alpine as build-stage
ARG REACT_APP_PUBLIC_URL
ARG REACT_APP_API_URL
WORKDIR /app
RUN apk update \
    && apk add bash
# COPY yarn.lock ./
COPY package*.json ./
# RUN yarn install --verbose
RUN npm ci
COPY ./ ./
ENV REACT_APP_API_URL ${REACT_APP_API_URL}
ENV REACT_APP_PUBLIC_URL ${REACT_APP_PUBLIC_URL}
RUN npm run build --verbose
RUN ["chmod", "+x", "start.sh"]
RUN ./start.sh
FROM nginx:1.19 as production-stage
WORKDIR /app
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY site.conf /etc/nginx/nginx.conf

