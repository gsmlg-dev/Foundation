FROM node:lts-slim

ARG DEBIAN_FRONTEND="noninteractive"
ARG NODE_ENV="production"
ARG MESHCENTRAL2_VERSION="0.8.21"

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

