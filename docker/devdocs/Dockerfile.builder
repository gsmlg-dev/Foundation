FROM gsmlg/devdocs:downloader as downloader
FROM ruby:2.7.4-alpine

COPY --from=downloader /devdocs /devdocs

WORKDIR /devdocs

RUN apk --update add nodejs build-base libstdc++ gzip git zlib-dev libcurl \
    && gem install bundler \
    && bundle install --without test
