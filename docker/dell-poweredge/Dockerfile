FROM ubuntu:20.04

RUN echo 'deb http://linux.dell.com/repo/community/openmanage/950/focal focal main' | tee -a /etc/apt/sources.list.d/linux.dell.com.sources.list && \
  apt update && apt install -y gpg && \
  gpg --keyserver pool.sks-keyservers.net --recv-key 1285491434D8786F && \
  gpg -a --export 1285491434D8786F | sudo apt-key add - && \
  apt update && \
  apt install -y srvadmin-all && \
  rm -rf /tmp/* && rm -rf /var/cache/*

