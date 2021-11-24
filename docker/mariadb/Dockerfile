FROM ubuntu:20.04

LABEL mantainer="GSMLG <gsmlg.com@gmail.com>"

ARG DEBIAN_FRONTEND="noninteractive"
ARG TZ="Asia/Shanghai"
ARG MARIADB_VERSION="mariadb-10.7"

# Install prerequisites
RUN apt update && apt-get install -y curl ca-certificates

# setup repo
# file from : https://downloads.mariadb.com/MariaDB/mariadb_repo_setup
COPY mariadb_repo_setup.sh /tmp/mariadb_repo_setup.sh
RUN bash /tmp/mariadb_repo_setup.sh --mariadb-server-version="${MARIADB_VERSION}"

# install mariadb
RUN apt-get install -y \
    mariadb-server \
    mariadb-client \
    mariadb-backup \
    mariadb-common \
    maxscale

# TODO: Create initialilize file entrypoint file

