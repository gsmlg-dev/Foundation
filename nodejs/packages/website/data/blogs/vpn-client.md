# 在 Linux 系统中配置 VPN Client

在没有 X 的 linux 系统中安装启用 VPN

## 安装

```shell
# Ubuntu & Debian
apt-get update
apt-get -y install strongswan xl2tpd

# CentOS & RHEL
yum -y install epel-release
yum --enablerepo=epel -y install strongswan xl2tpd

# Fedora
yum -y install strongswan xl2tpd
```

### 配置 VPN 账户

```shell
VPN_SERVER_IP='你的VPN服务器IP'
VPN_IPSEC_PSK='你的IPsec预共享密钥'
VPN_USER='你的VPN用户名'
VPN_PASSWORD='你的VPN密码'
```

### 配置 Strongswan

```shell
cat > /etc/ipsec.conf <<EOF
# ipsec.conf - strongSwan IPsec configuration file

# basic configuration

config setup
  # strictcrlpolicy=yes
  # uniqueids = no

# Add connections here.

# Sample VPN connections

conn %default
  ikelifetime=60m
  keylife=20m
  rekeymargin=3m
  keyingtries=1
  keyexchange=ikev1
  authby=secret
  ike=aes128-sha1-modp1024,3des-sha1-modp1024!
  esp=aes128-sha1-modp1024,3des-sha1-modp1024!

conn myvpn
  keyexchange=ikev1
  left=%defaultroute
  auto=add
  authby=secret
  type=transport
  leftprotoport=17/1701
  rightprotoport=17/1701
  right=$VPN_SERVER_IP
EOF

cat > /etc/ipsec.secrets <<EOF
: PSK "$VPN_IPSEC_PSK"
EOF

chmod 600 /etc/ipsec.secrets

# For CentOS/RHEL & Fedora ONLY
mv /etc/strongswan/ipsec.conf /etc/strongswan/ipsec.conf.old 2>/dev/null
mv /etc/strongswan/ipsec.secrets /etc/strongswan/ipsec.secrets.old 2>/dev/null
ln -s /etc/ipsec.conf /etc/strongswan/ipsec.conf
ln -s /etc/ipsec.secrets /etc/strongswan/ipsec.secrets
```

### 配置 xl2tpd

```shell
cat > /etc/xl2tpd/xl2tpd.conf <<EOF
[lac myvpn]
lns = $VPN_SERVER_IP
ppp debug = yes
pppoptfile = /etc/ppp/options.l2tpd.client
length bit = yes
EOF

cat > /etc/ppp/options.l2tpd.client <<EOF
ipcp-accept-local
ipcp-accept-remote
refuse-eap
require-chap
noccp
noauth
mtu 1280
mru 1280
noipdefault
defaultroute
usepeerdns
connect-delay 5000
name $VPN_USER
password $VPN_PASSWORD
EOF

chmod 600 /etc/ppp/options.l2tpd.client
```

- 至此 VPN 客户端配置已完成

## 配置连接

### 创建 xl2tpd 控制文件：

```shell
mkdir -p /var/run/xl2tpd
touch /var/run/xl2tpd/l2tp-control
```

### 重启服务：

````
service strongswan restart
service xl2tpd restart
```

### 开始 IPsec 连接：

```shell
# Ubuntu & Debian
ipsec up myvpn

# CentOS/RHEL & Fedora
strongswan up myvpn
```

### 开始 L2TP 连接：

```shell
echo "c myvpn" > /var/run/xl2tpd/l2tp-control
```

## 配置路由

查看路由

```shell
ip route
```

创建路由表

```
git clone https://github.com/gsmlg/static-routes.git
cd static-routes
make linux
# mode 1 不需要修改 default route
\cp mode1/ip-up /etc/ppp/ip-up.local
# mode 2 需要配置 default route 到VPN的IP
\cp mode1/ip-up /etc/ppp/ip-up.local
\cp mode1/ip-down /etc/ppp/ip-down

```

## 断开连接

```
# Ubuntu & Debian
echo "d myvpn" > /var/run/xl2tpd/l2tp-control
ipsec down myvpn

# CentOS/RHEL & Fedora
echo "d myvpn" > /var/run/xl2tpd/l2tp-control
strongswan down myvpn
```
````
