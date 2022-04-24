FROM golang:alpine

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

ARG VERSION=v1.9.25
ENV GO111MODULE=on

RUN apk update \
    && apk add git gcc musl-dev linux-headers

RUN go get -d github.com/ethereum/go-ethereum@${VERSION}

RUN cd /go/pkg/mod/github.com/ethereum/go-ethereum@${VERSION} && go install ./...

