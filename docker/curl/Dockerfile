FROM alpine:3.20

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

RUN apk add --no-cache curl ca-certificates jq

RUN curl https://dl.min.io/client/mc/release/linux-$(if [ "x86_64" == "$(arch)" ] ; then echo amd64; else echo arm64; fi)/mc -o /usr/local/bin/mc \
  && chmod +x /usr/local/bin/mc

ENTRYPOINT ["/usr/bin/curl"]
