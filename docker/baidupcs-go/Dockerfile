FROM golang:alpine as builder

ARG VERSION=v3.9.5
ARG CGO_ENABLED=0
ENV GO111MODULE=on

COPY ./src /app

WORKDIR /app

RUN go mod tidy && go build -ldflags "-X main.Version=${VERSION} -s -w" -o baidupcs-go

FROM ghcr.io/gsmlg-dev/alpine:3.22

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

ARG VERSION=v3.9.5

ENV VERSION=$VERSION

COPY --from=builder /app/baidupcs-go /usr/local/bin/baidupcs-go

VOLUME ["/data"]

CMD ["-h"]
ENTRYPOINT ["/usr/local/bin/baidupcs-go"]

