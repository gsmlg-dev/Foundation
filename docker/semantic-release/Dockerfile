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
    @semantic-release/release-notes-generator \
    semantic-release-monorepo \
  && npm install --location=global @microsoft/rush pnpm

# install erlang and elixir
RUN apk add --no-cache erlang elixir
RUN mix local.hex --force && mix local.rebar --force || echo "fail to run local.hex or local.rebar"

ENV NODE_PATH=/usr/local/lib/node_modules

COPY --from=kanico /kaniko/executor /kaniko/executor
ENV DOCKER_CONFIG=/kaniko/.docker/
RUN mkdir -p /kaniko/.docker/

RUN wget https://dl.min.io/client/mc/release/linux-$(case "$(arch)" in "x86_64") echo amd64 ;; "aarch64") echo arm64 ;; *) "unknow" ;; esac)/mc -O /usr/bin/mc \
  && chmod +x /usr/bin/mc

ENTRYPOINT ["/bin/bash", "-c"]
