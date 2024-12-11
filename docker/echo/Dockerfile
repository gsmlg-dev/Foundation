FROM docker.io/library/golang:alpine as builder

COPY echo.go /go

RUN CGO_ENABLED=0 go build echo.go

FROM scratch

LABEL maintainer="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation"
LABEL org.opencontainers.image.source.path="docker/echo"
LABEL org.opencontainers.image.title="Echo-Server"
LABEL org.opencontainers.image.authors="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL org.opencontainers.image.description="Echo-Server reply and dump output to console"
LABEL org.opencontainers.image.licenses=MIT

ENV PORT=80

COPY --from=builder /go/echo /echo

ENTRYPOINT [ "/echo" ]
