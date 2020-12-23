FROM alpine:3.10

MAINTAINER GSMLG < me@gsmlg.org >

RUN apk update \
    && apk add nginx \
    && apk add nginx-mod-http-headers-more \
    && mkdir /etc/nginx/sites \
    && rm /etc/nginx/conf.d/default.conf \
    && rm -rf /var/cache/apk/*

EXPOSE 80

COPY nginx.conf /etc/nginx/

ENTRYPOINT ["/usr/sbin/nginx"]
