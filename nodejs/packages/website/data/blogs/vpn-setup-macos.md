## 为 macOS 配置 VPN

### 配置 VPN 服务器

搭建 vpn 服务

从系统仓库
安装`ipsec`
安装`xl2tpd`

在服务器上启动服务

配置好服务账户

```
systemctl restart ipsec
systemctl restart xl2tpd
```

### 配置 VPN Client

从`Mac App Store`安装`Apple Configurator 2`

创建 VPN 描述文件

选择`l2tp`协议
配置*服务器地址、用户名、密码和共享密钥*

把描述文件安装到`macOS`的系统配置，`iOS`通过`airDrop`安装

安装完成即可连接 vpn

### 配置 macOS 在 VPN 连接时的路由表

使用`[static-routes][https://github.com/gsmlg/static-routes]`的配置

路由表数据时使用 maxmine 公开的 geoip 数据库来进行配置

在`/etc/ppp/`目录配置`ip-up`,`ip-down`对应在 VPN 启动和停止时执行对应脚本

脚本中可以使用变量说明

```
$1 interface etc: ppp0
$2 none?
$3 ? 0
$4 client ip
$5 remote ip
$6 local gateway
```

### 命令行中控制 VPN

```
VPN connections

Usage: scutil --nc [command]

	list
		List available network connection services in the current set

	status <service>
		Indicate whether a given service is connected, as well as extended status information for the service

	show <service>
		Display configuration information for a given service

	statistics <service>
		Provide statistics on bytes, packets, and errors for a given service

	select <service>
		Make the given service active in the current set. This allows it to be started

	start <service> [--user user] [--password password] [--secret secret]
		Start a given service. Can take optional arguments for user, password, and secret

	stop <service>
		Stop a given service

	suspend <service>
		Suspend a given service (PPP, Modem on Hold)

	resume <service>
		Resume a given service (PPP, Modem on Hold)

	ondemand [-W] [hostname]
	ondemand -- --refresh
		Display VPN on-demand information

	trigger <hostname> [background] [port]
		Trigger VPN on-demand with specified hostname, and optional port and background flag

	enablevpn <service or vpn type> [path]
		Enables the given VPN application type. Takes either a service or VPN type. Pass a path to set ApplicationURL

	disablevpn <service or vpn type>
		Disables the given VPN application type. Takes either a service or VPN type

	help
		Display available commands for --nc

```
