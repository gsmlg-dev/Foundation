FROM gcr.io/kaniko-project/executor:latest as kanico

FROM node:lts-alpine

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

RUN apk add --update git curl jq bash \
  && npm i -g semantic-release \
    @semantic-release/changelog \
    @semantic-release/git \
    @semantic-release/exec \
    @semantic-release/gitlab

ENV NODE_PATH=/usr/local/lib/node_modules

COPY --from=kanico /kaniko/executor /kaniko/executor
ENV DOCKER_CONFIG=/kaniko/.docker/
RUN mkdir -p /kaniko/.docker/

ENTRYPOINT ["/bin/bash", "-c"]
