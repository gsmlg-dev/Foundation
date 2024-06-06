ARG ZT_UI_COMMIT=00592d9ad498c2ddb0569def3d65aff88773e55f
ARG ZT_UI_VERSION=1.5.8


FROM alpine:3.20 AS source

RUN apk add --update git \
    && git clone https://github.com/dec0dOS/zero-ui.git /src \
    && git -C /src checkout -f ${ZT_UI_COMMIT}


FROM node:lts-alpine as build-stage

ENV INLINE_RUNTIME_CHUNK=false
ENV GENERATE_SOURCEMAP=false

RUN yarn set version berry

COPY --from=source /src/frontend /app/frontend

WORKDIR /app/frontend

RUN yarn install \
    && yarn run build


FROM node:lts-alpine

ARG ZT_UI_VERSION

LABEL org.opencontainers.image.title="ZeroTier UI" \
      org.opencontainers.image.version="v${ZT_UI_VERSION}" \
      org.opencontainers.image.description="ZeroTier UI as Docker Image" \
      org.opencontainers.image.licenses="GPL" \
      org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation/tree/main/docker/zerotier-ui"

COPY --from=build-stage /app/frontend/build /app/frontend/build/
COPY --from=source /src/backend /app/backend

WORKDIR /app/backend

RUN yarn install

EXPOSE 4000
ENV NODE_ENV=production
ENV ZU_SECURE_HEADERS=true
ENV ZU_SERVE_FRONTEND=true

CMD [ "node", "./bin/www" ]
