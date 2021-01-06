FROM ubuntu:20.04

RUN apt update && apt install -y curl ca-certificates zsh && \
  useradd coder --create-home --shell $(which zsh)

COPY install.sh /tmp/install.sh

RUN /tmp/install.sh --prefix=/usr/local --version 3.8.0

RUN rm -rf /root/.cache && rm -rf /tmp

WORKDIR /home/coder
USER coder

ENTRYPOINT ["/usr/bin/code-server"]
CMD ["--disable-update-check", "--bind-addr", "0.0.0.0:8080", "--disable-telemetry"]
