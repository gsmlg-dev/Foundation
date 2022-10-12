# Foundation

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/gsmlg-dev/Foundation)
[![commits](https://badgen.net/github/commits/gsmlg-dev/Foundation/main)](https://github.com/gsmlg-dev/Foundation)
[![last commit](https://badgen.net/github/last-commit/gsmlg-dev/Foundation/main)](https://github.com/gsmlg-dev/Foundation)
[![tags](https://badgen.net/github/tags/gsmlg-dev/Foundation)](https://github.com/gsmlg-dev/Foundation)
[![license](https://badgen.net/github/license/gsmlg-dev/Foundation)](https://github.com/gsmlg-dev/Foundation)


My software foundation.

This repo will include all my public software, scripts, configs and CI system.


## What is this repo?

My github repo aggregation.

I've manage too many repositories, that I have to combine them to one so that I can manage them easily.


## Repos

- [golang](golang)

    - [geoip2-server](golang/geoip2-server)

    GeoIP2 server

    - [pac-server](golang/pac-server)

    PAC (Proxy Auto-Config) file server.

    - [caddy-static](golang/caddy-static)

    A caddy module that build static site into caddy server.


- [docker](docker)

    My docker images

    - [antlr](docker/antlr)
    Another Tool for Language Recognition.
    [Repo Link](https://hub.docker.com/r/gsmlg/antlr/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/antlr)](https://hub.docker.com/r/gsmlg/antlr)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-antlr.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-antlr.yml)

    - [baidupcs-go](docker/baidupcs-go)
    Baidu Cloud Disk conmandline tools.
    [Repo Link](https://hub.docker.com/r/gsmlg/baidupcs-go/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/baidupcs-go)](https://hub.docker.com/r/gsmlg/baidupcs-go)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-baidupcs-go.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-baidupcs-go.yml)

    - [caddy](docker/caddy)
    Caddy reverse proxy server, multi architecture at github release.
    [Repo Link](https://hub.docker.com/r/gsmlg/caddy/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/caddy)](https://hub.docker.com/r/gsmlg/caddy)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-caddy.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-caddy.yml)

    - [code-server](docker/code-server)
    VS Code Server edition, download and change to use zsh, base on ubuntu.
    [Repo Link](https://hub.docker.com/r/gsmlg/code-server/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/code-server)](https://hub.docker.com/r/gsmlg/code-server)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-code-server.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-code-server.yml)

    - [couchdb](docker/couchdb)
    Couchdb Server.
    [Repo Link](https://hub.docker.com/r/gsmlg/couchdb/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/couchdb)](https://hub.docker.com/r/gsmlg/couchdb)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-couchdb.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-couchdb.yml)

    - [curl](docker/curl)
    Minimal curl base on alpine.
    [Repo Link](https://hub.docker.com/r/gsmlg/curl/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/curl)](https://hub.docker.com/r/gsmlg/curl)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-curl.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-curl.yml)

    - [dell-openmanage](docker/dell-openmanage)
    Dell openmanage package. Use to automate manage server through iDrac base on centos 7.
    [Repo Link](https://hub.docker.com/r/gsmlg/dell-openmanage/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/dell-openmanage)](https://hub.docker.com/r/gsmlg/dell-openmanage)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-dell-openmanage.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-dell-openmanage.yml)

    - [dell-poweredge](docker/dell-poweredge)
    Dell openmanage package. Use to automate manage server through iDrac base on ubuntu, not work yet.
    [Repo Link](https://hub.docker.com/r/gsmlg/dell-poweredge/tags)

    <!--
    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/dell-poweredge)](https://hub.docker.com/r/gsmlg/dell-poweredge) 
    -->
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-dell-poweredge.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-dell-poweredge.yml)

    - [devdocs](docker/devdocs)
    A devdocs.io mirror image to local use.
    [Repo Link](https://hub.docker.com/r/gsmlg/devdocs/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/devdocs)](https://hub.docker.com/r/gsmlg/devdocs)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-devdocs.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-devdocs.yml)

    - [echo](docker/echo).
    Http dump service, using for test http.
    [Repo Link](https://hub.docker.com/r/gsmlg/echo/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/echo)](https://hub.docker.com/r/gsmlg/echo)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-echo.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-echo.yml)

    - [editor-server](docker/editor-server)
    My cloud editor, base on my code-server, add a lot of usefull support.
    [Repo Link](https://hub.docker.com/r/gsmlg/editor-server/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/editor-server)](https://hub.docker.com/r/gsmlg/editor-server)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-editor-server.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-editor-server.yml)

    - [go-ethereum](docker/go-ethereum)
    Golang implementation of the Ethereum.
    [Repo Link](https://hub.docker.com/r/gsmlg/go-ethereum/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/go-ethereum)](https://hub.docker.com/r/gsmlg/go-ethereum)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-go-ethereum.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-go-ethereum.yml)

    - [kubectl](docker/kubectl)
    The `kubectl` command.
    [Repo Link](https://hub.docker.com/r/gsmlg/kubectl/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/kubectl)](https://hub.docker.com/r/gsmlg/kubectl)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-kubectl.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-kubectl.yml)

    - [log-forwarder](docker/log-forwarder)
    Forward log to couchdb.
    [Repo Link](https://hub.docker.com/r/gsmlg/log-forwarder/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/log-forwarder)](https://hub.docker.com/r/gsmlg/log-forwarder)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-log-forwarder.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-log-forwarder.yml)

    - [mariadb](docker/mariadb)
    My mariadb distribution, with galera clusster.
    [Repo Link](https://hub.docker.com/r/gsmlg/mariadb/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/mariadb)](https://hub.docker.com/r/gsmlg/mariadb)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-mariadb.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-mariadb.yml)

    - [meshcentral](docker/meshcentral)
    MeshCentral controll computers anywhere.
    [Repo Link](https://hub.docker.com/r/gsmlg/meshcentral/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/meshcentral)](https://hub.docker.com/r/gsmlg/meshcentral)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-meshcentral.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-meshcentral.yml)

    - [nginx](docker/nginx)
    Reverse proxy service, also for static site.
    [Repo Link](https://hub.docker.com/r/gsmlg/nginx/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/nginx)](https://hub.docker.com/r/gsmlg/nginx)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-nginx.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-nginx.yml)

    - [openssl](docker/openssl)
    OpenSSL, base on ubuntu, manage CA.
    [Repo Link](https://hub.docker.com/r/gsmlg/openssl/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/openssl)](https://hub.docker.com/r/gsmlg/openssl)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-openssl.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-openssl.yml)

    - [openwrt](docker/openwrt)
    OpenWRT, Create OpenWRT image, can not run on github actions, because action space is not enough.
    [Repo Link](https://hub.docker.com/r/gsmlg/openwrt/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/openwrt)](https://hub.docker.com/r/gsmlg/openwrt)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-openwrt.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-openwrt.yml)

    - [phoenix](docker/phoenix)
    My phoenix project base image.
    [Repo Link](https://hub.docker.com/r/gsmlg/phoenix/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/phoenix)](https://hub.docker.com/r/gsmlg/phoenix)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-phoenix.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-phoenix.yml)

    - [snapdrop](docker/snapdrop)
    My snapdrop project base image.
    [Repo Link](https://hub.docker.com/r/gsmlg/snapdrop/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/snapdrop)](https://hub.docker.com/r/gsmlg/snapdrop)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-snapdrop.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-snapdrop.yml)

    - [squid](docker/squid)
    Proxy service.
    [Repo Link](https://hub.docker.com/r/gsmlg/squid/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/squid)](https://hub.docker.com/r/gsmlg/squid)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-squid.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-squid.yml)

    - [stunnel](docker/stunnel)
    Encrypt connection service.
    [Repo Link](https://hub.docker.com/r/gsmlg/stunnel/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/stunnel)](https://hub.docker.com/r/gsmlg/stunnel)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-stunnel.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-stunnel.yml)

    - [unbound](docker/unbound)
    Encrypt connection service.
    [Repo Link](https://hub.docker.com/r/gsmlg/unbound/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/unbound)](https://hub.docker.com/r/gsmlg/unbound)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-unbound.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-unbound.yml)

    - [varnish](docker/varnish)
    Varnish Cache server.
    [Repo Link](https://hub.docker.com/r/gsmlg/varnish/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/varnish)](https://hub.docker.com/r/gsmlg/varnish)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-varnish.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-varnish.yml)

    - [zerotier](docker/zerotier)
    Open source network switch.
    [Repo Link](https://hub.docker.com/r/gsmlg/zerotier/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/zerotier)](https://hub.docker.com/r/gsmlg/zerotier)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-zerotier.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-zerotier.yml)

    - [zerotier-ui](docker/zerotier-ui)
    Zerotier One management ui.
    [Repo Link](https://hub.docker.com/r/gsmlg/zerotier-ui/tags)

    [![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/zerotier-ui)](https://hub.docker.com/r/gsmlg/zerotier-ui)
    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-zerotier-ui.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-zerotier-ui.yml)


- [rust](rust)
    - [chat](rust/chat)
    Rust Chat client use http comet technique. 

    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/rust-chat-release.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/rust-chat-release.yml)


- [flutter](flutter)

    - [mirror](flutter/mirror)
    Mirror, phone app, a magic mirror.

    [![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/flutter-mirror-release.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/flutter-mirror-release.yml)


## Use sementic release

If a dir is develop by me, can use @gsmlg/semantic-release-action, like so:

```yaml
  - name: 🚀 Release
    uses: gsmlg/semantic-release-action@v3
    with:
        release_name: <Release name>
        working-directory: <Project directory>
    env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

and also need to add a `.release.yaml` file in directory like so:

```yaml
extends: "semantic-release-monorepo"
repositoryUrl: https://github.com/gsmlg-dev/Foundation.git
plugins:
  - '@semantic-release/commit-analyzer'
  - '@semantic-release/release-notes-generator'
  - '@semantic-release/github'
  - - "@semantic-release/exec"
    - "prepareCmd" : "echo ${nextRelease.version}"
      "publishCmd" : "echo pubhlish <name> ${nextRelease.version}"
branches:
  - +([0-9])?(.{+([0-9]),x}).x
  - main
  - next
  - next-major
  - {name: 'beta', prerelease: true}
  - {name: 'alpha', prerelease: true}

```

## Commit Message Type

Must be one of the following:

* feat: A new feature
* fix: A bug fix
* docs: Documentation only changes
* style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* refactor: A code change that neither fixes a bug nor adds a feature
* perf: A code change that improves performance
* test: Adding missing or correcting existing tests
* chore: Changes to the build process or auxiliary tools and libraries such as documentation generation



