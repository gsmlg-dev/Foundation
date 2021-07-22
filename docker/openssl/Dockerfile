FROM ubuntu:20.04

LABEL mantainer="GSMLG <gsmlg.com@gmail.com>"

RUN apt-get update \
    && apt-get install openssl ca-certificates vim \
    && rm -rf /var/cache/apk/*

ENTRYPOINT ["/bin/bash"]
