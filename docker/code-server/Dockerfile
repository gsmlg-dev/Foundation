FROM ubuntu:20.04

LABEL mantainer="GSMLG <gsmlg.com@gmail.com>"

ENV container docker
ENV LC_ALL C
ENV DEBIAN_FRONTEND noninteractive

RUN apt update && apt install -y curl ca-certificates zsh sudo && \
  useradd coder --create-home --shell $(which zsh) && \
  echo "coder ALL=(ALL) NOPASSWD:ALL" | tee -a /etc/sudoers.d/coder 

COPY install.sh /tmp/install.sh

RUN /tmp/install.sh --prefix=/usr/local --version 3.8.0

RUN rm -rf /root/.cache && rm -rf /tmp/*

WORKDIR /home/coder
USER coder

ENTRYPOINT ["/usr/bin/code-server"]
CMD ["--disable-update-check", "--bind-addr", "0.0.0.0:8080", "--disable-telemetry"]
