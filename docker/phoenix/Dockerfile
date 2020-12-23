FROM elixir:1.11-alpine

MAINTAINER GSMLG <me@gsmlg.org>

RUN apk update \
    && apk add make \
    && apk add bash \
    && mix local.rebar --force \
    && mix local.hex --force \
    && mix archive.install --force hex phx_new \
    && apk add nodejs \
    && apk add git \
    && rm -rf /var/cache/apk/*


ENTRYPOINT ["/bin/sh"]
