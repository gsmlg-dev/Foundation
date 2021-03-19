FROM ubuntu:20.04

LABEL mantainer="GSMLG <gsmlg.com@gmail.com>"

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get upgrade -y

# install useful packages
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y -qq \
  git \
  gnupg \
  lsb-release \
  silversearcher-ag \
  perl \
  vim \
  make \
  gawk \
  libncurses-dev \
  rsync \
  gcc \
  g++ \
  unzip \
  bzip2 \
  wget \
  python \
  bash \
  genisoimage


ENTRYPOINT ["/bin/bash"]
