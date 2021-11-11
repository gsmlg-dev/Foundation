# ZeroTier One UI

[Zero UI](https://github.com/dec0dOS/zero-ui.git)


[![Docker Pulls](https://badgen.net/docker/pulls/gsmlg/zerotier-ui)](https://hub.docker.com/r/gsmlg/zerotier-ui)
[![Build](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-zerotier-ui.yml/badge.svg)](https://github.com/gsmlg-dev/Foundation/actions/workflows/docker-buildimage-zerotier-ui.yml)


## Zero UI

#### Description

ZeroTier UI 环境变量配置

| Name | Default value | Description |
| ---------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| NODE_ENV | unset | You could learn more [here](https://nodejs.dev/learn/nodejs-the-difference-between-development-and-production) |
| LISTEN_ADDRESS | `0.0.0.0` | Express server listen address |
| ZU_SERVE_FRONTEND | `true` | You could disable frontend serving and use ZeroUI instance as REST API for your ZeroTier controller |
| ZU_SECURE_HEADERS | `true` | Enables [helmet](https://helmetjs.github.io) |
| ZU_CONTROLLER_ENDPOINT | `http://localhost:9993/` | ZeroTier controller API endpoint |
| ZU_CONTROLLER_TOKEN | from `/var/lib/zerotier-one/authtoken.secret` | ZeroTier controller API token |
| ZU_DEFAULT_USERNAME | unset (`docker-compose.yml`: admin) | Default username that will be set on the first run |
| ZU_DEFAULT_PASSWORD | unset (`docker-compose.yml`: zero-ui) | Default password that will be set on the first run |
| ZU_DATAPATH | `data/db.json` | ZeroUI data storage path |

ZeroUI could be deployed as a regular nodejs web application, 
but it requires ZeroTier controller that is installed with `zerotier-one` package. 
More info about the network controller you could read [here](https://github.com/zerotier/ZeroTierOne/tree/master/controller/#readme).



### Backup

The easiest way to create your ZeroUI data backup is to use the following commands:

```bash
docker run --rm --volumes-from zu-controller -v $(pwd):/backup ubuntu tar cvf /backup/backup-controller.tar /var/lib/zerotier-one
docker run --rm --volumes-from zu-main -v $(pwd):/backup ubuntu tar cvf /backup/backup-ui.tar /app/backend/data
```


### More Config

https://github.com/dec0dOS/zero-ui/blob/main/README.md

