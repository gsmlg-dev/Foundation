FROM alpine:3.20

LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="/docker/unbound"
LABEL org.opencontainers.image.title="unbound DNS server"
LABEL org.opencontainers.image.authors="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.description="unbound DNS server running on top of alpine"
LABEL org.opencontainers.image.licenses=MIT
LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

RUN apk update \
    && apk add ca-certificates knot-utils unbound \
    && rm -rf /var/cache/apk/*

EXPOSE 53 853 8953

ENTRYPOINT ["/usr/sbin/unbound", "-d"]

VOLUME ["/etc/unbound/"]
