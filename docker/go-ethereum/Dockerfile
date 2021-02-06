FROM golang:alpine

LABEL mantainer="GSMLG <gsmlg.com@gmail.com>"

RUN apk update \
    && apk add git gcc musl-dev linux-headers

RUN go get -d github.com/ethereum/go-ethereum

RUN cd /go/src/github.com/ethereum/go-ethereum && go install ./...


# ENTRYPOINT ["/"]
