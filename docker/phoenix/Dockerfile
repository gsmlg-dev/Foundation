FROM elixir:1.11-alpine

LABEL mantainer="GSMLG <gsmlg.com@gmail.com>"

RUN apk update \
    && apk add make \
    && apk add bash \
    && mix local.rebar --force \
    && mix local.hex --force \
    && mix archive.install --force hex phx_new \
    && rm -rf /var/cache/apk/*


ENTRYPOINT ["/bin/sh"]
