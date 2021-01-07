FROM docker.io/gsmlg/code-server:v3.8.0

# update package list
RUN sudo apt update && sudo apt upgrade -y

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo bash - && \
  sudo apt install -y nodejs && \
  sudo npm install -g yarn

# install golang
RUN GO_VERSION="1.15.6" && ARCH= && \
  dpkgArch="$(curl --version |cut -d ' ' -f 3 |head -1 |cut -d '-' -f 1 |cut -b 2-)" && \
  case "${dpkgArch##*-}" in \
  x86_64) ARCH='amd64';; \
  aarch64) ARCH='arm64';; \
  *) ARCH='amd64';; \
  esac && \
  GOPKG="go${GO_VERSION}.linux-${ARCH}.tar.gz" && \
  sudo curl -sSL "https://golang.org/dl/${GOPKG}" -o "/tmp/${GOPKG}" && \
  sudo tar -C /usr/local -xzf "/tmp/${GOPKG}" && \
  sudo echo "export PATH=$PATH:/usr/local/go/bin" >> "/etc/bash.bashrc"

# clean cache install
RUN sudo rm -rf /var/lib/apt/lists/* && sudo rm -rf /tmp/*
