# Foundation

My personal foundation.

This repo will include all my public software, scripts, configs and CI system.

## What is this repo?

My github repo aggregation.

I've manage too many repositories, that I have to combine them to one so that I can manage them easily.

## Repos

- [nodejs](nodejs)
    - [scripts](nodejs/scripts)
    gsmlg-scripts(@gsmlg/scripts) Support open source project build, format, lint, pre-commit, validate and typecheck
    - [website](nodejs/website)
    My website, now at gsmlg.github.io
    TODO: Start my backend service.
- [golang](golang)
    - [dingding-oapi](golang/dingding-oapi)
    Dingding go package that support ding message to ding group.
- [docker](docker)
My docker images
    - [curl](docker/curl)
    Minimal curl base on alpine
    - [echo](docker/echo).
    Http dump service, using for test http.
    - [nginx](docker/nginx)
    Reverse proxy service, also for static site.
    - [squid](docker/squid)
    Proxy service.
    - [stunnel](docker/stunnel)
    Encrypt connection service.
    - [phoenix](docker/phoenix)
    My phoenix project base image
    - [dell-openmanage](docker/dell-openmanage)
    Dell openmanage package. Use to automate manage server through iDrac.
    - [code-server](docker/code-server)
    VS Code Server edition, download and change to use zsh, base on ubuntu.
    - [editor-server](docker/editor-server)
    My cloud editor, base on my code-server, add a lot of usefull support.
    

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



