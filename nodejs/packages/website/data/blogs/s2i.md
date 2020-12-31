## `Source to Image`

`Source-to-Image` (`s2i`) 是由`openshift`提供的一套从自动从代码构建到镜像的工具和流程。

S2I 提供了一套镜像模版来对多种语言和矿建进行构建

### 应用

`s2i` 适用于将已有程序迁移到 docker 镜像。
`s2i`提供了各类的 builder 镜像，可以针对不同的应用快速的完成构建。
用户不再需要在为应用编写 Dockerfile，也不再需要在构建过程中运行安装依赖程序
`s2i`可以对构建镜像进行版本管理，向控制代码仓库一样控制 build 环境
`s2i`提供了可以持续流程，可以进行递增的项目编译，从而大大减少构建时间

### 原理

`s2i`提供了 builder 镜像，提供了完整的编译运行环境。
`s2i`会把代码注入到 builder 镜像中。在 builder 镜像中对源码进行处理，使其可以被运行。

处理脚本：

- assemble 执行 build
- run 运行
- save-artifacts 保存构建供后续使用 optional
- usage 显示使用信息 optional

### 创建 Builder 镜像

为`singlecloud`创建一个镜像

#### 安装`s2i`命令

```shell
curl -sSL https://github.com/zdnscloud/s2i/releases/download/v1.0/s2i.tar.gz | tar zxf - -C /usr/local/bin/ s2i
```

#### 创建`s2i builder`模版

```shell
s2i create s2i-singlecloud sc
# 进入模版目录
cd sc
```

模版中提供了两个命令来处理

- make build 构建 builder 镜像
- make test 测试 builder 镜像

##### 修改 Dockerfile 文件

```Dockerfile
# s2i-singlecloud
FROM golang:1.12.5-alpine3.9

# TODO: Put the maintainer name in the image metadata
# LABEL maintainer="Your Name <your@email.com>"
LABEL maintainer="GSMLG <me@gsmlg.org>"

# TODO: Rename the builder environment variable to inform users about application you provide them
ENV BUILDER_VERSION 1.0

# TODO: Set labels used in OpenShift to describe the builder image
LABEL io.k8s.description="Platform for building singlecloud" \
      io.k8s.display-name="singlecloud builder" \
      io.openshift.expose-services="80:http" \
      io.openshift.s2i.scripts-url=image:///usr/libexec/s2i \
      io.openshift.tags="builder,go,node"

USER root
# TODO: Install required packages here:
RUN mkdir -p /go/src/github.com/zdnscloud/singlecloud && apk upate && apk add bash && rm -rf /var/cache/apk/

WORKDIR /go/src/github.com/zdnscloud/singlecloud

# TODO: Copy the S2I scripts to /usr/libexec/s2i, since openshift/base-centos7 image
# sets io.openshift.s2i.scripts-url label that way, or update that label
COPY ./s2i/bin /usr/libexec/s2i

# This default user is created in the openshift/base-centos7 image
#USER 1001

# TODO: Set the default port for applications built using this image
EXPOSE 80

# TODO: Set the default CMD for the image
CMD ["/usr/libexec/s2i/usage"]
```

##### 修改`s2i/bin/assemble`

```bash
#!/bin/bash -e
#
# S2I assemble script for the 's2i-singlecloud-builder' image.
# The 'assemble' script builds your application source so that it is ready to run.
#
# For more information refer to the documentation:
#   https://github.com/openshift/source-to-image/blob/master/docs/builder_image.md
#

# If the 's2i-singlecloud' assemble script is executed with the '-h' flag, print the usage.
if [[ "$1" == "-h" ]]; then
    exec /usr/libexec/s2i/usage
fi

# Restore artifacts from the previous build (if they exist).
#
if [ "$(ls /tmp/artifacts/ 2>/dev/null)" ]; then
  echo "---> Restoring build artifacts..."
  mv /tmp/artifacts/. ./
fi

echo "---> Installing application source..."
cp -Rf /tmp/src/. ./

echo "---> Building application from source..."
# TODO: Add build steps for your application, eg npm install, bundle install, pip install, etc.
go build cmd/singlecloud/singlecloud.go
mv singlecloud /go/bin/
```

##### 修改`s2i/bin/run`

```bash
#!/bin/bash -e
#
# S2I run script for the 's2i-singlecloud-builder' image.
# The run script executes the server that runs your application.
#
# For more information see the documentation:
#   https://github.com/openshift/source-to-image/blob/master/docs/builder_image.md
#

exec /go/bin/singlecloud
```

#### 创建 builder 镜像

```bash
make build
```

#### Build `singlecloud`

```bash
s2i build https://github.com/zdnscloud/singlecloud s2i-singlecloud singlecloud
```

#### 运行`singlecloud`

```bash
docker run -p 8080:80 --rm singlecloud singlecloud -listen :80
```
