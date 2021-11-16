# 使用Caddy，拥抱HTTP3

HTTP3已经正式发布了一段时间，当前主流浏览器都已经支持http3。
故而打算使用http3来改善当前的网络服务。

查看了当前可以使用的http3的web服务器，
当前`nginx`只有发布了测试版本，还没有正式启用，
目前看可使用的有`traefik`和`caddy`这两个软件。

经过对比选择了使用`caddy`来做web服务器。

## 编译`caddy`

使用caddy，caddy是使用go编写的http服务器。
需要使用caddy的一些扩展功能的话，需要自己编译caddy，需要使用xcaddy工具来创建版本。

这里我使用了docker中的xcaddy来进行创建，由于使用了golang，可以很方便的交叉编译，创建其它系统平台架构的caddy服务。

xcaddy编译代码：

```bash
xcaddy build {version} \
    --with github.com/caddy-dns/cloudflare \
    --with github.com/caddy-dns/route53 \
    --with github.com/caddy-dns/vultr \
    --with github.com/mholt/caddy-webdav
```

caddy使用go开发，可以自己开发caddy的插件来完成需要的功能。
可以参考官方的文档 [Extending Caddy](https://caddyserver.com/docs/extending-caddy) 进行开发。

这里我使用了`cloudflare`和`route53`的dns服务来进行域名解析，所以添加了这两个模块。

## 使用`caddy`

caddy使用非常简单，并且可以使用api进行配置，不需要重启。

启动`caddy`

```bash
caddy start
```

caddy 启动回自动加载当前目录下的 Caddyfile，启动服务。

**常用命令**

- `caddy fmt` Formats a Caddyfile

- `caddy help` View help for caddy commands

- `caddy list-modules` Lists the installed Caddy modules

- `caddy reload` Changes the config of the running Caddy process

- `caddy run` Starts the Caddy process in the foreground

- `caddy start` Starts the Caddy process in the background

- `caddy stop` Stops the running Caddy process

- `caddy trust` Installs a certificate into local trust store(s)

- `caddy untrust` Untrusts a certificate from local trust store(s)

- `caddy validate` Tests whether a config file is valid

- `caddy version` Prints the version


配置文件`Caddyfile`

```conf
{
    # General Options
    # debug
    http_port  80
    https_port 443

    # TLS Options
    auto_https disable_redirects
    email gsmlg.com@gmail.com

    skip_install_trust

    # acme_ca https://acme-staging-v02.api.letsencrypt.org/directory
    # acme_ca https://acme-v02.api.letsencrypt.org/directory
    # acme_dns cloudflare {.env.CF_API_TOKEN}

    # Server Options
    servers {
        protocol {
            allow_h2c
            experimental_http3
            # strict_sni_host
        }
    }
}

(cloudflare) {
    tls {
        ca https://acme-v02.api.letsencrypt.org/directory
        dns cloudflare {.env.CF_API_TOKEN}
        resolvers 8.8.8.8 1.1.1.1
    }
}

(route53) {
	tls {
        ca https://acme-v02.api.letsencrypt.org/directory
		dns route53 {
            max_retries 3
        }
		resolvers 8.8.8.8 1.1.1.1
	}
}

*.my-domain.net {
    import route53
    @site host some.my-domain.net
    handle @site {
        reverse_proxy localhost:8080
    }
}


*.my-domain.com {
    import cloudflare
    @site host some.my-domain.com
    handle @site {
        reverse_proxy localhost:8080
    }
}
```

### 使用中遇到的问题

1. `strict_sni_host` 启用后，会导致http3服务无法访问

2. aws配置route53配置

```
# 环境变量

AWS_ACCESS_KEY_ID='<access key>'
AWS_SECRET_ACCESS_KEY='<secret key>'
AWS_HOSTED_ZONE_ID='<zone id>'
AWS_REGION='<region>'

# or 配置文件放在用户目录下

～/.aws

```

3. cloudflare 配置使用环境变量 `CF_API_TOKEN`

4. 全局配置了`acme_dns`配置，那么所以域名都会默认使用这个方式。






