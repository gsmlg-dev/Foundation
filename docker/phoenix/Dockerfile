ARG ELIXIR_VERSION
FROM elixir:${ELIXIR_VERSION}

ARG TARGETOS
ARG TARGETARCH
ARG PHOENIX_VERSION

ARG TAILWIND_URL_AMD64=https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64
ARG TAILWIND_URL_ARM64=https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-arm64

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.title="Phoenix"
LABEL org.opencontainers.image.authors="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.description="Phoenix running on top of elixir"
LABEL org.opencontainers.image.licenses=MIT

LABEL ELIXIR_VERSION="${ELIXIR_VERSION}"
LABEL PHOENIX_VERSION="${PHOENIX_VERSION}"

# install nodejs
ARG NODEJS_VERSION=22
ENV NODE_PATH=/usr/lib/node_modules
RUN curl -sL https://deb.nodesource.com/setup_${NODEJS_VERSION}.x | bash - \
  && apt-get update \
  && apt-get install clang make git figlet curl -y \
  && apt-get install -y nodejs

RUN apt-get install -y cargo rustc

RUN <<EOF
if [ "$TARGETARCH" = "amd64" ]; then
  curl -sSLf https://github.com/oven-sh/bun/releases/latest/download/bun-linux-x64.zip -o /tmp/bun-linux-x64.zip
  unzip /tmp/bun-linux-x64.zip -d /tmp
  install -m 755 /tmp/bun-linux-x64/bun /usr/bin/bun
  curl -sSLf $TAILWIND_URL_AMD64 -o /tmp/tailwindcss
  install -m 755 /tmp/tailwindcss /usr/bin/tailwind
fi
if [ "$TARGETARCH" = "arm64" ]; then
  curl -sSLf https://github.com/oven-sh/bun/releases/latest/download/bun-linux-aarch64.zip -o /tmp/bun-linux-aarch64.zip
  unzip /tmp/bun-linux-aarch64.zip -d /tmp
  install -m 755 /tmp/bun-linux-aarch64/bun /usr/bin/bun
  curl -sSLf $TAILWIND_URL_ARM64 -o /tmp/tailwindcss
  install -m 755 /tmp/tailwindcss /usr/bin/tailwind
fi
rm -rf /tmp/*
EOF

ENV MIX_TAILWIND_PATH=/usr/bin/tailwind
ENV MIX_BUN_PATH=/usr/bin/bun

RUN mix local.rebar --force
RUN mix local.hex --force
RUN mix archive.install --force hex phx_new ${PHOENIX_VERSION}

ENTRYPOINT ["/bin/bash", "-c"]
