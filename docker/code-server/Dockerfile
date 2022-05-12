FROM ubuntu:20.04

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

ARG VERSION=4.4.0
ENV container docker
ENV LC_ALL C
ENV DEBIAN_FRONTEND noninteractive

RUN apt update \
  && apt install -y curl ca-certificates zsh sudo \
  && useradd coder --create-home --shell $(which zsh) \
  && echo "coder ALL=(ALL) NOPASSWD:ALL" | tee -a /etc/sudoers.d/coder 

COPY install.sh /tmp/install.sh

RUN /tmp/install.sh --prefix=/usr/local --version $VERSION

RUN rm -rf /root/.cache && rm -rf /tmp/*

WORKDIR /home/coder
USER coder

ENTRYPOINT ["/usr/bin/code-server"]
CMD ["--disable-update-check", "--bind-addr", "0.0.0.0:8080", "--disable-telemetry"]
