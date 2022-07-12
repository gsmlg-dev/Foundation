ARG CODE_SERVER_VERSION=4.4.0
FROM docker.io/gsmlg/code-server:v$CODE_SERVER_VERSION

ENV CODE_SERVER_VERSION=$CODE_SERVER_VERSION
LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL CODE_SERVER_VERSION=$CODE_SERVER_VERSION

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
  knot-dnsutils \
  cloc \
  locales \
  inotify-tools \
  iputils-ping net-tools \
  apache2-utils \
  clang cmake ninja-build pkg-config libgtk-3-dev

# Gen locale
ARG LANG=en_US.UTF-8
ENV LANG=$LANG
ENV LC_ALL=$LANG
RUN echo $LANG UTF-8 | tee -a /etc/locale.gen \
    && locale-gen \
    && update-locale LANG=$LANG \
    && update-locale LC_ALL=$LANG

# install jdk
ARG ANTLR_VERSION=4.10.1
RUN apt-get install -y default-jdk \
  && curl -sSLf https://www.antlr.org/download/antlr-${ANTLR_VERSION}-complete.jar -o /usr/local/lib/antlr-${ANTLR_VERSION}-complete.jar \
  && echo "#!/bin/bash" > /usr/local/bin/antlr \
  && echo "java -jar /usr/local/lib/antlr-${ANTLR_VERSION}-complete.jar \"$@\"" >> /usr/local/bin/antlr \
  && chmod +x /usr/local/bin/antlr \
  && echo "#!/bin/bash" > /usr/local/bin/grun \
  && echo 'java org.antlr.v4.gui.TestRig "$@"' >> /usr/local/bin/grun \
  && chmod +x /usr/local/bin/grun

# install nodejs
ARG NODEJS_VERSION=16
ENV NODE_PATH=/usr/lib/node_modules
RUN curl -sL https://deb.nodesource.com/setup_${NODEJS_VERSION}.x | bash - \
  && apt-get install -y -qq nodejs \
  && npm install -g npm \
  && npm install -g yarn \
  && npm install -g npm-check-updates \
  && npm install -g @aws-amplify/cli \
  && echo "export NODE_PATH=/usr/lib/node_modules" | tee -a "/etc/zsh/zshenv"

# install golang
ARG GO_VERSION=1.18.2
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
  && /usr/local/go/bin/go install github.com/go-delve/delve/cmd/dlv@latest \
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
  && /usr/local/go/bin/go env -w GO111MODULE=on \
  && /usr/local/go/bin/go env -w GOPROXY=https://goproxy.io,direct \
  && chown -R coder:coder "${GOPATH}"

# install python
RUN apt-get install -y python3 python3-pip \
  && update-alternatives --install /usr/bin/python python /usr/bin/python3.8 1 \
  && cd /tmp && curl -sSL https://bootstrap.pypa.io/get-pip.py -o get-pip.py \
  && python get-pip.py \
  && python -m pip install ansible \
  && python -m pip install awscli \
  && python -m pip install pipenv

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
  && chown -R coder:coder "${RUSTPATH}"

# install php
RUN apt-get install -y php-cli

# install erlang and elixir
RUN curl -sSLf https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb -o /tmp/erlang-solutions_2.0_all.deb \
  && dpkg -i /tmp/erlang-solutions_2.0_all.deb \
  && apt-get update \
  && apt-get install -y esl-erlang || apt-get install -y erlang \
  && apt-get install -y elixir

# install ruby
RUN apt-get install -y ruby-full

# install kubectl
ARG KUBECTL_VERSION=1.24.2
RUN export ARCH=`dpkg --print-architecture`; \
  curl -sSfLo kubectl "https://storage.googleapis.com/kubernetes-release/release/v${KUBECTL_VERSION}/bin/linux/${ARCH}/kubectl" \
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
  curl -sSfL https://github.com/barnybug/cli53/releases/download/0.8.18/cli53-linux-${ARCH} -o /usr/local/bin/cli53 \
  && chmod +x /usr/local/bin/cli53 \
  && curl -sSfL https://github.com/gsmlg-dev/gsmlg-cli/releases/download/v1.5.0/gsmlg-cli_linux_${ARCH} -o /usr/local/bin/gsmlg-cli \
  && chmod +x /usr/local/bin/gsmlg-cli

# install supabase
RUN export ARCH=`dpkg --print-architecture`; \
  wget https://github.com/supabase/cli/releases/download/v0.28.1/supabase_0.28.1_linux_${ARCH}.deb -P /tmp/ \
  && dpkg -i /tmp/supabase_0.28.1_linux_${ARCH}.deb

# install terraform
RUN export TARGET_DIR=/tmp/terraform \
  && git clone https://github.com/hashicorp/terraform.git $TARGET_DIR \
  && cd $TARGET_DIR && /usr/local/go/bin/go install \
  && chown -R coder:coder "${GOPATH}"

# clean cache install
RUN rm -rf /var/cache/* && rm -rf /tmp/*

USER coder
