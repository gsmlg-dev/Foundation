FROM alpine:3.14

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

RUN apk update \
    && apk add nginx \
    && apk add nginx-mod-http-headers-more \
    && mkdir /etc/nginx/sites \
    && rm /etc/nginx/http.d/default.conf \
    && ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log \
    && rm -rf /var/cache/apk/*

EXPOSE 80

COPY nginx.conf /etc/nginx/

ENTRYPOINT ["/usr/sbin/nginx"]
