FROM gsmlg/curl as downloader

ARG LICENSE

WORKDIR /

RUN curl -vL "https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=${LICENSE}&suffix=tar.gz" -o db.tar.gz \
  && tar zxf db.tar.gz --strip-components 1

FROM golang:alpine as builder

ARG CGO_ENABLED=0

COPY ./geoip2.go /go/
COPY ./go.mod /go/
COPY ./go.sum /go/

RUN go get && go build -o geoip2 geoip2.go

FROM scratch

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"

COPY --from=downloader /GeoLite2-City.mmdb /GeoLite2-City.mmdb
COPY --from=builder /go/geoip2 /geoip2

CMD ["-h"]
ENTRYPOINT [ "/geoip2" ]
