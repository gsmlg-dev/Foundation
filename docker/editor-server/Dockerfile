ARG CODE_SERVER_VERSION=4.93.1
FROM ghcr.io/gsmlg-dev/code-server:v$CODE_SERVER_VERSION

ARG BUILD_DATE
ARG BUILD_MONTH

ENV CODE_SERVER_VERSION=$CODE_SERVER_VERSION
LABEL CODE_SERVER_VERSION=$CODE_SERVER_VERSION
LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation/tree/main/docker/editor-server"
LABEL org.opencontainers.image.description="Jonathan Gao's personal code-server, with his common dev envrionment."
LABEL org.opencontainers.image.licenses=MIT
LABEL org.opencontainers.image.build-date=$BUILD_DATE

ARG VERSION
LABEL VERSION=$VERSION
ENV EDITOR_VERSION=$VERSION

ARG DEBIAN_FRONTEND=noninteractive

ENV container=docker
ENV TZ=Asia/Shanghai

USER root

# update package list
RUN apt-get update && apt-get upgrade -y

# install useful packages
RUN apt-get install -y -qq \
  git git-lfs \
  gnupg \
  lsb-release \
  silversearcher-ag \
  tzdata \
  make \
  gcc g++ pkg-config \
  libssl-dev libcrypto++-dev \
  vim \
  zip unzip xz-utils \
  wget aria2 \
  protobuf-compiler \
  jq \
  nasm \
  bind9-dnsutils \
  knot-dnsutils \
  cloc \
  locales \
  inotify-tools \
  iputils-ping net-tools \
  apache2-utils \
  lsof \
  apt-file \
  whois \
  geoip-bin geoip-database \
  iproute2 \
  iptables \
  build-essential autoconf m4 \
  clang llvm \
  emscripten \
  openjdk-17-jdk \
  mandoc \
  cmake ninja-build libgtk-3-dev liblzma-dev libglu1-mesa

RUN apt-file update

# Gen locale
ARG LANG=en_US.UTF-8
ENV LANG=$LANG
ENV LC_ALL=$LANG
RUN echo $LANG UTF-8 | tee -a /etc/locale.gen \
    && locale-gen \
    && update-locale LANG=$LANG \
    && update-locale LC_ALL=$LANG

# install nix
# RUN curl -sSfL https://nixos.org/nix/install > /tmp/install.sh && sh /tmp/install.sh --no-daemon

# install erlang and elixir
RUN apt-get install -y erlang-dev elixir erlang-xmerl

# install jdk
ARG ANTLR_VERSION=4.12.0
RUN apt-get install -y -qq default-jdk \
  && curl -sSLf https://www.antlr.org/download/antlr-${ANTLR_VERSION}-complete.jar -o /usr/local/lib/antlr-${ANTLR_VERSION}-complete.jar \
  && echo "#!/bin/bash" > /usr/local/bin/antlr \
  && echo "java -jar /usr/local/lib/antlr-${ANTLR_VERSION}-complete.jar \"$@\"" >> /usr/local/bin/antlr \
  && chmod +x /usr/local/bin/antlr \
  && echo "#!/bin/bash" > /usr/local/bin/grun \
  && echo 'java org.antlr.v4.gui.TestRig "$@"' >> /usr/local/bin/grun \
  && chmod +x /usr/local/bin/grun

# install nodejs
ARG NODEJS_VERSION=20
ENV NODE_PATH=/usr/lib/node_modules
RUN curl -sL https://deb.nodesource.com/setup_${NODEJS_VERSION}.x | bash - \
  && apt-get install -y -qq nodejs \
  && npm install -g npm \
  && npm install -g yarn \
  && npm install -g pnpm \
  && npm install -g npm-check-updates \
  && npm install -g @microsoft/rush \
  && npm install -g @openapitools/openapi-generator-cli \
  && npm install -g ts-node \
  && echo "export NODE_PATH=/usr/lib/node_modules" | tee -a "/etc/zsh/zshenv" \
  && /usr/bin/node /usr/lib/node_modules/@openapitools/openapi-generator-cli/main.js version

# install golang
ARG GO_VERSION=1.22.8
ARG GO111MODULE=on
ARG GOPATH=/opt/go
ENV GOPATH=$GOPATH
RUN export ARCH=`dpkg --print-architecture`; \
  export GOPKG="go${GO_VERSION}.linux-${ARCH}.tar.gz"; \
  curl -sSL "https://golang.org/dl/${GOPKG}" -o "/tmp/${GOPKG}" \
  && tar -C /usr/local -xzf "/tmp/${GOPKG}" \
  && mkdir -p "${GOPATH}" \
  && echo "export PATH=\${PATH}:/usr/local/go/bin:${GOPATH}/bin" | tee -a "/etc/zsh/zshenv" \
  && echo "export GOPATH=${GOPATH}" | tee -a "/etc/zsh/zshenv" \
  && /usr/local/go/bin/go install golang.org/x/tools/gopls@latest \
  && /usr/local/go/bin/go install honnef.co/go/tools/cmd/staticcheck@latest \
  && /usr/local/go/bin/go install github.com/go-delve/delve/cmd/dlv@latest && ln -s /opt/go/bin/dlv /opt/go/bin/dlv-dap \
  && /usr/local/go/bin/go install github.com/ramya-rao-a/go-outline@latest \
  && /usr/local/go/bin/go install golang.org/x/tools/cmd/goimports@latest \
  && /usr/local/go/bin/go install google.golang.org/protobuf/cmd/protoc-gen-go@latest \
  && /usr/local/go/bin/go install github.com/minio/mc@latest \
  && /usr/local/go/bin/go install github.com/uudashr/gopkgs/v2/cmd/gopkgs@latest \
  && /usr/local/go/bin/go install github.com/go-delve/delve/cmd/dlv@latest \
  && /usr/local/go/bin/go install github.com/spf13/cobra-cli@latest \
  && /usr/local/go/bin/go install golang.org/x/mobile/cmd/gomobile@latest \
  && /usr/local/go/bin/go install golang.org/x/mobile/cmd/gobind@latest \
  && /usr/local/go/bin/go install github.com/evanw/esbuild/cmd/esbuild@latest \
  && /usr/local/go/bin/go install github.com/caddyserver/xcaddy/cmd/xcaddy@latest \
  && /usr/local/go/bin/go env -w GO111MODULE=on \
  && /usr/local/go/bin/go env -w GOPROXY=https://goproxy.gsmlg.dev,direct \
  && chown -R coder:coder "${GOPATH}"

