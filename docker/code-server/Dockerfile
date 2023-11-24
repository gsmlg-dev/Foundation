FROM debian:12

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation/tree/main/docker/code-server"
LABEL org.opencontainers.image.description="Code-Server running on top of debian"
LABEL org.opencontainers.image.licenses=MIT

ARG VERSION=4.19.0
ENV container docker
ENV LC_ALL C
ENV DEBIAN_FRONTEND noninteractive
ENV CODE_SERVER_VERSION=$VERSION

RUN apt-get update \
  && apt-get upgrade -y \
  && apt install -y curl ca-certificates zsh sudo gpg \
  && useradd coder --create-home --shell $(which zsh) \
  && echo "coder ALL=(ALL) NOPASSWD:ALL" | tee -a /etc/sudoers.d/coder

COPY install.sh /tmp/install.sh
COPY duskmoon /etc/duskmoon

RUN /tmp/install.sh --method standalone --prefix=/usr/local --version $VERSION

RUN rm -rf /root/.cache && rm -rf /tmp/*

WORKDIR /home/coder
USER coder

ENTRYPOINT ["/usr/local/bin/code-server"]
CMD ["--disable-update-check", "--bind-addr", "0.0.0.0:8080", "--disable-telemetry", "--app-name", "GSMLG.DEV","--welcome-text", "MAY THE FORCE BE WITH YOU"]
