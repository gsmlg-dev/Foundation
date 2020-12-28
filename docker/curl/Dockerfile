FROM alpine:3.12

MAINTAINER GSMLG <me@gsmlg.org>

RUN apk update \
    && apk add curl ca-certificates \
    && rm -rf /var/cache/apk/*

ENTRYPOINT ["/usr/bin/curl"]
