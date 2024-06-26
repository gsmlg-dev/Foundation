FROM alpine as downloader

ENV LANG=C.UTF-8
ENV ENABLE_SERVICE_WORKER=true

WORKDIR /devdocs

RUN apk --update add git \
    && git clone --depth=1 --branch=main --single-branch https://github.com/freeCodeCamp/devdocs.git /devdocs

FROM ruby:3.3.2

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

ENV LANG=C.UTF-8
ENV ENABLE_SERVICE_WORKER=true

WORKDIR /devdocs

RUN apt-get update \
    && apt-get -y install git nodejs libcurl4 \
    && gem install bundler \
    && rm -rf /var/lib/apt/lists/*

COPY --from=downloader /devdocs/Gemfile /devdocs/Gemfile.lock /devdocs/Rakefile /devdocs/

RUN bundle config set system 'true' \
    && bundle config set --local system 'true' \
    && bundle install \
    && rm -rf ~/.gem /root/.bundle/cache /usr/local/bundle/cache

COPY --from=downloader /devdocs /devdocs

VOLUME [ "/devdocs/public/docs", "/devdocs/public/assets" ]

EXPOSE 9292
CMD rackup -o 0.0.0.0
