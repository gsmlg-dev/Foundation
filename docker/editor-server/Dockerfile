FROM docker.io/gsmlg/code-server:v3.12.0

LABEL mantainer="GSMLG <gsmlg.com@gmail.com>"

ENV container=docker
ENV LC_ALL=en_US.UTF-8

USER root

# update package list
RUN apt-get update && apt-get upgrade -y

# install useful packages
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y -qq \
  git \
  gnupg \
  lsb-release \
  silversearcher-ag \
  tzdata \
  make \
  gcc pkg-config libssl-dev libcrypto++-dev \
  vim \
  zip unzip xz-utils \
  wget aria2 \
  protobuf-compiler \
  jq \
  nasm \
  bind9-dnsutils \
  locales \
  inotify-tools \
  iputils-ping net-tools \
  apache2-utils

# Gen locale
RUN export LANG=en_US.UTF-8 \
    && echo $LANG UTF-8 | tee -a /etc/locale.gen \
    && locale-gen \
    && update-locale LANG=$LANG \
    && update-locale LC_ALL=en_US.UTF-8

# install jdk
RUN apt-get install -y default-jdk \
  && curl -sSLf https://www.antlr.org/download/antlr-4.9.2-complete.jar -o /usr/local/lib/antlr-4.9.2-complete.jar \
  && echo "#!/bin/bash" > /usr/local/bin/antlr \
  && echo 'java -jar /usr/local/lib/antlr-4.9.2-complete.jar "$@"' >> /usr/local/bin/antlr \
  && chmod +x /usr/local/bin/antlr \
  && echo "#!/bin/bash" > /usr/local/bin/grun \
  && echo 'java org.antlr.v4.gui.TestRig "$@"' >> /usr/local/bin/grun \
  && chmod +x /usr/local/bin/grun

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - \
  && apt-get install -y -qq nodejs \
  && npm install -g npm \
  && npm install -g yarn

# install golang
RUN export ARCH=`dpkg --print-architecture`; \
  export GO_VERSION="1.17.3"; \
  export GOPKG="go${GO_VERSION}.linux-${ARCH}.tar.gz"; \
  curl -sSL "https://golang.org/dl/${GOPKG}" -o "/tmp/${GOPKG}" \
  && tar -C /usr/local -xzf "/tmp/${GOPKG}" \
  && export GOPATH="/opt/go" && mkdir -p "${GOPATH}" \
  && echo "export PATH=\${PATH}:/usr/local/go/bin:${GOPATH}/bin" | tee -a "/etc/zsh/zshenv" \
  && echo "export GOPATH=${GOPATH}" | tee -a "/etc/zsh/zshenv" \
  && export GO111MODULE=on \
  && /usr/local/go/bin/go install golang.org/x/tools/gopls@latest \
  && /usr/local/go/bin/go install github.com/ramya-rao-a/go-outline@latest \
  && /usr/local/go/bin/go install golang.org/x/tools/cmd/goimports@latest \
  && /usr/local/go/bin/go install github.com/rogpeppe/godef@latest \
  && /usr/local/go/bin/go get google.golang.org/protobuf/proto@latest \
  && /usr/local/go/bin/go install google.golang.org/protobuf/cmd/protoc-gen-go@latest \
  && /usr/local/go/bin/go get google.golang.org/grpc@latest \
  && /usr/local/go/bin/go install github.com/minio/mc@latest \
  && /usr/local/go/bin/go env -w GO111MODULE=on \
  && /usr/local/go/bin/go env -w GOPROXY=https://goproxy.cn,direct \
  && chown -R coder:coder "${GOPATH}" 

# install python
RUN apt-get install -y python3 python3-pip \
  && update-alternatives --install /usr/bin/python python /usr/bin/python3.8 1 \
  && cd /tmp && curl -sSL https://bootstrap.pypa.io/get-pip.py -o get-pip.py \
  && python get-pip.py \
  && python -m pip install ansible \
  && python -m pip install awscli

# install rust
RUN export RUSTPATH=/opt/rust \
  && export RUSTUP_HOME=${RUSTPATH} \
  && export CARGO_HOME=${RUSTPATH} \
  && echo "export PATH=\${PATH}:${RUSTPATH}/bin" | tee -a "/etc/zsh/zshenv" \
  && echo "export RUSTUP_HOME=${RUSTPATH}" | tee -a "/etc/zsh/zshenv" \
  && echo "export CARGO_HOME=${RUSTPATH}" | tee -a "/etc/zsh/zshenv" \
  && curl https://sh.rustup.rs -sSf | sh -s -- -y --no-modify-path \
  && chown -R coder:coder "${RUSTPATH}"

# install php
RUN apt-get install -y php-cli

# install erlang and elixir
RUN curl -sSLf https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb -o /tmp/erlang-solutions_2.0_all.deb \
  && dpkg -i /tmp/erlang-solutions_2.0_all.deb \
  && apt-get update \
  && apt-get install -y -qq esl-erlang \
  && apt-get install -y -qq elixir

# install kubectl
RUN export ARCH=`dpkg --print-architecture`; \
  curl -sSfLo kubectl "https://storage.googleapis.com/kubernetes-release/release/v1.21.5/bin/linux/${ARCH}/kubectl" \
  && chmod +x kubectl \
  && mv kubectl /usr/local/bin/kubectl

# install skaffold
RUN export ARCH=`dpkg --print-architecture`; \
  curl -sSfLo skaffold "https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-${ARCH}" \
  && chmod +x skaffold \
  && mv skaffold /usr/local/bin/skaffold

# install helm
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# install flutter
RUN apt-get install -y -qq clang cmake ninja-build pkg-config libgtk-3-dev

# install cli53
RUN export ARCH=`dpkg --print-architecture`; \
  curl -sSfL https://github.com/barnybug/cli53/releases/download/0.8.18/cli53-linux-${ARCH} -o /usr/local/bin/cli53 \
  && chmod +x /usr/local/bin/cli53

# clean cache install
RUN rm -rf /var/cache/* && rm -rf /tmp/*

USER coder
