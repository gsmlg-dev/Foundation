FROM docker.io/gsmlg/curl as downloader

ARG LICENSE

WORKDIR /

RUN curl -vL "https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=${LICENSE}&suffix=tar.gz" -o db.tar.gz \
  && tar zxf db.tar.gz --strip-components 1

FROM golang:1.22 as builder

ARG USER
ARG TOKEN
ARG GOPRIVATE
ARG CGO_ENABLED=0

WORKDIR /app

COPY . /app

COPY --from=downloader /GeoLite2-City.mmdb /app/GeoLite2-City.mmdb

RUN echo "machine github.com login ${USER} password ${TOKEN}" >> $HOME/.netrc \
  && go build -o geoip2 -trimpath geoip2.go

FROM scratch

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

COPY --from=builder /app/geoip2 /geoip2

CMD ["-h"]
ENTRYPOINT [ "/geoip2" ]
