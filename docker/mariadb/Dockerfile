FROM ubuntu:24.04

LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="/docker/mariadb"
LABEL org.opencontainers.image.title="MariaDB"
LABEL org.opencontainers.image.authors="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.description="MariaDB running on top of ubuntu"
LABEL org.opencontainers.image.licenses=MIT
LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

ARG DEBIAN_FRONTEND="noninteractive"
ARG TZ="Asia/Shanghai"
ARG MARIADB_VERSION="11.7"

# Install prerequisites
RUN apt update && apt-get install -y curl ca-certificates

# setup repo
# file from : https://downloads.mariadb.com/MariaDB/mariadb_repo_setup
COPY mariadb_repo_setup.sh /tmp/mariadb_repo_setup.sh
RUN bash /tmp/mariadb_repo_setup.sh --mariadb-server-version="mariadb-${MARIADB_VERSION}"

# install mariadb
RUN export ARCH=`dpkg --print-architecture`; \
    apt-get install -y \
    mariadb-server \
    mariadb-client \
    mariadb-backup \
    mariadb-common \
    && test "$ARCH" "==" "amd64" \
    && apt-get install -y maxscale || echo "Skip install maxscale"

# TODO: Create initialilize file entrypoint file

