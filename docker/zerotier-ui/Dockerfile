ARG ZT_UI_COMMIT=9d417a93cde92b86ae5d22169e9e10dcbb189e5a
ARG ZT_UI_VERSION=1.0.21


FROM alpine:3.14 AS source

RUN apk add git \
    && git clone https://github.com/dec0dOS/zero-ui.git /src \
    && git checkout -f ${ZT_UI_COMMIT}


FROM node:16-alpine as build-stage

ENV INLINE_RUNTIME_CHUNK=false
ENV GENERATE_SOURCEMAP=false

RUN yarn set version berry

WORKDIR /app/frontend
COPY --from=source /src/frontend/package*.json /app/frontend
COPY --from=source /src/frontend/yarn.lock /app/frontend
RUN yarn install

COPY --from=source /src/frontend /app/frontend
RUN yarn build


FROM node:16-alpine

ARG ZT_UI_VERSION

LABEL org.opencontainers.image.title="ZeroTier UI" \
      org.opencontainers.image.version="v${ZT_UI_VERSION}" \
      org.opencontainers.image.description="ZeroTier UI as Docker Image" \
      org.opencontainers.image.licenses="GPL" \
      org.opencontainers.image.source="https://github.com/gsmlg-dev/Foundation/tree/main/docker/zerotier-ui"

WORKDIR /app/frontend/build
COPY --from=build-stage /app/frontend/build /app/frontend/build/

WORKDIR /app/backend
COPY --from=source /src/backend/package*.json /app/backend
COPY --from=source /src/backend/yarn.lock /app/backend
RUN yarn install

COPY --from=source /src/backend /app/backend

EXPOSE 4000
ENV NODE_ENV=production
ENV ZU_SECURE_HEADERS=true
ENV ZU_SERVE_FRONTEND=true

CMD [ "node", "./bin/www" ]
