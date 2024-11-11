ARG RUBY_VERSION="3.3.6"
ARG BUILD_MONTH="2024-11"
ARG BUILD_DATE="2024-11-11"

FROM ruby:$RUBY_VERSION

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL BUILD_MONTH="$BUILD_MONTH"
LABEL BUILD_DATE="$BUILD_DATE"
LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="docker/devdocs"

ENV LANG=C.UTF-8
ENV ENABLE_SERVICE_WORKER=true

WORKDIR /devdocs

RUN apt-get update \
    && apt-get -y install git nodejs libcurl4 \
    && gem install bundler \
    && rm -rf /var/lib/apt/lists/*

COPY ./devdocs/Gemfile ./devdocs/Gemfile.lock ./devdocs/Rakefile /devdocs/

RUN bundle config set system 'true' \
    && bundle config set --local system 'true' \
    && bundle install \
    && rm -rf ~/.gem /root/.bundle/cache /usr/local/bundle/cache

COPY ./devdocs /devdocs

VOLUME [ "/devdocs/public/docs", "/devdocs/public/assets" ]

EXPOSE 9292

ENV PORT=9292

CMD ["rackup", "-o", "0.0.0.0", "-p", "\$PORT"]
