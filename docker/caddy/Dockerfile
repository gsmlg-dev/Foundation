FROM caddy:builder-alpine AS builder

ARG CADDY_VERSION
ARG CADDY_WITH
ARG USER
ARG TOKEN
ARG GOPRIVATE
ARG CGO_ENABLED
ARG XCADDY_GO_BUILD_FLAGS="-ldflags \"-w -s -X github.com/gsmlg-dev/caddy-admin-ui.compileUnixTime=$(date +%s)\""

RUN git config --global url."https://${USER}:${TOKEN}@github.com".insteadOf "https://github.com" \
  && XCADDY_DEBUG=1 xcaddy build ${CADDY_VERSION} ${CADDY_WITH}

FROM caddy:alpine

COPY --from=builder /usr/bin/caddy /usr/bin/caddy

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

WORKDIR "/srv"

VOLUME ["/data", "/config", "/srv", "/etc/caddy/Caddyfile"]
