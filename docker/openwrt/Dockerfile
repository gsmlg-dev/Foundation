FROM gsmlg/build-base:focal

RUN git clone --depth 1 --single-branch --branch openwrt-21.02 https://git.openwrt.org/openwrt/openwrt.git /openwrt

RUN cd /openwrt && ./scripts/feeds update -a \
    && ./scripts/feeds install -a

COPY config /openwrt/.config

RUN cd /openwrt && FORCE_UNSAFE_CONFIGURE=1 make

