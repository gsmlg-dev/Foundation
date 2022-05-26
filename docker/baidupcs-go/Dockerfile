FROM golang:alpine as builder

ARG VERSION=v3.8.7
ENV GO111MODULE=on

COPY ./src /app

WORKDIR /app

RUN go build -ldflags "-X main.Version=${VERSION} -s -w" -o baidupcs-go

FROM alpine:3.14

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

ARG VERSION=v3.8.7

ENV VERSION=$VERSION

COPY --from=builder /app/baidupcs-go /usr/local/bin/baidupcs-go

RUN apk add --update bash curl jq

VOLUME ["/data"]

CMD ["-h"]
ENTRYPOINT ["/usr/local/bin/baidupcs-go"]

