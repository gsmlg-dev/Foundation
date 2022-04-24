FROM ubuntu:20.04

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

ARG DEBIAN_FRONTEND="noninteractive"
ARG TZ="Asia/Shanghai"
ARG MARIADB_VERSION="10.7"

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

