FROM caddy:builder-alpine AS builder

ARG CADDY_VERSION
ARG CADDY_WITH
ARG USER
ARG TOKEN

RUN echo "machine github.com login ${USER} password ${TOKEN}" > $HOME/.netrc \
  && XCADDY_DEBUG=1 xcaddy build ${CADDY_VERSION} ${CADDY_WITH}


FROM caddy:alpine

COPY --from=builder /usr/bin/caddy /usr/bin/caddy

WORKDIR "/srv"

VOLUME ["/data", "/config", "/srv", "/etc/caddy/Caddyfile"]
