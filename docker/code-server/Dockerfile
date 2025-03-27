FROM ubuntu:24.04

ARG VERSION=
ARG container=docker
ARG LC_ALL=C
ARG DEBIAN_FRONTEND=noninteractive
ARG TZ=Asia/Shanghai

ARG TARGETPLATFORM
ARG TARGETOS
ARG TARGETARCH
ARG TARGETVARIANT

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="/docker/code-server"
LABEL org.opencontainers.image.title="Code-Server"
LABEL org.opencontainers.image.authors="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.description="Code-Server running on top of ubuntu 24.04"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.version="$VERSION"

ENV container=docker
ENV LC_ALL=C
ENV DEBIAN_FRONTEND=noninteractive
ENV CODE_SERVER_VERSION=$VERSION
ENV TZ=$TZ

ENV PLATFORM=$TARGETPLATFORM
ENV OS=$TARGETOS
ENV ARCH=$TARGETARCH
ENV VARIANT=$TARGETVARIANT

COPY install.sh /tmp/install.sh
COPY duskmoon /etc/duskmoon

RUN <<EOF
echo $TARGETPLATFORM | tee /etc/PLATFORM
echo $TARGETOS | tee /etc/OS
echo $TARGETARCH | tee /etc/ARCH
echo $TARGETVARIANT | tee /etc/VARIANT
apt-get update
apt-get upgrade -y
apt-get install -y curl ca-certificates zsh sudo gpg
userdel -f -r ubuntu
groupdel -f ubuntu
useradd coder --create-home --shell $(which zsh)
echo "coder ALL=(ALL) NOPASSWD:ALL" | tee -a /etc/sudoers.d/coder
# Code Server installation
# Source code: [https://github.com/coder/code-server]
/tmp/install.sh --method standalone --prefix=/usr/local --version $VERSION
rm -rf /root/.cache && rm -rf /tmp/*
EOF

WORKDIR /home/coder
USER coder

SHELL ["/bin/zsh", "-c"]

ENV CODE_SERVER_ADDR="0.0.0.0"
ENV CODE_SERVER_PORT="8080"
ENV CODE_SERVER_APP_NAME="GSMLG.DEV"
ENV CODE_SERVER_WELCOME_TEXT="MAY THE FORCE BE WITH YOU"

CMD [ "sh", "-c", "/usr/local/bin/code-server --disable-update-check --bind-addr $CODE_SERVER_ADDR:$CODE_SERVER_PORT --disable-telemetry --app-name $CODE_SERVER_APP_NAME --welcome-text $CODE_SERVER_WELCOME_TEXT" ]
