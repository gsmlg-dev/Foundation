### 简介

OpenSSL是一款自由开源的加密库, 提供了一些命令行工具来处理数字证书. 其中的一些工具可以作为证书权威机构来使用.

证书权威(CA)是一个认证证书实体的证书机构. 许多Web站点需要让他们的客户清楚他们的连接是安全的, 他们通过向一些国际性的可信CA(eg. VeriSign, DigiCert)为他们的站点去购买一个证书.

在一些时候, 相比于去购买一个证书,更需要去实现一自己的CA. 通常是需要内部网络使用的安全连接, 或者是需要向客户发布一个证书来让他们通过服务器的认证(eg, Apache, OpenVPN)

### 创建root pair

成为一个CA意味着需要处理加密密钥对, 私钥和证书. 首先需要第一步创建的是root pair. 它包含root key(ca.key.pem)和root certificate(ca.cert.pem). 这对迷药就是CA的身份认证.

通常, root CA 不会给任何服务器或客户端签名. root CA只被用来创建更多的二级CA, 二级CA被root CA签名, 作为root CA的代表. 这是最佳实践, 可以让root key保持离线和尽量少的被使用, 以保证root key有最小的泄漏风险.

```
⚠️注意
最佳实践是在一个安全的环境里创建root pair. 理想情况下, 在一个完全保密的环境, 并且和互联网完全隔离, 并拔除无线和有线网卡.
```

#### 准备目录

选择目录来保存所有的keys和certificates

```
# mkdir /root/ca
```

创建目录结构. 其中 `index.txt` 和 `serial` 文件是用来保存已经签名证书的记录的文件数据库.

```
# cd /root/ca
# mkdir certs crl newcerts private
# chmod 700 private
# touch index.txt
# echo 1000 > serial
```

#### 准备配置文件

我们需要创建一个OpenSSL配置文件来使用. 复制root CA的配置文件到 `/root/ca/openssl.cnf`.

root CA 配置文件

```
# OpenSSL root CA configuration file.
# Copy to `/root/ca/openssl.cnf`.

[ ca ]
# `man ca`
default_ca = CA_default

[ CA_default ]
# Directory and file locations.
dir               = /root/ca
certs             = $dir/certs
crl_dir           = $dir/crl
new_certs_dir     = $dir/newcerts
database          = $dir/index.txt
serial            = $dir/serial
RANDFILE          = $dir/private/.rand

# The root key and root certificate.
private_key       = $dir/private/ca.key.pem
certificate       = $dir/certs/ca.cert.pem

# For certificate revocation lists.
crlnumber         = $dir/crlnumber
crl               = $dir/crl/ca.crl.pem
crl_extensions    = crl_ext
default_crl_days  = 30

# SHA-1 is deprecated, so use SHA-2 instead.
default_md        = sha256

name_opt          = ca_default
cert_opt          = ca_default
default_days      = 375
preserve          = no
policy            = policy_strict

[ policy_strict ]
# The root CA should only sign intermediate certificates that match.
# See the POLICY FORMAT section of `man ca`.
countryName             = match
stateOrProvinceName     = match
organizationName        = match
organizationalUnitName  = optional
commonName              = supplied
emailAddress            = optional

[ policy_loose ]
# Allow the intermediate CA to sign a more diverse range of certificates.
# See the POLICY FORMAT section of the `ca` man page.
countryName             = optional
stateOrProvinceName     = optional
localityName            = optional
organizationName        = optional
organizationalUnitName  = optional
commonName              = supplied
emailAddress            = optional

[ req ]
# Options for the `req` tool (`man req`).
default_bits        = 2048
distinguished_name  = req_distinguished_name
string_mask         = utf8only

# SHA-1 is deprecated, so use SHA-2 instead.
default_md          = sha256

# Extension to add when the -x509 option is used.
x509_extensions     = v3_ca

[ req_distinguished_name ]
# See <https://en.wikipedia.org/wiki/Certificate_signing_request>.
countryName                     = Country Name (2 letter code)
stateOrProvinceName             = State or Province Name
localityName                    = Locality Name
0.organizationName              = Organization Name
organizationalUnitName          = Organizational Unit Name
commonName                      = Common Name
emailAddress                    = Email Address

# Optionally, specify some defaults.
countryName_default             = GB
stateOrProvinceName_default     = England
localityName_default            =
0.organizationName_default      = Alice Ltd
organizationalUnitName_default  =
emailAddress_default            =

[ v3_ca ]
# Extensions for a typical CA (`man x509v3_config`).
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer
basicConstraints = critical, CA:true
keyUsage = critical, digitalSignature, cRLSign, keyCertSign

[ v3_intermediate_ca ]
# Extensions for a typical intermediate CA (`man x509v3_config`).
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer
basicConstraints = critical, CA:true, pathlen:0
keyUsage = critical, digitalSignature, cRLSign, keyCertSign

[ usr_cert ]
# Extensions for client certificates (`man x509v3_config`).
basicConstraints = CA:FALSE
nsCertType = client, email
nsComment = "OpenSSL Generated Client Certificate"
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer
keyUsage = critical, nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = clientAuth, emailProtection

[ server_cert ]
# Extensions for server certificates (`man x509v3_config`).
basicConstraints = CA:FALSE
nsCertType = server
nsComment = "OpenSSL Generated Server Certificate"
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer:always
keyUsage = critical, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth

[ crl_ext ]
# Extension for CRLs (`man x509v3_config`).
authorityKeyIdentifier=keyid:always

[ ocsp ]
# Extension for OCSP signing certificates (`man ocsp`).
basicConstraints = CA:FALSE
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer
keyUsage = critical, digitalSignature
extendedKeyUsage = critical, OCSPSigning
```

