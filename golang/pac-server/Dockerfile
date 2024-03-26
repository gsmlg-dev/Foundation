FROM golang:alpine as builder

ENV GO111MODULE=on

COPY ./ /app

WORKDIR /app

RUN apk add --no-cache --update make curl \
    && make download && make build

FROM alpine:latest

ARG DATE

ENV BUILD_DATE=$DATE

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL description="A simple PAC server"
LABEL builddate="$DATE"

COPY --from=builder /app/pac-server /bin/pac-server

CMD ["-s", "PROXY 127.0.0.1:3128", "-h", ":1080"]
ENTRYPOINT ["/bin/pac-server"]

