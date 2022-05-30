ARG VERSION=3.10
FROM python:$VERSION

MAINTAINER gsmlg <gsmlg.com@gmail.com>

ARG DEBIAN_FRONTEND=noninteractive
ARG TZ=Asia/Shanghai
ENV TZ=$TZ

RUN echo "${TZ}" > /etc/timezone

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

RUN apt-get update && apt-get install -y vim && rm -rf /var/cache/apt/*

RUN pip install --no-cache-dir pipenv

