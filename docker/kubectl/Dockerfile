FROM alpine:3.12

LABEL maintainer="gsmlg.com@gmail.com"

# install kubectl
RUN export A=`arch`; \
  case "$A" in;\
  x86_64); export ARCH=amd64;; \
  aarch64); export ARCH=arm64;; \
  *); echo "Not supported architecture" && exit 1;; \
  esac; \
  curl -sSfLo kubectl "https://storage.googleapis.com/kubernetes-release/release/v1.20.2/bin/linux/${ARCH}/kubectl" \
  && chmod +x kubectl \
  && sudo mv kubectl /usr/local/bin/kubectl