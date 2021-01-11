FROM ubuntu:20.04

ENV container docker
ENV LC_ALL C
ENV DEBIAN_FRONTEND noninteractive

RUN apt update && apt install -y gnupg \
  && sed -i 's/# deb/deb/g' /etc/apt/sources.list \
  && apt-get install -y systemd systemd-sysv kmod \
  && cd /lib/systemd/system/sysinit.target.wants/ \
  && ls | grep -v systemd-tmpfiles-setup | xargs rm -f $1 \
  && rm -f /lib/systemd/system/multi-user.target.wants/* \
  /etc/systemd/system/*.wants/* \
  /lib/systemd/system/local-fs.target.wants/* \
  /lib/systemd/system/sockets.target.wants/*udev* \
  /lib/systemd/system/sockets.target.wants/*initctl* \
  /lib/systemd/system/basic.target.wants/* \
  /lib/systemd/system/anaconda.target.wants/* \
  /lib/systemd/system/plymouth* \
  /lib/systemd/system/systemd-update-utmp* \
  && echo 'deb http://linux.dell.com/repo/community/openmanage/950/focal focal main' | \
  tee -a /etc/apt/sources.list.d/linux.dell.com.sources.list \
  && gpg --keyserver pool.sks-keyservers.net --recv-key 1285491434D8786F \
  && gpg -a --export 1285491434D8786F | apt-key add - \
  && apt update && apt install -y srvadmin-all \
  && apt-get clean \
  && rm -rf /tmp/* /var/cache/* /var/lib/apt/lists/*
