FROM golang:alpine as builder

ARG CGO_ENABLED=0

COPY log_forwarder.go /go

RUN  go build -o log-forwarder log_forwarder.go

FROM scratch

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

ENV ADDR=127.0.0.1 \
  PORT=3396 \
  TARGET="http://couch:couch@couch1.log-target.dev:5984/web-log"
ENV SILENT 

COPY --from=builder /go/log-forwarder /log-forwarder

ENTRYPOINT [ "/log-forwarder" ]