其中 `[ca]` 部分是必须的. 这里我们告诉OpenSSL使用选项 `[CA_default]` 部分

```
[ ca ]
# `man ca`
default_ca = CA_default
```

而 `[CA_default]` 部分包含一类设置配置. 确保之前配置的目录 `/root/ca` 有效

```
[ CA_default ]
# Directory and file locations.
dir               = /root/ca
certs             = $dir/certs
crl_dir           = $dir/crl
new_certs_dir     = $dir/newcerts
database          = $dir/index.txt
serial            = $dir/serial
RANDFILE          = $dir/private/.rand

# The root key and root certificate.
private_key       = $dir/private/ca.key.pem
certificate       = $dir/certs/ca.cert.pem

# For certificate revocation lists.
crlnumber         = $dir/crlnumber
crl               = $dir/crl/ca.crl.pem
crl_extensions    = crl_ext
default_crl_days  = 30

# SHA-1 is deprecated, so use SHA-2 instead.
default_md        = sha256

name_opt          = ca_default
cert_opt          = ca_default
default_days      = 375
preserve          = no
policy            = policy_strict
```

我们应用 `policy_strict` 到所有的root CA签名, 使root CA仅被用来创建二级CA.

```
[ policy_strict ]
# The root CA should only sign intermediate certificates that match.
# See the POLICY FORMAT section of `man ca`.
countryName             = match
stateOrProvinceName     = match
organizationName        = match
organizationalUnitName  = optional
commonName              = supplied
emailAddress            = optional
```

我们应用 `policy_loose` 到所有二级CA签名, 二级CA会给所有的Server和Client签名, 它们会有很多的种类变化.

```
[ policy_loose ]
# Allow the intermediate CA to sign a more diverse range of certificates.
# See the POLICY FORMAT section of the `ca` man page.
countryName             = optional
stateOrProvinceName     = optional
localityName            = optional
organizationName        = optional
organizationalUnitName  = optional
commonName              = supplied
emailAddress            = optional
```

`[req]` 部分会被使用到所有的证书请求和证书创建

```
[ req ]
# Options for the `req` tool (`man req`).
default_bits        = 2048
distinguished_name  = req_distinguished_name
string_mask         = utf8only

# SHA-1 is deprecated, so use SHA-2 instead.
default_md          = sha256

# Extension to add when the -x509 option is used.
x509_extensions     = v3_ca
```

`[req_distinguished_name]` 部分包含了一般证书请求签名信息. 可以手动添加一些默认值来配置.

```
[ req_distinguished_name ]
# See <https://en.wikipedia.org/wiki/Certificate_signing_request>.
countryName                     = Country Name (2 letter code)
stateOrProvinceName             = State or Province Name
localityName                    = Locality Name
0.organizationName              = Organization Name
organizationalUnitName          = Organizational Unit Name
commonName                      = Common Name
emailAddress                    = Email Address

# Optionally, specify some defaults.
countryName_default             = GB
stateOrProvinceName_default     = England
localityName_default            =
0.organizationName_default      = Alice Ltd
#organizationalUnitName_default =
#emailAddress_default           =
```

之后的几个部分是一些扩展, 这些扩展可以在证书签名的时候使用. 例如: 使用 `-extensions v3_ca` 命令行参数会应用在 `[v3_ca]` 下的选项.

在创建根证书的时候, 我们使用 `v3_ca`

```
[ v3_ca ]
# Extensions for a typical CA (`man x509v3_config`).
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer
basicConstraints = critical, CA:true
keyUsage = critical, digitalSignature, cRLSign, keyCertSign
```

在创建二级CA时, 使用 `v3_intermediate_ca`, 其中额外增加了 `pathlen:0` 来确保二级CA下可以再创建CA

```
[ v3_intermediate_ca ]
# Extensions for a typical intermediate CA (`man x509v3_config`).
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer
basicConstraints = critical, CA:true, pathlen:0
keyUsage = critical, digitalSignature, cRLSign, keyCertSign
```

在签发客户端证书时, 我们使用 `usr_cert`, 这些被使用做远程用户认证.

```
[ usr_cert ]
# Extensions for client certificates (`man x509v3_config`).
basicConstraints = CA:FALSE
nsCertType = client, email
nsComment = "OpenSSL Generated Client Certificate"
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer
keyUsage = critical, nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = clientAuth, emailProtection
```

在创建服务器证书时, 使用 `server_cert` 选项, 这些被用于Web服务器.

