ARG VERSION=3.4.2
FROM erlang:26-alpine AS builder

RUN <<EOF
set -ex

apk add --no-cache \
  autoconf \
  automake \
  build-base \
  curl \
  git \
  icu-dev \
  libtool \
  linux-headers \
  openssl-dev \
  python3

curl -sSLf https://github.com/apache/couchdb/archive/refs/tags/${VERSION}.zip -o /tmp/couchdb.zip
unzip /tmp/couchdb.zip -d /tmp
cp -r /tmp/couchdb-${VERSION} /couchdb
cd /couchdb

./configure
make release

EOF


FROM alpine:3.20

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL document="https://github.com/apache/couchdb-docker/blob/master/README.md"
LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="/docker/couchdb"
LABEL org.opencontainers.image.title="CouchDB"
LABEL org.opencontainers.image.authors="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.description="Jonathan Gao's personal CouchDB in alpine Linux, with his common dev envrionment."

ENV COUCHDB_USER=gao
ENV COUCHDB_PASSWORD=gsmlg-dev
ENV COUCHDB_SECRET=couchdb_secret
ENV NODENAME=couchdb-server
ENV COUCHDB_ERLANG_COOKIE="¯\_(ツ)_/¯"

LABEL PORT_5984="Main CouchDB endpoint"
LABEL PORT_4369="Erlang portmap daemon (epmd)"
LABEL PORT_9100="CouchDB cluster communication port"
EXPOSE 5984 4369 9100

COPY --from=builder /couchdb/rel/couchdb /opt/couchdb

VOLUME ["/opt/couchdb/data", "/opt/couchdb/log", "/opt/couchdb/etc/local.d"]
