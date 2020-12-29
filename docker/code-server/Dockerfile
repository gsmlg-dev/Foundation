FROM ubuntu:20.04

RUN apt update && apt install -y curl ca-certificates

COPY install.sh /tmp/install.sh

RUN /tmp/install.sh --prefix=/usr/local --version 3.8.0

RUN rm -rf /root/.cache && rm -rf /tmp


# CMD ["/usr/local/bin/code-server"]

