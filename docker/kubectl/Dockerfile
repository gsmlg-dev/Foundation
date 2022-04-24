FROM gsmlg/curl:latest AS builder

ARG KUBE_VERSION="1.22"

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"

# install kubectl
RUN export A=`arch`; \
  case "$A" in \
  x86_64) \
  export ARCH=amd64 \
  ;; \
  aarch64) \
  export ARCH=arm64 \
  ;; \
  *) \
  echo "Not supported architecture"; \
  exit 1; \
  ;; \
  esac; \
  curl -sSfLo kubectl "https://storage.googleapis.com/kubernetes-release/release/v${KUBE_VERSION}/bin/linux/${ARCH}/kubectl" \
  && chmod +x kubectl \
  && mv kubectl /usr/local/bin/kubectl


FROM alpine

ARG KUBE_VERSION="1.22"

LABEL mantainer="Jonathan Gao <gsmlg.com@gmail.com>"
LABEL kubernetes_version="${KUBE_VERSION}"

COPY --from=builder /usr/local/bin/kubectl /usr/local/bin/kubectl

ENTRYPOINT ["/usr/local/bin/kubectl"]
