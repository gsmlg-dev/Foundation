FROM couchdb:3.2.2

# Document https://github.com/apache/couchdb-docker/blob/master/README.md

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

ENV COUCHDB_USER=gsmlg \
    COUCHDB_PASSWORD=gsmlg \
    COUCHDB_SECRET=couchdb_secret \
    NODENAME=couchdb-server \
    COUCHDB_ERLANG_COOKIE="¯\_(ツ)_/¯"

# 5984: Main CouchDB endpoint
# 4369: Erlang portmap daemon (epmd)
# 9100: CouchDB cluster communication port
EXPOSE 5984 4369 9100

VOLUME ["/opt/couchdb/data", "/opt/couchdb/log", "/opt/couchdb/etc/local.d"]
