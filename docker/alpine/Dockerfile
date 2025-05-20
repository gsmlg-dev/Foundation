FROM alpine:3.21

LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="/docker/alpine"
LABEL org.opencontainers.image.title="Linux alpine distribution"
LABEL org.opencontainers.image.authors="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.description="Alpine Linux is a Linux distribution designed to be small, simple, and secure.[3] It uses musl, BusyBox, and OpenRC instead of the more commonly used glibc, GNU Core Utilities, and systemd.[4][5][6][7][8] This makes Alpine one of few Linux distributions not to be based on the GNU Core Utilities or glibc."
LABEL org.opencontainers.image.licenses=MIT
LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

ENV TZ=Asia/Shanghai
ENV LC_ALL=en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en

RUN apk add --no-cache openssl bash libstdc++ curl

