# Using Docker

## 什么是 Docker

Docker 利用现有的 Linux 容器技术，以不同方式将其封装及扩展
--主要是通过提供可以值的镜像，以及一个用户友好的接口
--来创建一套完整的容器创建及发布方案

Docker 平台拥有两个不同部分

- 负责创建与运行容器的 Docker Engine
- 用来发布容器的云服务 Docker Hub

Docker 的哲学经常用航运集装箱的比喻来解释，这或许能解释 Docker 名字的由来。

这个比喻大概是这样：

    运输货物时，要用到不同的运输工具，可能包括货车、叉车、起重机、火车和轮船。
    这意味着这些工具必须可以处理大小不一，运输需求各异的货物。
    以往这是一道复杂的工序，需要付出大量的人力、物力。
    联运集装箱的诞生为运输产业带来了一场革命。
    集装箱的大小有了统一标准，并且设计的出发点是能以最少的人力在不同的运输方式之间搬运。
    所有运输机械都为运送集装箱而设计。运输不同类型物品可以使用不同的集装箱。
    因此运输产业只需要专注于处理集装箱的运输及存储问题，而集装箱内的物品完全由生产商负责。

    Docker 的目的是把集装箱的标准化流程运用到IT行业中去。
    如今的典型系统可能包括Javascript框架、NoSQL数据库、消息队列、REST API，
    以及由各个不同编程语言所写的后端。
    而这个组合的全部或部分可能需要运行到不同的环境中，从开发者的笔记本电脑， 到公司内的测试集群，再到云端的生产环境。
    每个环境都存在差异，他们存在不同的操作系统和不同的程序库。我们需要付出巨大的人力来在不同环境之间移动这些应用。
    Docker容器简化了应用程序的移动，好比集装箱一样。
    开发人员只需专注开发，再也不用担心测试和发布时环境以及依赖关系带来的问题。
    运维部门只需专注于运行容器的核心问题。

## 安装 Docker

Docker 需要运行于 64 位的 Linux 系统上，内核版本需要大于 3.10

macOS 可以从`docker.com`下载到 docker-ce 版本安装使用

可以使用`homebrew`来安装

```
brew cask install docker
```

Ubuntu 系统安装

```
sudo apt-get remove docker docker-engine docker.io
apt-get update

apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

apt-key fingerprint 0EBFCD88

pub   4096R/0EBFCD88 2017-02-22
      Key fingerprint = 9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
uid                  Docker Release (CE deb) <docker@docker.com>
sub   4096R/F273FCD8 2017-02-22

add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

apt-get update

apt-get install docker-ce

```

## 运行 Docker

### images 镜像

docker 镜像是一个构建好的 docker 环境，可以使用 docker 直接启动一个镜像

```
docker run debian
```

运行镜像会自动从`docker hub`下载对应的镜像，并运行

运行镜像会自动创建一个 container

查看运行中的 container：

```
docker ps
```

运行一个交互式镜像

```
docker run --rm -it gsmlg/phoenix
# -i interactive
# -t terminal
# --rm remove after run
```

当 docker 运行后会生成一个 container
可以通过

```
docker ps -a
```

查看所有 docker containers

删除无用的 container

```
docker rm -v $(docker ps -aq -f status=exited)
```

### Docker 镜像构建与发布

#### Dockerfile

docker 构建一个镜像需要通过 Dockerfile 文件来配置镜像的内容

一个构建的 Dockerfile 内容：

```
FROM alpine

MAINTAINER GSMLG < me@gsmlg.org >

RUN apk update \
    && apk add curl \
    && apk add stunnel \
    && apk add squid \
    && rm -rf /var/cache/apk/*

COPY stunnel.conf pkey.pem cert.pem /etc/stunnel/

EXPOSE 443

COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]
```

Dockerfile 配置说明

#### push and pull

`push`: 将本地镜像推送到远程

`pull`: 拉取远程镜像

### 通过 Docker Compose 运行

docker compose 通过 yaml 指定 docker 启动配置参数

#### Docker Registry

```
registry:
  restart: always
  image: registry:2
  ports:
    - 127.0.0.1:5000:5000
  volumes:
    - ./data:/var/lib/registry

```

### Docker Machine

运行本地或远程的 docker 主机

自动创建管理移除
