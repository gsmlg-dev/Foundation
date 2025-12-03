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

    - [pac-server](golang/pac-server)

    PAC (Proxy Auto-Config) file server.

    Download:

        https://github.com/gsmlg-dev/Foundation/releases/download/pac-server-release/pac-server_linux_amd64
        https://github.com/gsmlg-dev/Foundation/releases/download/pac-server-release/pac-server_linux_arm64
        https://github.com/gsmlg-dev/Foundation/releases/download/pac-server-release/pac-server_darwin_amd64
        https://github.com/gsmlg-dev/Foundation/releases/download/pac-server-release/pac-server_darwin_arm64
        https://github.com/gsmlg-dev/Foundation/releases/download/pac-server-release/pac-server_windows_amd64
        https://github.com/gsmlg-dev/Foundation/releases/download/pac-server-release/pac-server_windows_arm64
        https://github.com/gsmlg-dev/Foundation/releases/download/pac-server-release/pac-server_freebsd_amd64
        https://github.com/gsmlg-dev/Foundation/releases/download/pac-server-release/pac-server_android_arm64

    Docker:

        docker.io/gsmlg/pac-server:latest
        ghcr.io/gsmlg/pac-server:latest


## Docker Images

Docker images have been migrated to the [gsmlg-ci](https://github.com/gsmlg-ci) organization for better maintainability.

See [docs/DOCKER_REPOS.md](docs/DOCKER_REPOS.md) for the complete list of Docker image repositories.

Images are still published to:
- Docker Hub: `docker.io/gsmlg/{image}`
- GitHub Container Registry: `ghcr.io/gsmlg-dev/{image}`


## Use sementic release

If a dir is develop by me, can use @gsmlg/semantic-release-action, like so:

```yaml
  - name: Release
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
