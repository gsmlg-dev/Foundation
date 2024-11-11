FROM varnish:alpine

ARG BUILD_DATE

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="docker/varnish"
LABEL org.opencontainers.image.title="Varnish"
LABEL org.opencontainers.image.description="Varnish is a web application accelerator also known as a caching HTTP reverse proxy."
LABEL org.opencontainers.image.documentation="https://varnish-cache.org/docs/"
LABEL org.opencontainers.image.url="https://varnish-cache.org/"
LABEL org.opencontainers.image.build-date=${BUILD_DATE}

ENV VARNISH_SIZE=1G

COPY default.vcl /etc/varnish/

