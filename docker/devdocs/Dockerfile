FROM ruby:2.7.4-alpine

ENV LANG=C.UTF-8
ENV ENABLE_SERVICE_WORKER=true

LABEL DOWNLOAD_SCRIPT "thor docs:download --all && thor assets:compile"

WORKDIR /devdocs

RUN apk --update add nodejs build-base libstdc++ gzip git zlib-dev libcurl \
    && gem install bundler \
    && git clone --depth=1 --branch=main --single-branch https://github.com/freeCodeCamp/devdocs.git /devdocs \
    && bundle install --system --without test \
    && rm -rf /var/cache/apk/* /tmp ~/.gem /root/.bundle/cache \
    /usr/local/bundle/cache /usr/lib/node_modules

VOLUME [ "/devdocs/public/docs" ]

EXPOSE 9292
CMD rackup -o 0.0.0.0