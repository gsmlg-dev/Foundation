ARG ALPINE_IMAGE=alpine
ARG ALPINE_VERSION=3.14
ARG ZT_COMMIT=3c7bd65bc929a086f3fea04e7371c817bbf77a86
ARG ZT_VERSION=1.8.1

FROM ${ALPINE_IMAGE}:${ALPINE_VERSION} as builder

RUN apk add --update alpine-sdk linux-headers \
  && git clone https://github.com/zerotier/ZeroTierOne.git /src \
  && git -C /src checkout -f ${ZT_COMMIT} \
  && cd /src \
  && make -f make-linux.mk

FROM ${ALPINE_IMAGE}:${ALPINE_VERSION}

ARG ZT_VERSION

LABEL org.opencontainers.image.title="ZeroTier" \
      org.opencontainers.image.version="v${ZT_VERSION}" \
      org.opencontainers.image.description="ZeroTier One as Docker Image" \
      org.opencontainers.image.licenses="GPL" \
      org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation/tree/main/docker/zerotier"

COPY --from=builder /src/zerotier-one /usr/sbin/zerotier-one

RUN apk add --no-cache --purge --clean-protected --update libc6-compat libstdc++ \
  && mkdir -p /var/lib/zerotier-one \
  && ln -s /usr/sbin/zerotier-one /usr/sbin/zerotier-idtool \
  && ln -s /usr/sbin/zerotier-one /usr/sbin/zerotier-cli \
  && rm -rf /var/cache/apk/*

EXPOSE 9993/udp

VOLUME ["/var/lib/zerotier-one"]

ENTRYPOINT ["/usr/sbin/zerotier-one"]

CMD ["-U"]
