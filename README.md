# Foundation

My personal foundation.

This repo will include all my public software, scripts, configs and CI system.

## What is this repo?

My github repo aggregation.

I've manage too many repositories, that I have to combine them to one so that I can manage them easily.

## Repos

- [nodejs](nodejs)
    - [scripts](nodejs/packages/scripts)
    gsmlg-scripts(@gsmlg/scripts) Support open source project build, format, lint, pre-commit, validate and typecheck
    - [website](nodejs/packages/website)
    My website, now at gsmlg.github.io
    TODO: Start my backend service.
- [golang](golang)
    - [dingding-oapi](golang/dingding-oapi)
    Dingding go package that support ding message to ding group.
- [docker](docker)
My docker images
    - [code-server](docker/code-server)
    VS Code Server edition, download and change to use zsh, base on ubuntu.
    - [curl](docker/curl)
    Minimal curl base on alpine
    - [dell-openmanage](docker/dell-openmanage)
    Dell openmanage package. Use to automate manage server through iDrac base on centos 7.
    - [dell-poweredge](docker/dell-poweredge)
    Dell openmanage package. Use to automate manage server through iDrac base on ubuntu, not work yet.
    - [echo](docker/echo).
    Http dump service, using for test http.
    - [editor-server](docker/editor-server)
    My cloud editor, base on my code-server, add a lot of usefull support.
    - [go-ethereum](docker/go-ethereum)
    Golang implementation of the Ethereum.
    - [kubectl](docker/kubectl)
    The `kubectl` command.
    - [nginx](docker/nginx)
    Reverse proxy service, also for static site.
    - [phoenix](docker/phoenix)
    My phoenix project base image
    - [squid](docker/squid)
    Proxy service.
    - [stunnel](docker/stunnel)
    Encrypt connection service.


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