```
[ server_cert ]
# Extensions for server certificates (`man x509v3_config`).
basicConstraints = CA:FALSE
nsCertType = server
nsComment = "OpenSSL Generated Server Certificate"
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer:always
keyUsage = critical, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
```

在创建证书废除列表时, `crl_ext` 选项会被自动应用

```
[ crl_ext ]
# Extension for CRLs (`man x509v3_config`).
authorityKeyIdentifier=keyid:always
```

在签名在线证书状态协议(Online Certificate Status Protocol (OCSP))证书时, 使用选项 `ocsp`

```
[ ocsp ]
# Extension for OCSP signing certificates (`man ocsp`).
basicConstraints = CA:FALSE
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer
keyUsage = critical, digitalSignature
extendedKeyUsage = critical, OCSPSigning
```

#### 创建root key

创建root key( `ca.key.pem` )并保证它的绝对安全. 任何拥有root key的人都可以创建受信任的证书. 使用AES 256-bit来加密root key, 并创建一个健壮的密码.

```
⚠️注意
使用4096位创建所有的根CA和二级CA的keys.
你仍然可以使用更短的长度来创建服务器和客户端证书.
```

```
# cd /root/ca
# openssl genrsa -aes256 -out private/ca.key.pem 4096

Enter pass phrase for ca.key.pem: secretpassword
Verifying - Enter pass phrase for ca.key.pem: secretpassword

# chmod 400 private/ca.key.pem
```

#### 创建根证书(Root certificate)

使用root key(ca.key.pem)来创建根证书(ca.cert.pem). 给根证书设置一个比较长的有效期, 比如20年. 一旦根证书失效, 所有被根证书签名的证书都会失效.

```
⚠️警告
当使用`req`工具时, 必须使用`-config`选项来指定一个配置文件, 否则OpenSSL会默认使用`/etc/pki/tls/openssl.cnf`
```

```
# cd /root/ca
# openssl req -config openssl.cnf \
      -key private/ca.key.pem \
      -new -x509 -days 7300 -sha256 -extensions v3_ca \
      -out certs/ca.cert.pem

Enter pass phrase for ca.key.pem: secretpassword
You are about to be asked to enter information that will be incorporated
into your certificate request.
-----
Country Name (2 letter code) [XX]:GB
State or Province Name []:England
Locality Name []:
Organization Name []:Alice Ltd
Organizational Unit Name []:Alice Ltd Certificate Authority
Common Name []:Alice Ltd Root CA
Email Address []:

# chmod 444 certs/ca.cert.pem
```

#### 验证根证书

```
# openssl x509 -noout -text -in certs/ca.cert.pem
```

输出会显示

* `Signature Algorithm` 签名算法
* `Validity` 证书的有效期
* `Public-Key` 公钥长度
* `Issuer`, 签发证书的实体
* `Subject`, 指向证书自己

当 `Issuer` 和 `Subject` 相同时, 说明证书是自签名的. 明确所有根证书都是自签名的.

```
Signature Algorithm: sha256WithRSAEncryption
    Issuer: C=GB, ST=England,
            O=Alice Ltd, OU=Alice Ltd Certificate Authority,
            CN=Alice Ltd Root CA
    Validity
        Not Before: Apr 11 12:22:58 2015 GMT
        Not After : Apr  6 12:22:58 2035 GMT
    Subject: C=GB, ST=England,
             O=Alice Ltd, OU=Alice Ltd Certificate Authority,
             CN=Alice Ltd Root CA
    Subject Public Key Info:
        Public Key Algorithm: rsaEncryption
            Public-Key: (4096 bit)
```

输出还会显示 *X509v3 extensions*. 我们创建证书时应用的选项 `v3_ca`, 所以 `[v3_ca]` 下的配置项会被反映出来.

```
X509v3 extensions:
    X509v3 Subject Key Identifier:
        38:58:29:2F:6B:57:79:4F:39:FD:32:35:60:74:92:60:6E:E8:2A:31
    X509v3 Authority Key Identifier:
        keyid:38:58:29:2F:6B:57:79:4F:39:FD:32:35:60:74:92:60:6E:E8:2A:31

    X509v3 Basic Constraints: critical
        CA:TRUE
    X509v3 Key Usage: critical
        Digital Signature, Certificate Sign, CRL Sign
```

### 创建二级CA, intermediate pair

二级CA作为Root CA代表的实体. Root CA签署中间证书, 来达成一个信任链.

使用二级CA的主要目的是为了安全. 这样root key可以被保存在一个离线环境, 并尽可能少的被使用. 如果二级CA的key泄漏, root CA可以废弃二级CA证书并创建一个新的二级密钥对.

#### 准备目录

Root CA文件保存在目录 `/root/ca` 下. 选择一个不同的目录( `/root/ca/intermediate` )来保存二级CA文件

```
# mkdir /root/ca/intermediate
```

创建和root CA相同的目录结构来保存文件. 增加了一个新的目录 `csr` 来保存证书签名请求

```
# cd /root/ca/intermediate
# mkdir certs crl csr newcerts private
# chmod 700 private
# touch index.txt
# echo 1000 > serial
```

添加一个 `crlnumber` 文件到二级CA目录树. 使用 `crlnumber` 来对证书废除列表(certificate revocation lists)进行追踪.

