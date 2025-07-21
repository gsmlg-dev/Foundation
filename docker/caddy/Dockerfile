FROM caddy:builder-alpine AS builder

ARG CADDY_VERSION
ARG CADDY_WITH
ARG USER
ARG TOKEN
ARG GOPRIVATE=github.com/gsmlg-dev/gsmlg-golang
ARG CGO_ENABLED=0
ARG XCADDY_DEBUG=1

RUN git config --global url."https://${USER}:${TOKEN}@github.com".insteadOf "https://github.com"

RUN xcaddy build ${CADDY_VERSION} ${CADDY_WITH}

FROM caddy:alpine

COPY --from=builder /usr/bin/caddy /usr/bin/caddy

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL caddy_version=${CADDY_VERSION}

WORKDIR "/srv"

VOLUME ["/data", "/config", "/srv", "/etc/caddy/Caddyfile"]
