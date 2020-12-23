FROM golang:alpine as builder

COPY echo.go /go

RUN CGO_ENABLED=0 go build echo.go

FROM scratch

LABEL maintainer="GSMLG <me@gsmlg.org>"

EXPOSE 80

COPY --from=builder /go/echo /echo

ENTRYPOINT [ "/echo" ]
