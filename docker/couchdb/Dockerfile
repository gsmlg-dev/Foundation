ARG VERSION=3
FROM couchdb:$VERSION

# Document https://github.com/apache/couchdb-docker/blob/master/README.md

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL document="https://github.com/apache/couchdb-docker/blob/master/README.md"

ENV COUCHDB_USER=gao
ENV COUCHDB_PASSWORD=gsmlg-dev
ENV COUCHDB_SECRET=couchdb_secret
ENV NODENAME=couchdb-server
ENV COUCHDB_ERLANG_COOKIE="¯\_(ツ)_/¯"

LABEL PORT_5984="Main CouchDB endpoint"
LABEL PORT_4369="Erlang portmap daemon (epmd)"
LABEL PORT_9100="CouchDB cluster communication port"
EXPOSE 5984 4369 9100

VOLUME ["/opt/couchdb/data", "/opt/couchdb/log", "/opt/couchdb/etc/local.d"]
