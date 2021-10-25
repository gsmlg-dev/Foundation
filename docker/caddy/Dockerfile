ARG CADDY_VERSION="2.4.5"
FROM caddy:${CADDY_VERSION}-builder AS builder

RUN xcaddy build \
    --with github.com/caddy-dns/cloudflare \
    --with github.com/caddy-dns/route53 \
    --with github.com/caddy-dns/vultr \
    --with github.com/mholt/caddy-webdav

FROM caddy:${CADDY_VERSION}

COPY --from=builder /usr/bin/caddy /usr/bin/caddy

WORKDIR "/srv"

VOLUME ["/data", "/config", "/srv", "/etc/caddy/Caddyfile"]
