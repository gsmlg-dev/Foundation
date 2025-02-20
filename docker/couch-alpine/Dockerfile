FROM erlang:26-alpine AS builder

ARG VERSION=3.4.2
ARG http_proxy
ARG https_proxy

RUN <<EOF
set -ex

apk add --no-cache \
  nspr \
  build-base \
  m4 \
  nspr-dev \
  perl \
  zip \
  autoconf \
  automake \
  build-base \
  curl \
  git \
  icu-dev \
  libtool \
  linux-headers \
  openssl-dev \
  python3 \
  npm \
  mozjs115-dev

git clone git clone https://github.com/apache/couchdb.git /couchdb
cd /couchdb
git checkout -f $VERSION

./configure --spidermonkey-version=115 --disable-docs
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
