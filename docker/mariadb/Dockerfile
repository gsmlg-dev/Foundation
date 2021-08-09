FROM ubuntu:20.04

LABEL mantainer="GSMLG <gsmlg.com@gmail.com>"

ARG DEBIAN_FRONTEND="noninteractive"

# setup repo
# file from : https://downloads.mariadb.com/MariaDB/mariadb_repo_setup
COPY mariadb_repo_setup.sh /tmp/mariadb_repo_setup.sh
RUN bash /tmp/mariadb_repo_setup.sh

# install mariadb
RUN apt-get install -y \
    mariadb-server \
    galera-4 \
    mariadb-client \
    libmariadb3 \
    mariadb-backup \
    mariadb-common

# TODO: Create initialilize file entrypoint file