```
# echo 1000 > /root/ca/intermediate/crlnumber
```

复制二级CA配置文件到 `/root/ca/intermediate/openssl.cnf` 文件.

二级CA配置文件内容:

```
# OpenSSL intermediate CA configuration file.
# Copy to `/root/ca/intermediate/openssl.cnf`.

[ ca ]
# `man ca`
default_ca = CA_default

[ CA_default ]
# Directory and file locations.
dir               = /root/ca/intermediate
certs             = $dir/certs
crl_dir           = $dir/crl
new_certs_dir     = $dir/newcerts
database          = $dir/index.txt
serial            = $dir/serial
RANDFILE          = $dir/private/.rand

# The root key and root certificate.
private_key       = $dir/private/intermediate.key.pem
certificate       = $dir/certs/intermediate.cert.pem

# For certificate revocation lists.
crlnumber         = $dir/crlnumber
crl               = $dir/crl/intermediate.crl.pem
crl_extensions    = crl_ext
default_crl_days  = 30

# SHA-1 is deprecated, so use SHA-2 instead.
default_md        = sha256

name_opt          = ca_default
cert_opt          = ca_default
default_days      = 375
preserve          = no
policy            = policy_loose

[ policy_strict ]
# The root CA should only sign intermediate certificates that match.
# See the POLICY FORMAT section of `man ca`.
countryName             = match
stateOrProvinceName     = match
organizationName        = match
organizationalUnitName  = optional
commonName              = supplied
emailAddress            = optional

[ policy_loose ]
# Allow the intermediate CA to sign a more diverse range of certificates.
# See the POLICY FORMAT section of the `ca` man page.
countryName             = optional
stateOrProvinceName     = optional
localityName            = optional
organizationName        = optional
organizationalUnitName  = optional
commonName              = supplied
emailAddress            = optional

[ req ]
# Options for the `req` tool (`man req`).
default_bits        = 2048
distinguished_name  = req_distinguished_name
string_mask         = utf8only

# SHA-1 is deprecated, so use SHA-2 instead.
default_md          = sha256

# Extension to add when the -x509 option is used.
x509_extensions     = v3_ca

[ req_distinguished_name ]
# See <https://en.wikipedia.org/wiki/Certificate_signing_request>.
countryName                     = Country Name (2 letter code)
stateOrProvinceName             = State or Province Name
localityName                    = Locality Name
0.organizationName              = Organization Name
organizationalUnitName          = Organizational Unit Name
commonName                      = Common Name
emailAddress                    = Email Address

# Optionally, specify some defaults.
countryName_default             = GB
stateOrProvinceName_default     = England
localityName_default            =
0.organizationName_default      = Alice Ltd
organizationalUnitName_default  =
emailAddress_default            =

[ v3_ca ]
# Extensions for a typical CA (`man x509v3_config`).
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer
basicConstraints = critical, CA:true
keyUsage = critical, digitalSignature, cRLSign, keyCertSign

[ v3_intermediate_ca ]
# Extensions for a typical intermediate CA (`man x509v3_config`).
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer
basicConstraints = critical, CA:true, pathlen:0
keyUsage = critical, digitalSignature, cRLSign, keyCertSign

[ usr_cert ]
# Extensions for client certificates (`man x509v3_config`).
basicConstraints = CA:FALSE
nsCertType = client, email
nsComment = "OpenSSL Generated Client Certificate"
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer
keyUsage = critical, nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = clientAuth, emailProtection

[ server_cert ]
# Extensions for server certificates (`man x509v3_config`).
basicConstraints = CA:FALSE
nsCertType = server
nsComment = "OpenSSL Generated Server Certificate"
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer:always
keyUsage = critical, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth

[ crl_ext ]
# Extension for CRLs (`man x509v3_config`).
authorityKeyIdentifier=keyid:always

[ ocsp ]
# Extension for OCSP signing certificates (`man ocsp`).
basicConstraints = CA:FALSE
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer
keyUsage = critical, digitalSignature
extendedKeyUsage = critical, OCSPSigning
```

相对于root CA, 有5个选项发生了变化

```
[ CA_default ]
dir             = /root/ca/intermediate
private_key     = $dir/private/intermediate.key.pem
certificate     = $dir/certs/intermediate.cert.pem
crl             = $dir/crl/intermediate.crl.pem
policy          = policy_loose
```

#### 创建二级CA的Key

创建二级CA的key( `intermediate.key.pem` ) 使用AES 256-bit来加密并设置强密码.

```
# cd /root/ca
# openssl genrsa -aes256 \
      -out intermediate/private/intermediate.key.pem 4096

Enter pass phrase for intermediate.key.pem: secretpassword
Verifying - Enter pass phrase for intermediate.key.pem: secretpassword

# chmod 400 intermediate/private/intermediate.key.pem
```

### 创建二级CA证书

使用二级CA的key来创建证书签名请求(CSR). 详细信息和CA大致相同. 尽管如此, Common Name选项必须不同.

```
⚠️警告
确保你指定的配置文件是`intermediate/openssl.cnf`
```

