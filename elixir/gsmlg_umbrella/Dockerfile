FROM gsmlg/phoenix:alpine AS builder

ARG MIX_ENV=prod
ARG NAME=gsmlg
ARG RELEASE_VERSION=0.1.0
ARG WEB_VERSION=1.15.1

COPY . /build

WORKDIR /build

RUN apk update && apk add curl jq git npm \
    && mix do deps.get, compile \
    && cd apps/gsmlg_web && npm install --prefix assets && mix assets.deploy && cd ../.. \
    && curl -Lf "https://registry.npmjs.org/@gsmlg/website/-/website-${WEB_VERSION}.tgz" -o website.tgz \
    && tar xzf website.tgz --strip-components=2 -C apps/gsmlg_web/priv/static \
    && mix release gsmlg_umbrella \
    && cp -r _build/prod/rel/gsmlg_umbrella /app


FROM alpine:3.14

ARG RELEASE_VERSION=0.1.0

LABEL maintainer="GSMLG <gsmlg.com@gmail.com>"
LABEL RELEASE_VERSION="${RELEASE_VERSION}"

ENV PORT=80 \
    REPLACE_OS_VARS=true \
    ERL_EPMD_PORT=4369 \
    POD_IP=127.0.0.1 \
    ERLCOOKIE=erlang_cookie \
    HOST=gsmlg.com \
    HOST_PORT=80 \
    DATABASE_URL=ecto://USER:PASS@HOST/DATABASE \
    POOL_SIZE=10 \
    SECRET_KEY_BASE=gsmlg_umbrella

RUN apk update \
    && apk add openssl bash libstdc++ \
    && rm -rf /var/cache/apk/*

COPY --from=builder /app /app

EXPOSE 80 4369

CMD ["/app/bin/gsmlg_umbrella", "start"]
