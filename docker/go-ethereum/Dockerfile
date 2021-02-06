FROM golang:alpine

LABEL mantainer="GSMLG <gsmlg.com@gmail.com>"

ARG VERSION=v1.9.25

RUN apk update \
    && apk add git gcc musl-dev linux-headers

RUN GO111MODULE=on go get -d github.com/ethereum/go-ethereum@${VERSION}

RUN cd /go/src/github.com/ethereum/go-ethereum && go install ./...


# ENTRYPOINT ["/"]
