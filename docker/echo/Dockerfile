FROM golang:alpine as builder

COPY echo.go /go

RUN CGO_ENABLED=0 go build echo.go

FROM scratch

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

ENV PORT=80

COPY --from=builder /go/echo /echo

ENTRYPOINT [ "/echo" ]
