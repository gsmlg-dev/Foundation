FROM alpine:3.20

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

ENV PROXY_UPSTREAM=socksproxy:9050

RUN apk add --no-cache curl tinyproxy

COPY tinyproxy.conf /etc/tinyproxy.conf

EXPOSE 8888

CMD [ "-d", "-c", "/etc/tinyproxy.conf"]
ENTRYPOINT ["/usr/bin/tinyproxy"]
