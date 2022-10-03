FROM couchdb:3.2.2

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

LABEL docs-shell-access-and-logs="
Container shell access, remsh, and viewing logs
The docker exec command allows you to run commands inside a Docker container. 
The following command line will give you a bash shell inside your couchdb container:

$ docker exec -it my-couchdb bash

If you need direct access to the Erlang runtime:

$ docker exec -it my-couchdb /opt/couchdb/bin/remsh

The CouchDB log is available through Docker's container log:

$ docker logs my-couchdb
"

LABEL docs-config="
The best way to provide configuration to the couchdb image is to provide a custom ini file to CouchDB, 
preferably stored in the /opt/couchdb/etc/local.d/ directory. 
There are many ways to provide this file to the container 
(via short Dockerfile with FROM + COPY, via Docker Configs, via runtime bind-mount, etc), 
the details of which are left as an exercise for the reader.

Keep in mind that run-time reconfiguration of CouchDB will overwrite the last file in the configuration chain, 
and that this Docker container creates the /opt/couchdb/etc/local.d/docker.ini file at startup.

CouchDB also uses /opt/couchdb/etc/vm.args to store Erlang runtime-specific changes. 
Changing these values is less common. 
If you need to change the epmd port, for instance, you will want to bind mount this file as well. 
(Note: files cannot be bind-mounted on Windows hosts.)

In addition, a few environment variables are provided to set very common parameters:

COUCHDB_USER and COUCHDB_PASSWORD will create an ini-file based local admin user with the given username and password in the file /opt/couchdb/etc/local.d/docker.ini.

COUCHDB_SECRET will set the CouchDB shared cluster secret value, in the file /opt/couchdb/etc/local.d/docker.ini.

NODENAME will set the name of the CouchDB node inside the container to couchdb@${NODENAME}, 
in the file /opt/couchdb/etc/vm.args. 
This is used for clustering purposes and can be ignored for single-node setups.

Erlang Environment Variables like ERL_FLAGS will be used by Erlang itself. For a complete list have a look here
"

LABEL docs-persistent-config="
The CouchDB configuration is specified in .ini files in /opt/couchdb/etc. 
Take a look at the CouchDB configuration documentation to learn more about CouchDB's configuration structure.

If you want to use a customized CouchDB configuration, 
you can create your configuration file in a directory on the host machine 
and then mount that directory as /opt/couchdb/etc/local.d inside the couchdb container.

$ docker run --name my-couchdb -v /home/couchdb/etc:/opt/couchdb/etc/local.d -d couchdb

The -v /home/couchdb/etc:/opt/couchdb/etc/local.d part of the command mounts the /home/couchdb/etc directory 
from the underlying host system as /opt/couchdb/etc/local.d inside the container, 
where CouchDB by default will write its dynamic configuration files.

You can also use couchdb as the base image for your own couchdb instance 
and provide your own version of the local.ini config file:

Example Dockerfile:

FROM couchdb

COPY local.ini /opt/couchdb/etc/

and then build and run

$ docker build -t you/awesome-couchdb .
$ docker run -d -p 5984:5984 you/awesome-couchdb

Remember that, with this approach, any newly written changes will still appear in the /opt/couchdb/etc/local.d directory, 
so it is still recommended to map this to a host path for persistence.
"

ENV COUCHDB_USER=gsmlg \
    COUCHDB_PASSWORD=gsmlg \
    COUCHDB_SECRET=couchdb_secret \
    NODENAME=couchdb-server \
    ERL_FLAGS="-setcookie \"¯\_(ツ)_/¯\""

VOLUME ["/opt/couchdb/data", "/opt/couchdb/etc/local.d"]



