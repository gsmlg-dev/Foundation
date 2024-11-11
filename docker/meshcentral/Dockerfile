FROM node:lts-slim

ARG DEBIAN_FRONTEND="noninteractive"
ARG NODE_ENV="production"
ARG MESHCENTRAL2_VERSION="0.8.21"
ARG BUILD_DATE

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="docker/meshcentral"
LABEL org.opencontainers.image.version="${MESHCENTRAL2_VERSION}"
LABEL org.opencontainers.image.title="MeshCentral2"
LABEL org.opencontainers.image.description="MeshCentral2 is a full computer management web site. With MeshCentral, you can run your own web server to remotely manage and control computers on a local network or anywhere on the internet."
LABEL org.opencontainers.image.builddate=${BUILD_DATE}

RUN apt-get update \
    && apt-get -y install libcap2-bin \
    && rm -rf /var/lib/apt/lists/* \
    && setcap cap_net_bind_service=+ep '/usr/local/bin/node'

RUN mkdir -p /app/node_modules /app/meshcentral-data /app/meshcentral-files && chown -R node:node /app

USER node

WORKDIR /app

EXPOSE 80 443 4433

VOLUME [ "/app/meshcentral-data", "/app/meshcentral-files" ]

RUN npm install --save meshcentral@${MESHCENTRAL2_VERSION}

ENTRYPOINT [ "node", "/app/node_modules/meshcentral/meshcentral.js" ]

