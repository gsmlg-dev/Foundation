FROM node:lts-alpine

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

RUN apk add --update git \
  && npm i -g semantic-release @semantic-release/changelog @semantic-release/git @semantic-release/exec

ENV NODE_PATH=/usr/local/lib/node_modules

ENTRYPOINT ["/bin/sh"]