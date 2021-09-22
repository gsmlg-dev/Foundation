FROM gsmlg/devdocs:builder as builder

FROM gsmlg/devdocs:runner

LABEL maintainer="GSMLG < me@gsmlg.org >"

COPY --from=builder /devdocs /devdocs

VOLUME [ "/devdocs/public/docs" ]

EXPOSE 9292
CMD bundle exec rackup -o 0.0.0.0
