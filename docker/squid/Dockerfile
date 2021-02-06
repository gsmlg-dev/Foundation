FROM alpine:3.12

LABEL mantainer="GSMLG <gsmlg.com@gmail.com>"

ENV SQUID_WAIT=5

RUN apk update \
    && apk add curl \
    && apk add squid \
    && rm -rf /var/cache/apk/*

COPY squid.conf passwords.key /etc/squid/

EXPOSE 3128

COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]

