FROM alpine:3.14

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

ENV SQUID_WAIT=5

RUN apk update \
    && apk add curl \
    && apk add squid \
    && rm -rf /var/cache/apk/*

COPY squid.conf passwords /etc/squid/

EXPOSE 3128

COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]

