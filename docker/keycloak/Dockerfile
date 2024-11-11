FROM quay.io/keycloak/keycloak:latest as builder

# Features
ARG KC_FEATURES="authorization,account2,account-api,admin-fine-grained-authz,admin-api,admin2,impersonation,web-authn,client-policies,ciba,map-storage,par,declarative-user-profile,dynamic-scopes,step-up-authentication"

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

RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:latest
COPY --from=builder /opt/keycloak/ /opt/keycloak/

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="docker/keycloak"

# change these values to point to a running postgres instance
ENV KC_DB_URL=<jdbc:mariadb://localhost:3306/keycloak>
ENV KC_DB_USERNAME=keycloak
ENV KC_DB_PASSWORD=keycloak

ENV KC_HOSTNAME=keycloak

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