```
# cd /root/ca
# openssl req -config intermediate/openssl.cnf -new -sha256 \
      -key intermediate/private/intermediate.key.pem \
      -out intermediate/csr/intermediate.csr.pem

Enter pass phrase for intermediate.key.pem: secretpassword
You are about to be asked to enter information that will be incorporated
into your certificate request.
-----
Country Name (2 letter code) [XX]:GB
State or Province Name []:England
Locality Name []:
Organization Name []:Alice Ltd
Organizational Unit Name []:Alice Ltd Certificate Authority
Common Name []:Alice Ltd Intermediate CA
Email Address []:
```

创建二级CA证书, 使用root CA签名CSR并使用选项 `v3_intermediate_ca`. 二级证书需要设置一个比root CA证书更短的有效期. 10年是一个比较好的选项.

```
⚠️警告
这次, 指定root CA配置文件`/root/ca/openssl.cnf`
```

```
# cd /root/ca
# openssl ca -config openssl.cnf -extensions v3_intermediate_ca \
      -days 3650 -notext -md sha256 \
      -in intermediate/csr/intermediate.csr.pem \
      -out intermediate/certs/intermediate.cert.pem

Enter pass phrase for ca.key.pem: secretpassword
Sign the certificate? [y/n]: y

# chmod 444 intermediate/certs/intermediate.cert.pem
```

`index.txt` 文件是OpenSSL `ca` 工具用来保存证书的数据库. 不要删除或手动修改这个文件. 现在它应该包含了二级CA证书的信息

```
V 250408122707Z 1000 unknown ... /CN=Alice Ltd Intermediate CA
```

#### 验证二级CA证书

和验证根证书一样, 使用相同的方式来验证二级Ca证书的有效性.

```
# openssl x509 -noout -text \
      -in intermediate/certs/intermediate.cert.pem
```

验证二级CA证书紧靠着根证书. 返回 `OK` 指示这个信任链是正确的.

```
# openssl verify -CAfile certs/ca.cert.pem \
      intermediate/certs/intermediate.cert.pem

intermediate.cert.pem: OK
```

#### 创建证书链文件

当应用(比如, web浏览器)尝试去对二级CA签名的证书做验证, 它必须也验证根证书和二级CA的信任链. 完成信任链, 就需要创建一个证书链来给应用.

创建证书链, 把二级CA证书和根证书连接起来, 我们随后会使用这个文件来演正被二级CA证书的签名.

```
# cat intermediate/certs/intermediate.cert.pem \
      certs/ca.cert.pem > intermediate/certs/ca-chain.cert.pem
# chmod 444 intermediate/certs/ca-chain.cert.pem
```

```
⚠️提示
我们的证书链文件必须包含根证书, 因为当前所有的客户端应用都没雨配置这个根证书. 更好的选项是, 比如你是一个内网的管理者, 可以把根证书安装到所有需要验证的客户端. 用这种方式, 证书链文件只需要包含你的二级CA证书
```

### 签名Server和Client证书

我们接下来使用我们的二级CA来签名. 你可以在多种情况时使用这些签名证书, 比如创建安全的浏览器连接, 或者客户端到server的认证.

```
⚠️注意
接下来的步骤揭示你作为certificate authority(CA). 第三方, 尽管可以自己创建自己的私钥和证书请求(CSR), 不需要把它们的私钥(private key)显示给你. 他们只想你提供CSR, 然后你签署一个签名的证书给他们. 在这种情况下, 忽略`genrsa`和`req`命令.
```

#### 创建key

我们的根CA和二级CA都是4096bit的. Server和Client证书通常在一年内失效, 所以我们安全的使用2048位密钥对.

```
⚠️注意
尽管4096bits略微安全于2048bits, 它会减慢TLS握手并且显著的增加握手时的处理器负载. 基于这个原因, 大多数websites都适用2048bit密钥对
```

如果你为一个web服务器(如: Apache)创建密钥对, 你需要在每次重启服务时都输入密码. 可以删除掉 `-aes256` 选项来创建一个没有密码的key.

```
# cd /root/ca
# openssl genrsa -aes256 \
      -out intermediate/private/www.example.com.key.pem 2048
# chmod 400 intermediate/private/www.example.com.key.pem
```

#### 创建证书 certificate

使用私钥(private key)来创建证书请求(CSR). CSR详情不需要匹配到二级CA. 对Server证书, 配置的Common Name必须是一个FQDN(full qualified domain name, 如www.example.com), 然而对Client证书它可以是任何唯一的识别码(如, 一个邮件地址). 记住Comman Name不能和你的根证书或二级CA证书相同.

```
# cd /root/ca
# openssl req -config intermediate/openssl.cnf \
      -key intermediate/private/www.example.com.key.pem \
      -new -sha256 -out intermediate/csr/www.example.com.csr.pem

Enter pass phrase for www.example.com.key.pem: secretpassword
You are about to be asked to enter information that will be incorporated
into your certificate request.
-----
Country Name (2 letter code) [XX]:US
State or Province Name []:California
Locality Name []:Mountain View
Organization Name []:Alice Ltd
Organizational Unit Name []:Alice Ltd Web Services
Common Name []:www.example.com
Email Address []:
```

