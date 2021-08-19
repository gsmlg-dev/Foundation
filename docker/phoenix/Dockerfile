FROM elixir:1.12.2-alpine

ARG PHOENIX_VERSION="1.5"

LABEL mantainer="GSMLG <gsmlg.com@gmail.com>"

LABEL PHOENIX_VERSION="${PHOENIX_VERSION}"

RUN apk update \
    && apk add make \
    && apk add bash \
    && mix local.rebar --force \
    && mix local.hex --force \
    && mix archive.install --force hex phx_new ${PHOENIX_VERSION} \
    && rm -rf /var/cache/apk/*


ENTRYPOINT ["/bin/sh"]
