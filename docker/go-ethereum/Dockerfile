FROM golang:alpine as builder

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

ARG VERSION=v1.9.25
ARG GO111MODULE=on
ARG CGO_ENABLED=0

RUN apk add --update git curl make gcc musl-dev linux-headers \
  && curl -sL https://github.com/ethereum/go-ethereum/archive/refs/tags/${VERSION}.tar.gz -o /archive.tar.gz \
  && mkdir /src \
  && tar zxf /archive.tar.gz --strip-components=1 -C /src \
  && cd /src && make all

FROM alpine:3.16

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL VERSION="$VERSION"

COPY --from=builder /src/build/bin /usr/local/bin

CMD ["geth"]
