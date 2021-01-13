FROM docker.io/gsmlg/code-server:v3.8.0

# update package list
RUN sudo apt update && sudo apt upgrade -y

# install useful packages
RUN sudo apt install -y silversearcher-ag

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo bash - && \
  sudo apt install -y nodejs && \
  sudo npm install -g yarn

# install golang
RUN sudo apt install -y golang

# install kubectl
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.20.0/bin/linux/amd64/kubectl \
  && chmod +x kubectl \
  && sudo mv kubectl /usr/local/bin/kubectl

# install skaffold
RUN curl -sSLfo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 \
  && chmod +x skaffold \
  && sudo mv skaffold /usr/local/bin/skaffold

# clean cache install
RUN sudo rm -rf /var/cache/* && sudo rm -rf /tmp/*
