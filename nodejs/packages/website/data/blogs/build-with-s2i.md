# 使用 `s2i` Build 镜像

## 安装`s2i`

- 使用 `go get`

```shell
$ go get github.com/openshift/source-to-image/cmd/s2i
```

- macOS 使用

```shell
$ brew install source-to-image
```

- Linux 使用

在[版本发布页面](https://github.com/openshift/source-to-image/releases)找到对应链接下载

```shell
curl -sSL https://github.com/openshift/source-to-image/releases/download/v1.1.14/source-to-image-v1.1.14-874754de-linux-amd64.tar.gz | tar zxf - -C /usr/local/bin/ './s2i'
```

- Windows 使用

在[版本发布页面](https://github.com/openshift/source-to-image/releases)找到对应链接下载

下载

```
https://github.com/openshift/source-to-image/releases/download/v1.1.14/source-to-image-v1.1.14-874754de-windows-amd64.zip
```

- 源码编译

```shell
$ go get github.com/openshift/source-to-image
$ cd ${GOPATH}/src/github.com/openshift/source-to-image
$ export PATH=$PATH:${GOPATH}/src/github.com/openshift/source-to-image/_output/local/bin/linux/amd64/
$ hack/build-go.sh
```

## 使用`s2i`

使用方式为：

```shell
s2i [source dir] [builder image] [built image name]
```

可用的 builder 镜像源码可以在 [Software Collection](https://github.com/sclorg) 找到

### 创建镜像 PHP 项目镜像

PHP builder 镜像

- centos/php-72-centos7
- centos/php-71-centos7
- centos/php-70-centos7
- centos/php-56-centos7
- centos/php-55-centos7

创建 test-app 镜像

```
s2i build /root/s2i-php-test-app centos/php-72-centos7 my-test-app

docker run --rm -p 8080:8080 my-test-app

```

#### 配置运行时参数

##### 给镜像配置以下环境变量可以作用于`php.ini`:

- **ERROR_REPORTING**
  - Informs PHP of which errors, warnings and notices you would like it to take action for
  - Default: E_ALL & ~E_NOTICE
- **DISPLAY_ERRORS**
  - Controls whether or not and where PHP will output errors, notices and warnings
  - Default: ON
- **DISPLAY_STARTUP_ERRORS**
  - Cause display errors which occur during PHP's startup sequence to be handled separately from display errors
  - Default: OFF
- **TRACK_ERRORS**
  - Store the last error/warning message in \$php_errormsg (boolean)
  - Default: OFF
- **HTML_ERRORS**
  - Link errors to documentation related to the error
  - Default: ON
- **INCLUDE_PATH**
  - Path for PHP source files
  - Default: .:/opt/app-root/src:/opt/rh/rh-php72/root/usr/share/pear (EL7)
  - Default: .:/opt/app-root/src:/usr/share/pear (EL8, Fedora)
- **PHP_MEMORY_LIMIT**
  - Memory Limit
  - Default: 128M
- **SESSION_NAME**
  - Name of the session
  - Default: PHPSESSID
- **SESSION_HANDLER**
  - Method for saving sessions
  - Default: files
- **SESSION_PATH**
  - Location for session data files
  - Default: /tmp/sessions
- **SESSION_COOKIE_DOMAIN**
  - The domain for which the cookie is valid.
  - Default:
- **SESSION_COOKIE_HTTPONLY**
  - Whether or not to add the httpOnly flag to the cookie
  - Default: 0
- **SESSION_COOKIE_SECURE**
  - Specifies whether cookies should only be sent over secure connections.
  - Default: Off
- **SHORT_OPEN_TAG**
  - Determines whether or not PHP will recognize code between <? and ?> tags
  - Default: OFF
- **DOCUMENTROOT**
  - Path that defines the DocumentRoot for your application (ie. /public)
  - Default: /

##### 给镜像配置以下环境变量可以作用于`opcache.ini`:

- **OPCACHE_MEMORY_CONSUMPTION**
  - The OPcache shared memory storage size in megabytes
  - Default: 128
- **OPCACHE_REVALIDATE_FREQ**
  - How often to check script timestamps for updates, in seconds. 0 will result in OPcache checking for updates on every request.
  - Default: 2

##### 以下配置环境变量作用于 Apache 服务，运行于 Apache [MPM prefork](https://httpd.apache.org/docs/2.4/mod/mpm_common.html) 模式:

- **HTTPD_START_SERVERS**
  - The [StartServers](https://httpd.apache.org/docs/2.4/mod/mpm_common.html#startservers)
    directive sets the number of child server processes created on startup.
  - Default: 8
- **HTTPD_MAX_REQUEST_WORKERS**
  - The [MaxRequestWorkers](https://httpd.apache.org/docs/2.4/mod/mpm_common.html#maxrequestworkers)
    directive sets the limit on the number of simultaneous requests that will be served.
  - `MaxRequestWorkers` was called `MaxClients` before version httpd 2.3.13.
  - Default: 256 (this is automatically tuned by setting Cgroup limits for the container using this formula:
    `TOTAL_MEMORY / 15MB`. The 15MB is average size of a single httpd process.

##### 以下配置环境变量作用于 composer:

- **COMPOSER_MIRROR**
  - Adds a custom composer repository mirror URL to composer configuration. Note: This only affects packages listed in composer.json.
- **COMPOSER_INSTALLER**
  - Overrides the default URL for downloading Composer of https://getcomposer.org/installer. Useful in disconnected environments.
- **COMPOSER_ARGS**
  - Adds extra arguments to the `composer install` command line (for example `--no-dev`).

#### 代码目录配置

当以下文件在代码目录中时，会被使用：

- **composer.json**

  List of dependencies to be installed with `composer`. The format is documented
  [here](https://getcomposer.org/doc/04-schema.md).

* **.htaccess**

  In case the **DocumentRoot** of the application is nested within the source directory `/opt/app-root/src`,
  users can provide their own Apache **.htaccess** file. This allows the overriding of Apache's behavior and
  specifies how application requests should be handled. The **.htaccess** file needs to be located at the root
  of the application source.

* **.s2i/environment**

  也可以用于配置环境变量

### 创建 nodejs 项目镜像

可用 builder 镜像

- centos/nodejs-10-centos7
- centos/nodejs-8-centos7
- centos/nodejs-6-centos7

#### 服务启动

默认会调用 `npm start` 来启动服务

当`DEV_MODE=true`时，默认会调用`nodemon <main attribute in package.json>`,来启动服务，如果失败再调用，`npm start` 来启动服务

#### 可配置环境变量

**`NODE_ENV`**
NodeJS runtime mode (default: "production")

**`DEV_MODE`**
When set to "true", `nodemon` will be used to automatically reload the server while you work (default: "false"). Setting `DEV_MODE` to "true" will change the `NODE_ENV` default to "development" (if not explicitly set).

**`NPM_RUN`**
Select an alternate / custom runtime mode, defined in your `package.json` file's [`scripts`](https://docs.npmjs.com/misc/scripts) section (default: npm run "start"). These user-defined run-scripts are unavailable while `DEV_MODE` is in use.

**`HTTP_PROXY`**
Use an npm proxy during assembly

**`HTTPS_PROXY`**
Use an npm proxy during assembly

**`NPM_MIRROR`**
Use a custom NPM registry mirror to download packages during the build process

### 创建 go 项目镜像

可用 builder 镜像

- centos/go-toolset-7-centos7

#### 配置运行时参数

- **IMPORT_URL**

指定应用的导入 URL，如 `github.com/someorg/somerepo`

- **INSTALL_URL**

如果`main.go`不在代码目录下时，指定 build 目录,如 `github.com/someorg/somerepo/somefolder`

### 创建 java 项目镜像

由于 java 项目的多样性，建议进行定制
