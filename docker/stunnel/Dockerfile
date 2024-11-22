FROM alpine:3.20

LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="/docker/stunnel"
LABEL org.opencontainers.image.title="stunnel"
LABEL org.opencontainers.image.authors="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.description="stunnel running on top of alpine"
LABEL org.opencontainers.image.licenses=MIT
LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

ENV PROXY_MODE=master \
    PROXY_SERVER="" \
    PROXY_TARGET="localhost:3128" \
    VERIFY_CHAIN="no" \
    PRIVATE_KEY=/etc/stunnel/pkey.pem \
    CERTIFICATE=/etc/stunnel/cert.pem

RUN apk update \
    && apk add curl \
    && apk add stunnel \
    && rm -rf /var/cache/apk/*

COPY pkey.pem cert.pem /etc/stunnel/

EXPOSE 80 443

COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]
