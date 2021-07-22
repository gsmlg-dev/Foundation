FROM ubuntu:20.04

LABEL mantainer="GSMLG <gsmlg.com@gmail.com>"

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq \
    openssl ca-certificates vim 

ENTRYPOINT ["/bin/bash"]