使用二级CA去签名CSR来创建一个证书. 如果证书是被用于一个server, 那么使用 `server_cert` 扩展. 如果证书时给用户做用户认证, 使用 `user_cert` 扩展. 证书通常给予指定一年的有效期, 尽管通常CA会额外给于几天时间方便.

```
# cd /root/ca
# openssl ca -config intermediate/openssl.cnf \
      -extensions server_cert -days 375 -notext -md sha256 \
      -in intermediate/csr/www.example.com.csr.pem \
      -out intermediate/certs/www.example.com.cert.pem
# chmod 444 intermediate/certs/www.example.com.cert.pem
```

`intermediate/index.txt` 文件应该会包含一行内容指向新的证书

```
V 160420124233Z 1000 unknown ... /CN=www.example.com
```

#### 验证证书

```
# openssl x509 -noout -text \
      -in intermediate/certs/www.example.com.cert.pem
```

*Issuer* 就是二级CA. *Subject* 就是证书自己

```
Signature Algorithm: sha256WithRSAEncryption
    Issuer: C=GB, ST=England,
            O=Alice Ltd, OU=Alice Ltd Certificate Authority,
            CN=Alice Ltd Intermediate CA
    Validity
        Not Before: Apr 11 12:42:33 2015 GMT
        Not After : Apr 20 12:42:33 2016 GMT
    Subject: C=US, ST=California, L=Mountain View,
             O=Alice Ltd, OU=Alice Ltd Web Services,
             CN=www.example.com
    Subject Public Key Info:
        Public Key Algorithm: rsaEncryption
            Public-Key: (2048 bit)
```

输出会显示 *X509v3 extensions*. 当创建证书, 选择的是 `server_cert` 或者 `usr_cert`. 这个选项的内容就会在这里被反射出来

```
X509v3 extensions:
    X509v3 Basic Constraints:
        CA:FALSE
    Netscape Cert Type:
        SSL Server
    Netscape Comment:
        OpenSSL Generated Server Certificate
    X509v3 Subject Key Identifier:
        B1:B8:88:48:64:B7:45:52:21:CC:35:37:9E:24:50:EE:AD:58:02:B5
    X509v3 Authority Key Identifier:
        keyid:69:E8:EC:54:7F:25:23:60:E5:B6:E7:72:61:F1:D4:B9:21:D4:45:E9
        DirName:/C=GB/ST=England/O=Alice Ltd/OU=Alice Ltd Certificate Authority/CN=Alice Ltd Root CA
        serial:10:00

    X509v3 Key Usage: critical
        Digital Signature, Key Encipherment
    X509v3 Extended Key Usage:
        TLS Web Server Authentication
```

使用之前创建的CA证书链文件(ca-chain.cert.pem), 我们可以验证新的证书在被信任链上是正确的

```
# openssl verify -CAfile intermediate/certs/ca-chain.cert.pem \
      intermediate/certs/www.example.com.cert.pem

www.example.com.cert.pem: OK
```

#### 部署证书

现在可以讲证书部署到server, 或者发布证书给客户. 当部署到服务器应用(如, Apache)时, 你需要确保下边的文件可用:

* `ca-chain.cert.pem`
* `www.example.com.key.pem`
* `www.example.com.cert.perm`

如果你是给第三方的证书请求(CSR)做签名, 你不需要获取他们的私钥(private key), 所以你需要返回给他们证书链文件( `ca-chain.cert.pem` )和证书文件( `www.example.com.cert.pem` )

#### 证书废除列表(Certificate revocation lists)

证书废除列表(Certificate revocation lists(CRL))提供了一个证书的列表, 表明其中的证书都是被废除的. 客户端应用, 比如web浏览器, 可以使用CRL去检查服务器真实性. 服务器应用, 比如Apache和OpenVPN, 可以使用CRL来禁止不被信任的客户端的访问.

