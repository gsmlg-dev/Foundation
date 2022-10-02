FROM alpine:3.16

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

ENV SQUID_WAIT=5

RUN apk add --no-cache curl squid

COPY squid.conf passwords /etc/squid/

EXPOSE 3128

COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]

