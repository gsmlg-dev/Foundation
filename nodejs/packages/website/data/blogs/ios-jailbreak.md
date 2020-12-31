## iOS 10.3.3

iOS 10.3.3 是 Apple 发布的最后的 iOS 32bit 版本

当前正好有一个废旧的 iPhone5c 便使用它来进行越狱

## 越狱步骤

### 准备越狱工具

下载 h3lix，地址： https://h3lix.tihmstar.net

下载 ipa，校验签名信息

下载 cydia impactor， http://www.cydiaimpactor.com

### 进行越狱

连接 iPhone 到 USB

打开 cydia impactor

将 h3lix 拖动到 cydia impactor

安装 h3lix.ipa，会请求 apple ID

通过 apple ID 签名并安装 app 到 iPhone

安装成功后打开 iPhone

允许描述文件

打开 h3lix，运行越狱

越狱成功

## Cydia 应用商店

越狱成功后可以使用 cydia 应用商店安装应用

当前 iOS10 已经无法使用 openSSH，需要安装 dropbear 才能使用 ssh 连接

连接到终端方法：

从 bigboss 源安装 iOS Terminal，后打开 app 即可进入终端

打开终端

cydia 使用的是`debian`的包管理系统，可以使用`dpkg`来查看和管理软件包

### dropbear 安装

Cydia 默认商店没有 dropbear，所以安装比较麻烦

方法有一下几种：

1. 自己编译， 可以参照 https://ivrodriguez.com/installing-dropbear-ssh-on-ios-10-3-3/

2. 下载安装，可以参考 https://www.reddit.com/r/jailbreak/comments/7mh516/tutorial_how_to_get_ssh_working_on_the_new_ios/

3. 添加 cydia 源，没有可以参考的

### Cydia 可用的应用

APP

- iOS Terminal
- Filza File Manager

CLI

- git
- BIND
- lighttpd
- Vi IMproved

## 越狱注意事项

每次重启 iPhone 都需要重新越狱

h3lix 签名只能使用 7 天，每七天必须重新签名