发布CRL到一个可以公开访问的地方(如: http://example.com/intermediate.crl.pem). 第三方可以根据地址获取到CRL, 他们可以根据这个来检测他们依赖的证书是否被废除.

```
⚠️注意
一些应用废除了CRLs, 他们使用在线证书状态协议(Online Certificate Status Protocol (OCSP))来代替.
```

#### 准备配置文件

当一个CA签名证书, 他们通常会写入CRL地址到证书里. 添加 `crlDistributionPoints` 到对应的部分. 在这里, 我们添加到 `[server_cert]` 部分中

```
[ server_cert ]
# ... snipped ...
crlDistributionPoints = URI:http://example.com/intermediate.crl.pem
```

#### 创建CRL

```
# cd /root/ca
# openssl ca -config intermediate/openssl.cnf \
      -gencrl -out intermediate/crl/intermediate.crl.pem
```

```
⚠️注意
在ca man page中的`CRL OPTIONS`部分包含了更多关于如何创建CRLs的信息
```

可以使用 `crl` 工具来检查CRL的内容

```
# openssl crl -in intermediate/crl/intermediate.crl.pem -noout -text
```

现在没有被吊销的证书, 所以输出是 `No Revoked Certificates`.

你应该定期的重新创建CRL. 在默认情况下, CRL在30天后失效. 这个值由 `[CA_default]` 部分中的 `default_crl_days` 选项控制.

#### 吊销证书

通过一个例子来看看这个过程. Alice有一个web服务器和一个私有的目录存放一些暖心的可爱小猫图片. Alice想授权她的朋友Bob来访问这个集合.

Bob创建了一个私钥和证书请求文件CSR

```
$ cd /home/bob
$ openssl genrsa -out bob@example.com.key.pem 2048
$ openssl req -new -key bob@example.com.key.pem \
      -out bob@example.com.csr.pem

You are about to be asked to enter information that will be incorporated
into your certificate request.
-----
Country Name [XX]:US
State or Province Name []:California
Locality Name []:San Francisco
Organization Name []:Bob Ltd
Organizational Unit Name []:
Common Name []:bob@example.com
Email Address []:
```

Bob发送他的CSR给Alice, Alice给他签名.

```
# cd /root/ca
# openssl ca -config intermediate/openssl.cnf \
      -extensions usr_cert -notext -md sha256 \
      -in intermediate/csr/bob@example.com.csr.pem \
      -out intermediate/certs/bob@example.com.cert.pem

Sign the certificate? [y/n]: y
1 out of 1 certificate requests certified, commit? [y/n]: y
```

Alice验证证书有效

```
# openssl verify -CAfile intermediate/certs/ca-chain.cert.pem \
      intermediate/certs/bob@example.com.cert.pem

bob@example.com.cert.pem: OK
```

`index.txt`  文件包含一个新的连接

```
V 160420124740Z 1001 unknown ... /CN=bob@example.com
```

Alice发送证书给Bob. Bob安装证书到浏览器, 现在可以访问到Alice的小猫图片.

坏事, 随着Bob的不端行为而来. Bob把Alice的小猫图片发送到了Hack News, 说了他是这些的拥有者, 并获得了大量的赞. Alice发现了这事摒弃要立即吊销他的访问权限.

```
# cd /root/ca
# openssl ca -config intermediate/openssl.cnf \
      -revoke intermediate/certs/bob@example.com.cert.pem

Enter pass phrase for intermediate.key.pem: secretpassword
Revoking Certificate 1001.
Data Base Updated
```

`index.txt` 中Bob的证书这行开始现在使用字符 `R` 标示, 这表示证书已经被吊销(Revoked).

```
R 160420124740Z 150411125310Z 1001 unknown ... /CN=bob@example.com
```

在吊销了Bob的证书后, Alice必须重新创建CRL

#### 服务端使用CRL

对于客户端证书, 一般时候服务器应用(如, Apache)来进行验证. 服务应用需要可以访问CRL.

在Alice的例子中, 他可以添加 `SSLCARevocationPath` 直接到她的Apache配置文件中并复制CRL到她的web服务器. 下次Bob再进行访问时, Apache会检查他的证书存在于CRL中并禁止访问.

相似的, OpenVPN也使用 `crl-verify` 指向了被禁用的客户端证书.

#### 客户端使用CRL

对于服务器证书, 一般是由客户端应用(如,浏览器)来进行验证. 这时, 应用必须可以远程访问CRL.

如果证书被签名的扩展中包含了 `crlDistributionPoints`, 客户端应用能够根据地址读取到CRL信息.

CRL地址信息可以在证书的x509v3详情中看到.

```
# openssl x509 -in cute-kitten-pictures.example.com.cert.pem -noout -text

    X509v3 CRL Distribution Points:

        Full Name:
          URI:http://example.com/intermediate.crl.pem
```

### 在线证书状态协议 (Online Certificate Status Protocol)

在线证书状态协议 (Online Certificate Status Protocol)(OCSP) 被创建用于替代证书吊销列表(CRL). 和CRLs相似, OCSP运行访问查询出证书的吊销状态.

当服务器签名证书时, 他们一般会包含一个OSCP服务器地址(如, http://ocsp.example.com)在证书中. 这个功能和CRL的 `crlDistributionPoints` 功能作用相似.

示例, 当web浏览器接受到一个服务器证书, 它立即想请求证书中的OSCP服务器地址. 在这个地址中, OCSP响应程序监听请求和响应证书的吊销状态.

```
⚠️注意
  虽然推荐尽可能的使用OCSP, 尽管实际上你应该趋向于只需要OCSP来给web站点证书. 一些web浏览器已经废弃或移除了对CRL的支持.
```

#### 准备配置文件

要使用OCSP, CA必须要编码OCSP服务器地址到签名的证书中. 使用 `authorityInfoAccess` 选项到合适的部分, 在这里应该是 `[server_cert]` 部分

```
[ server_cert ]
# ... snipped ...
authorityInfoAccess = OCSP;URI:http://ocsp.example.com
```

#### 创建OCSP密钥对

OCSP响应程序必须要一个加密密钥对来签名发送给请求的响应内容. OSCP密钥对必须由和证书签名相同的CA签名.

创建私钥并使用AES-256加密

```
# cd /root/ca
# openssl genrsa -aes256 \
      -out intermediate/private/ocsp.example.com.key.pem 4096
```

创建证书签名请求CSR. 详细信息默认需要和签名CA相同. Common Name, 需要是FQDN.

```
# cd /root/ca
# openssl req -config intermediate/openssl.cnf -new -sha256 \
      -key intermediate/private/ocsp.example.com.key.pem \
      -out intermediate/csr/ocsp.example.com.csr.pem

Enter pass phrase for intermediate.key.pem: secretpassword
You are about to be asked to enter information that will be incorporated
into your certificate request.
-----
Country Name (2 letter code) [XX]:GB
State or Province Name []:England
Locality Name []:
Organization Name []:Alice Ltd
Organizational Unit Name []:Alice Ltd Certificate Authority
Common Name []:ocsp.example.com
Email Address []:
```

使用CA签署CSR

```
# openssl ca -config intermediate/openssl.cnf \
      -extensions ocsp -days 375 -notext -md sha256 \
      -in intermediate/csr/ocsp.example.com.csr.pem \
      -out intermediate/certs/ocsp.example.com.cert.pem
```

验证证书的 *x509v3 extensions* 正确性

```
# openssl x509 -noout -text \
      -in intermediate/certs/ocsp.example.com.cert.pem

    X509v3 Key Usage: critical
        Digital Signature
    X509v3 Extended Key Usage: critical
        OCSP Signing
```

#### 吊销证书

OpenSSL的 `ocsp` 工具实现了一个OCSP responder, 但只为了做测试使用. 生产级别的OCSP responder也有, 但是超越了这个指引的范围.

创建一个server证书测试.

```
# cd /root/ca
# openssl genrsa -out intermediate/private/test.example.com.key.pem 2048
# openssl req -config intermediate/openssl.cnf \
      -key intermediate/private/test.example.com.key.pem \
      -new -sha256 -out intermediate/csr/test.example.com.csr.pem
# openssl ca -config intermediate/openssl.cnf \
      -extensions server_cert -days 375 -notext -md sha256 \
      -in intermediate/csr/test.example.com.csr.pem \
      -out intermediate/certs/test.example.com.cert.pem
```

在 `localhost` 上运行OCSP responder . 有别于CRL保存吊销状态于各个文件中, OCSP responder 直接读取 `index.txt` . 响应被OCSP密钥对签名(使用 `-rkey` 和 `-rsigner` 选项)

```
# openssl ocsp -port 127.0.0.1:2560 -text -sha256 \
      -index intermediate/index.txt \
      -CA intermediate/certs/ca-chain.cert.pem \
      -rkey intermediate/private/ocsp.example.com.key.pem \
      -rsigner intermediate/certs/ocsp.example.com.cert.pem \
      -nrequest 1

Enter pass phrase for ocsp.example.com.key.pem: secretpassword
```

在另一个终端中, 发送一个请求给OCSP responder. 指定的 `-cert` 选项指定了请求的证书.

```
# openssl ocsp -CAfile intermediate/certs/ca-chain.cert.pem \
      -url http://127.0.0.1:2560 -resp_text \
      -issuer intermediate/certs/intermediate.cert.pem \
      -cert intermediate/certs/test.example.com.cert.pem
```

开始的输出显示如下:

* 是否接收到成功的响应 (OCSP Response Status)
* responder的身份 (Responder Id)
* 证书的吊销状态 (Cert Status)

```
OCSP Response Data:
    OCSP Response Status: successful (0x0)
    Response Type: Basic OCSP Response
    Version: 1 (0x0)
    Responder Id: ... CN = ocsp.example.com
    Produced At: Apr 11 12:59:51 2015 GMT
    Responses:
    Certificate ID:
      Hash Algorithm: sha1
      Issuer Name Hash: E35979B6D0A973EBE8AEDED75D8C27D67D2A0334
      Issuer Key Hash: 69E8EC547F252360E5B6E77261F1D4B921D445E9
      Serial Number: 1003
    Cert Status: good
    This Update: Apr 11 12:59:51 2015 GMT
```

吊销证书

```
# openssl ca -config intermediate/openssl.cnf \
      -revoke intermediate/certs/test.example.com.cert.pem

Enter pass phrase for intermediate.key.pem: secretpassword
Revoking Certificate 1003.
Data Base Updated
```

之后, 运行OCSP responder 并在另一个终端中发请求. 这次, 输出会显示 `Cert Status: revoked` 和 `Revocation Time` .

```
OCSP Response Data:
    OCSP Response Status: successful (0x0)
    Response Type: Basic OCSP Response
    Version: 1 (0x0)
    Responder Id: ... CN = ocsp.example.com
    Produced At: Apr 11 13:03:00 2015 GMT
    Responses:
    Certificate ID:
      Hash Algorithm: sha1
      Issuer Name Hash: E35979B6D0A973EBE8AEDED75D8C27D67D2A0334
      Issuer Key Hash: 69E8EC547F252360E5B6E77261F1D4B921D445E9
      Serial Number: 1003
    Cert Status: revoked
    Revocation Time: Apr 11 13:01:09 2015 GMT
    This Update: Apr 11 13:03:00 2015 GMT
```

