FROM ubuntu:24.04

ARG VERSION=4.96.4
ARG container=docker
ARG LC_ALL=C
ARG DEBIAN_FRONTEND=noninteractive
ARG TZ=Asia/Shanghai

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="/docker/code-server"
LABEL org.opencontainers.image.title="Code-Server"
LABEL org.opencontainers.image.authors="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.description="Code-Server running on top of debian"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.version="$VERSION"

ENV container=docker
ENV LC_ALL=C
ENV DEBIAN_FRONTEND=noninteractive
ENV CODE_SERVER_VERSION=$VERSION
ENV TZ=$TZ

COPY install.sh /tmp/install.sh
COPY duskmoon /etc/duskmoon

RUN <<EOF
apt-get update
apt-get upgrade -y
apt install -y curl ca-certificates zsh sudo gpg
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

ENV ADDR="0.0.0.0"
ENV PORT="8080"
ENV APP_NAME="GSMLG.DEV"
ENV WELCOME_TEXT="MAY THE FORCE BE WITH YOU"

CMD [ "sh", "-c", "/usr/local/bin/code-server --disable-update-check --bind-addr $ADDR:$PORT --disable-telemetry --app-name $APP_NAME --welcome-text $WELCOME_TEXT" ]
