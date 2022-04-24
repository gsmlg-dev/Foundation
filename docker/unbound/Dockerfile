FROM alpine:3.14

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

RUN apk update \
    && apk add ca-certificates knot-utils unbound \
    && rm -rf /var/cache/apk/*

EXPOSE 53 853 8953

ENTRYPOINT ["/usr/sbin/unbound", "-d"]

VOLUME ["/etc/unbound/"]
