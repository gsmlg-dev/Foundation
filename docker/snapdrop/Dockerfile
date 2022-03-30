FROM node:lts-alpine

WORKDIR /snapdrop

COPY ./server /snapdrop
COPY ./entrypoint.sh /entrypoint.sh

RUN apk update \
    && apk add nginx \
    && apk add nginx-mod-http-headers-more \
    && ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log \
    && npm install \
    && rm -rf /usr/share/nginx/html \
    && chmod +x /entrypoint.sh \
    && rm -rf /var/cache/apk/*

COPY ./nginx.conf /etc/nginx/http.d/default.conf
COPY ./client /usr/share/nginx/html

ENTRYPOINT /entrypoint.sh