# install rust
ARG RUSTPATH=/opt/rust
ENV RUSTUP_HOME=${RUSTPATH}
ENV CARGO_HOME=${RUSTPATH}
RUN export RUSTUP_HOME=${RUSTPATH} \
  && export CARGO_HOME=${RUSTPATH} \
  && echo "export PATH=\${PATH}:${RUSTPATH}/bin" | tee -a "/etc/zsh/zshenv" \
  && echo "export RUSTUP_HOME=${RUSTPATH}" | tee -a "/etc/zsh/zshenv" \
  && echo "export CARGO_HOME=${RUSTPATH}" | tee -a "/etc/zsh/zshenv" \
  && curl https://sh.rustup.rs -sSf | sh -s -- -y --no-modify-path \
  && /opt/rust/bin/rustup target add wasm32-unknown-unknown \
  && /opt/rust/bin/cargo install difftastic \
  && /opt/rust/bin/cargo install cargo-generate \
  && /opt/rust/bin/cargo install wasm-pack \
  && /opt/rust/bin/cargo install trunk wasm-bindgen-cli \
  && /opt/rust/bin/cargo install mdbook \
  && /opt/rust/bin/cargo install deno --locked \
  && chown -R coder:coder "${RUSTPATH}"

# install python
RUN apt-get install -y -qq python3 python3-pip python3-full \
  && python3 -m pip install --break-system-packages ansible \
  && python3 -m pip install --break-system-packages awscli \
  && python3 -m pip install --break-system-packages pipenv \
  && python3 -m pip install --break-system-packages huggingface_hub \
  && python3 -m pip install --break-system-packages jupyterlab

# install php
RUN apt-get install -y -qq php-cli

# install ruby
RUN apt-get install -y -qq ruby-full && gem install bundler jekyll jekyll-remote-theme

# install flutter
ARG FLUTTER_VERSION=3.24.4
ARG PUB_CACHE=/opt/flutter/pub-cache
ENV PUB_CACHE=${PUB_CACHE}
ENV FLUTTER_VERSION=${FLUTTER_VERSION}
RUN aria2c -o flutter.tar.xz https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_${FLUTTER_VERSION}-stable.tar.xz \
  && tar xf flutter.tar.xz -C /opt \
  && echo 'export PATH="/opt/flutter/bin:$PATH"' | tee -a "/etc/zsh/zshrc" \
  && echo 'export PATH="$PATH":"${PUB_CACHE}/bin"' | tee -a "/etc/zsh/zshrc" \
  && rm -f flutter.tar.xz \
  && /opt/flutter/bin/dart pub global activate mason_cli \
  && /opt/flutter/bin/dart pub global activate vscode_ext_cli \
  && /opt/flutter/bin/dart pub global activate melos

# install kubectl v1.31.2
ARG KUBECTL_VERSION
RUN export ARCH=`dpkg --print-architecture` \
  && export KUBECTL_LATEST_VERSION=$(curl -L -s https://dl.k8s.io/release/stable.txt) \
  && export KUBECTL_VERSION=${KUBECTL_VERSION:-$KUBECTL_LATEST_VERSION} \
  && curl -sSfLo kubectl "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/${ARCH}/kubectl" \
  && chmod +x kubectl \
  && mv kubectl /usr/local/bin/kubectl

# install skaffold
RUN export ARCH=`dpkg --print-architecture`; \
  curl -sSfLo skaffold "https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-${ARCH}" \
  && chmod +x skaffold \
  && mv skaffold /usr/local/bin/skaffold

# install helm
RUN curl -fL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# install cli53 gsmlg-cli
RUN export ARCH=`dpkg --print-architecture`; \
  curl -sSfL https://github.com/barnybug/cli53/releases/latest/download/cli53-linux-${ARCH} -o /usr/local/bin/cli53 \
  && chmod +x /usr/local/bin/cli53 \
  && curl -sSfL https://github.com/gsmlg-dev/gsmlg-cli/releases/latest/download/gsmlg-cli_linux_${ARCH} -o /usr/local/bin/gsmlg-cli \
  && chmod +x /usr/local/bin/gsmlg-cli

# change permision
RUN chown -R coder:coder /opt

# clean cache install
RUN rm -rf /var/cache/* && rm -rf /tmp/*

USER coder
