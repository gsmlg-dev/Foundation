FROM golang:alpine as builder

ARG VERSION=v3.9.5
ARG CGO_ENABLED=0
ENV GO111MODULE=on

COPY ./src /app

WORKDIR /app

RUN go build -ldflags "-X main.Version=${VERSION} -s -w" -o baidupcs-go

FROM alpine:3.20

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

ARG VERSION=v3.9.5

ENV VERSION=$VERSION

COPY --from=builder /app/baidupcs-go /usr/local/bin/baidupcs-go

RUN apk add --update bash curl jq aria2

VOLUME ["/data"]

CMD ["-h"]
ENTRYPOINT ["/usr/local/bin/baidupcs-go"]

