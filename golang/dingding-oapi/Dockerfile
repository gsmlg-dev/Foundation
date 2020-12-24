FROM golang:alpine as builder

COPY main.go /go

RUN CGO_ENABLED=0 go build -o ding main.go

FROM alpine

LABEL maintainer="GSMLG <me@gsmlg.org>"

ENV access_token="<Your Access Token>" \
    secret="<Your Secret>"

RUN apk add ca-certificates

COPY --from=builder /go/ding /ding

ENTRYPOINT [ "/ding" ]

