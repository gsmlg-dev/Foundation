FROM quay.io/keycloak/keycloak:latest as builder

ARG BUILD_DATE

# Features
ARG KC_FEATURES="account,account-api,admin,admin-api,admin-fine-grained-authz,authorization,cache-embedded-remote-store,ciba,client-policies,client-secret-rotation,client-types,declarative-ui,device-flow,docker,dpop,dynamic-scopes,fips,impersonation,kerberos,login,oid4vc-vci,opentelemetry,organization,par,passkeys,persistent-user-sessions,preview,recovery-codes,scripts,step-up-authentication,token-exchange,transient-users,update-email,web-authn"

# Cache set to local, if run a cluster, use `ispn` instead
ARG KC_CACHE=local

# Enable health and metrics support
ARG KC_HEALTH_ENABLED=true
ARG KC_METRICS_ENABLED=true

# Configure a database vendor
ARG KC_DB=mariadb

# Enable http
ARG KC_HTTP_ENABLED=true

# Default proxy
ARG KC_PROXY=edge

# Log
ARG KC_LOG_CONSOLE_OUTPUT=json

# Default user
ARG KEYCLOAK_ADMIN=gao
ARG KEYCLOAK_ADMIN_PASSWORD=change_me

WORKDIR /opt/keycloak

# for demonstration purposes only, please make sure to use proper certificates in production instead
RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore

RUN /opt/keycloak/bin/kc.sh build && /opt/keycloak/bin/kc.sh show-config

ADD --chown=keycloak:keycloak --chmod=644 https://repo1.maven.org/maven2/com/oracle/database/jdbc/ojdbc11/23.5.0.24.07/ojdbc11-23.5.0.24.07.jar /opt/keycloak/providers/ojdbc11.jar
ADD --chown=keycloak:keycloak --chmod=644 https://repo1.maven.org/maven2/com/oracle/database/nls/orai18n/23.5.0.24.07/orai18n-23.5.0.24.07.jar /opt/keycloak/providers/orai18n.jar
ADD --chown=keycloak:keycloak --chmod=644 https://dlm.mariadb.com/3934032/Connectors/java/connector-java-3.5.0/mariadb-java-client-3.5.0.jar /opt/keycloak/providers/mariadb.jar

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="docker/keycloak"
LABEL org.opencontainers.image.title="Keycloak"
LABEL org.opencontainers.image.description="Keycloak is an open source identity and access management solution."
LABEL org.opencontainers.image.documentation="https://www.keycloak.org/documentation"
LABEL org.opencontainers.image.url="https://www.keycloak.org/"
LABEL org.opencontainers.image.build-date=${BUILD_DATE}

# change these values to point to a running mariadb instance
ENV KC_DB=mariadb
ENV KC_DB_URL=<jdbc:mariadb://localhost:3306/keycloak>
ENV KC_DB_USERNAME=keycloak
ENV KC_DB_PASSWORD=keycloak

ENV KC_HOSTNAME=keycloak

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
