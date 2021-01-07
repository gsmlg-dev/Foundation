FROM docker.io/gsmlg/code-server:v3.8.0

# update package list
RUN sudo apt update && sudo apt upgrade -y

# install useful packages
RUN sudo apt install -y silversearcher-ag

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo bash - && \
  sudo apt install -y nodejs && \
  sudo npm install -g yarn

# clean cache install
RUN sudo rm -rf /var/cache/* && sudo rm -rf /tmp/*
