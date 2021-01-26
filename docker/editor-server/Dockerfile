FROM docker.io/gsmlg/code-server:v3.8.0

ENV container=docker
ENV LC_ALL=C

# update package list
RUN sudo apt-get update && sudo apt-get upgrade -y

# install useful packages
RUN sudo DEBIAN_FRONTEND=noninteractive apt-get install -y -qq \
  git \
  gnupg \
  lsb-release \
  silversearcher-ag \
  tzdata \
  vim

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo bash - && \
  sudo apt-get install -y -qq nodejs && \
  sudo npm install -g yarn

# install golang
RUN export ARCH=`dpkg --print-architecture`; \
  export GO_VERSION="1.15.6"; \
  export GOPKG="go${GO_VERSION}.linux-${ARCH}.tar.gz"; \
  sudo curl -sSL "https://golang.org/dl/${GOPKG}" -o "/tmp/${GOPKG}" \
  && sudo tar -C /usr/local -xzf "/tmp/${GOPKG}" \
  && echo "export PATH=$PATH:/usr/local/go/bin" | sudo tee -a "/etc/zsh/zshenv"

# install kubectl
RUN export ARCH=`dpkg --print-architecture`; \
  curl -sSfLo kubectl "https://storage.googleapis.com/kubernetes-release/release/v1.20.2/bin/linux/${ARCH}/kubectl" \
  && chmod +x kubectl \
  && sudo mv kubectl /usr/local/bin/kubectl

# install skaffold
RUN export ARCH=`dpkg --print-architecture`; \
  curl -sSfLo skaffold "https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-${ARCH}" \
  && chmod +x skaffold \
  && sudo mv skaffold /usr/local/bin/skaffold

# install helm
RUN export ARCH=`dpkg --print-architecture`; \
  curl -sSfLo /tmp/helm.tar.gz "https://get.helm.sh/helm-v3.5.0-linux-${ARCH}.tar.gz" \
  && tar zxf /tmp/helm.tar.gz --strip=1 -C /tmp \
  && sudo mv /tmp/helm /usr/local/bin/helm

# clean cache install
RUN sudo rm -rf /var/cache/* && sudo rm -rf /tmp/*

