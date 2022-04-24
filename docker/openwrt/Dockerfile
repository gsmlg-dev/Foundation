FROM ubuntu:20.04 as builder

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

ARG DEBIAN_FRONTEND=noninteractive

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
  genisoimage \
  protobuf-compiler protobuf-c-compiler \
  build-essential ccache ecj fastjar file g++ gawk \
  gettext git java-propose-classpath libelf-dev libncurses5-dev \
  libncursesw5-dev libssl-dev python python2.7-dev python3 unzip wget \
  python3-distutils python3-setuptools python3-dev rsync subversion swig \
  time xsltproc zlib1g-dev ca-certificates mkisofs

RUN git clone --depth 1 --single-branch --branch openwrt-21.02 https://git.openwrt.org/openwrt/openwrt.git /openwrt

COPY config /openwrt/.config

RUN cd /openwrt \
    && ./scripts/feeds update -a \
    && ./scripts/feeds install -a \
    && export FORCE_UNSAFE_CONFIGURE=1 \
    && make defconfig \
    && make world

FROM alpine

COPY --from=builder /openwrt/bin /openwrt

