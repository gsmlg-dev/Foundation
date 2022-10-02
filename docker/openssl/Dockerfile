FROM ubuntu:22.04

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq \
    openssl ca-certificates vim \
    openssh-client openssh-server openssh-sftp-server keychain openssh-known-hosts

ENTRYPOINT ["/bin/bash"]
