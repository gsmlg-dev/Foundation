FROM docker.io/gsmlg/code-server:v3.8.0

ENV container=docker
ENV LC_ALL=C
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Shanghai

# update package list
RUN sudo apt-get update && sudo apt-get upgrade -y

# install useful packages
RUN sudo DEBIAN_FRONTEND=noninteractive apt-get install -y -qq \
  git \
  silversearcher-ag \
  tzdata

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo bash - && \
  sudo apt-get install -y -qq nodejs && \
  sudo npm install -g yarn

# install golang
RUN sudo apt-get install -y -qq golang

# install kubectl
RUN ARCH=`dpkg --print-architecture` \
  curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.0/bin/linux/${ARCH}/kubectl" \
  && chmod +x kubectl \
  && sudo mv kubectl /usr/local/bin/kubectl

# install skaffold
RUN ARCH=`dpkg --print-architecture` \
  curl -Lo skaffold "https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-${ARCH}" \
  && chmod +x skaffold \
  && sudo mv skaffold /usr/local/bin/skaffold

# clean cache install
RUN sudo rm -rf /var/cache/* && sudo rm -rf /tmp/*
