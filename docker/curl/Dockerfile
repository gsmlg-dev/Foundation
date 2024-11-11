FROM alpine:3.20

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="docker/curl"

RUN apk add --no-cache curl ca-certificates jq minio-client

ENTRYPOINT ["/usr/bin/curl"]
