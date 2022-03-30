ARG CADDY_VERSION="2.4.6"
FROM caddy:${CADDY_VERSION}-builder AS builder

ARG USER
ARG TOKEN

RUN echo "machine github.com login ${USER} password ${TOKEN}" > $HOME/.netrc \
  && XCADDY_DEBUG=1 xcaddy build \
    --with github.com/mholt/caddy-l4 \
    --with github.com/caddy-dns/cloudflare \
    --with github.com/caddy-dns/route53 \
    --with github.com/caddy-dns/vultr \
    --with github.com/gsmlg-dev/caddy-dns-zdns \
    --with github.com/mholt/caddy-webdav


FROM caddy:${CADDY_VERSION}

COPY --from=builder /usr/bin/caddy /usr/bin/caddy

WORKDIR "/srv"

VOLUME ["/data", "/config", "/srv", "/etc/caddy/Caddyfile"]
