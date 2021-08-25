FROM gsmlg/phoenix:alpine AS builder

ENV MIX_ENV=prod \
    NAME=gsmlg

COPY . /build

RUN apk update \
    && rm -rf /build/assets/node_modules /build/assets/_build /build/assets/deps \
    && cd /build/assets && ./yarn && ./yarn run build \
    && cd /build && mix do deps.get, compile \
    && mix distillery.release --env=prod \
    && mkdir /app \
    && tar zxvf "/build/_build/prod/rel/gsmlg/releases/$(grep version /build/mix.exs |awk -F'[\"]' '{print $2}')/gsmlg.tar.gz" -C /app \
    && rm -rf /var/cache/apk/*

FROM alpine:3.11

LABEL maintainer="GSMLG < me@gsmlg.org >"

ENV PORT=80 \
    REPLACE_OS_VARS=true \
    ERL_EPMD_PORT=4369 \
    NODE_NAME=gsmlg.org \
    POD_IP=127.0.0.1 \
    ERLCOOKIE=erlang_cookie

RUN apk update \
    && apk add openssl \
    && apk add bash \
    && rm -rf /var/cache/apk/*

COPY --from=builder /app /app

EXPOSE 80 4369

ENTRYPOINT ["/app/bin/gsmlg", "foreground"]

