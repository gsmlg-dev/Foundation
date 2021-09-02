FROM alpine:3.14

LABEL mantainer="GSMLG <gsmlg.com@gmail.com>"

RUN apk update \
    && apk add curl ca-certificates jq \
    && rm -rf /var/cache/apk/*

ENTRYPOINT ["/usr/bin/curl"]
