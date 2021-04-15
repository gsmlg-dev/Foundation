FROM gsmlg/build-base:focal as builder

RUN git clone --depth 1 --single-branch --branch openwrt-21.02 https://git.openwrt.org/openwrt/openwrt.git /openwrt

COPY config /openwrt/.config

RUN cd /openwrt \
    && ./scripts/feeds update -a \
    && ./scripts/feeds install -a \
    && sed -i 's/ noinitrd//g' target/linux/x86/image/*.cfg \
    && FORCE_UNSAFE_CONFIGURE=1 make

FROM alpine

COPY --from=builder /openwrt/bin /openwrt

