FROM gcr.io/kaniko-project/executor:latest as kanico

FROM node:lts-alpine

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

RUN apk add --update git curl jq bash \
  && npm install --location=global semantic-release \
    @semantic-release/changelog \
    @semantic-release/git \
    @semantic-release/exec \
    @semantic-release/gitlab \
  && npm install --location=global @microsoft/rush

ENV NODE_PATH=/usr/local/lib/node_modules

COPY --from=kanico /kaniko/executor /kaniko/executor
ENV DOCKER_CONFIG=/kaniko/.docker/
RUN mkdir -p /kaniko/.docker/

RUN wget https://dl.min.io/client/mc/release/linux-amd64/mc -O /usr/bin/mc \
  && chmod +x /usr/bin/mc

ENTRYPOINT ["/bin/bash", "-c"]
