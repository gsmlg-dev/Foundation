FROM gcr.io/kaniko-project/executor:latest as kanico

FROM node:lts-alpine

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

RUN apk add --no-cache git curl jq bash \
  && npm install --location=global semantic-release \
    @semantic-release/changelog \
    @semantic-release/git \
    @semantic-release/exec \
    @semantic-release/gitlab \
    @semantic-release/commit-analyzer \
    semantic-release-monorepo \
  && npm install --location=global @microsoft/rush pnpm

ENV NODE_PATH=/usr/local/lib/node_modules

COPY --from=kanico /kaniko/executor /kaniko/executor
ENV DOCKER_CONFIG=/kaniko/.docker/
RUN mkdir -p /kaniko/.docker/

RUN wget https://dl.min.io/client/mc/release/linux-amd64/mc -O /usr/bin/mc \
  && chmod +x /usr/bin/mc

ENTRYPOINT ["/bin/bash", "-c"]
