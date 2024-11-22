FROM alpine:3.20

LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="/docker/squid"
LABEL org.opencontainers.image.title="squid Proxy Server"
LABEL org.opencontainers.image.authors="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.description="squid Proxy Server running on top of alpine"
LABEL org.opencontainers.image.licenses=MIT
LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

ENV SQUID_WAIT=5

RUN apk add --no-cache curl squid

COPY squid.conf passwords /etc/squid/

EXPOSE 3128

COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]

