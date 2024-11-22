FROM ubuntu:24.04

LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="/docker/openssl"
LABEL org.opencontainers.image.title="OpenSSL"
LABEL org.opencontainers.image.authors="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.description="OpenSSL running on top of ubuntu"
LABEL org.opencontainers.image.licenses=MIT
LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y -qq \
    openssl ca-certificates vim \
    openssh-client openssh-server openssh-sftp-server keychain openssh-known-hosts

ENTRYPOINT ["/bin/bash"]
