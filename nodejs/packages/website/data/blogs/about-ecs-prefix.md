### 起因

今天在搭建一个递归服务器, 想要测试一下递归结果, 根据ECS来判断相关的递归服务器结果

结果在进行递归查询的时候, 发现一个问题, 递归携带了subnet, 查询后再更换subnet,递归直接读取了缓存, 而不是带着新的subnet去递归.

### 排查

为了对比这个问题,使用了不同的域名来进行递归,发现一个问题,两个域名在递归服务器有不同的结果. 域名z.gsmiot.com在第一次递归后会一直缓存, aws.amazon.com域名会根据子网变换每次都会递归.

我对比里查询的结果, 发现了一个区别:

z.gsmiot.com
```text
[root@10-9-104-141 unbound]#  dig z.gsmiot.com @127.0.0.1 +subnet=178.24.161.99/16

; <<>> DiG 9.11.4-P2-RedHat-9.11.4-16.P2.el7_8.6 <<>> z.gsmiot.com @127.0.0.1 +subnet=178.24.161.99/16
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 36175
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
; CLIENT-SUBNET: 178.24.0.0/16/0
;; QUESTION SECTION:
;z.gsmiot.com.			IN	A

;; ANSWER SECTION:
z.gsmiot.com.		3600	IN	A	8.8.8.8

;; Query time: 994 msec
;; SERVER: 127.0.0.1#53(127.0.0.1)
;; WHEN: Tue Nov 03 11:03:27 CST 2020
;; MSG SIZE  rcvd: 67
```

aws.amazon.com
```text
[root@10-9-104-141 unbound]# dig aws.amazon.com @127.0.0.1 +subnet=178.24.161.99/16

; <<>> DiG 9.11.4-P2-RedHat-9.11.4-16.P2.el7_8.6 <<>> aws.amazon.com @127.0.0.1 +subnet=178.24.161.99/16
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 2145
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
; CLIENT-SUBNET: 178.24.0.0/16/24
;; QUESTION SECTION:
;aws.amazon.com.			IN	A

;; ANSWER SECTION:
aws.amazon.com.		300	IN	CNAME	tp.8e49140c2-frontier.amazon.com.
tp.8e49140c2-frontier.amazon.com. 300 IN CNAME	dr49lng3n1n2s.cloudfront.net.
dr49lng3n1n2s.cloudfront.net. 300 IN	A	54.230.150.74

;; Query time: 420 msec
;; SERVER: 127.0.0.1#53(127.0.0.1)
;; WHEN: Tue Nov 03 11:03:53 CST 2020
;; MSG SIZE  rcvd: 147
```

对比发现了响应的结果有区别, 在`OPT PSEUDOSECTION`这个部分,有一个地方有区别:
```text
AWS 权威
; CLIENT-SUBNET: 178.24.0.0/16/24
ZDNS 权威
; CLIENT-SUBNET: 178.24.0.0/16/0
```

又测试了subnet生效的aws域名, 递归会根据发现子网这个地址`178.24.0.0/[A]/[B]`中的 A 和 B 两个prefix来做判断, 如果携带的A范围较大, 就是用A, 而B范围较大, 就使用B. 现在猜测这里的B可能是由权威返回的.

查询了一下相关文档 [RFC7871 Client Subnet in DNS Queries](https://tools.ietf.org/html/rfc7871#section-7.2.1)

其中在7.2.1节中内容:

```text
7.2.1.  Authoritative Nameserver

   When a query containing an ECS option is received, an Authoritative
   Nameserver supporting ECS MAY use the address information specified
   in the option to generate a tailored response.

   Authoritative Nameservers that have not implemented or enabled
   support for the ECS option ought to safely ignore it within incoming
   queries, per [RFC6891], Section 6.1.2.  Such a server MUST NOT
   include an ECS option within replies to indicate lack of support for
   it.  Implementers of Intermediate Nameservers should be aware,
   however, that some nameservers incorrectly echo back unknown EDNS0
   options.  In this protocol, that should be mostly harmless, as the
   SCOPE PREFIX-LENGTH should come back as 0, thus marking the response
   as covering all networks.

   A query with a wrongly formatted option (e.g., an unknown FAMILY)
   MUST be rejected and a FORMERR response MUST be returned to the
   sender, as described in [RFC6891], "Transport Considerations".
```

其中一段 `In this protocol, that should be mostly harmless, as the SCOPE PREFIX-LENGTH should come back as 0, thus marking the response as covering all networks.` 这里`SCOPE PREFIX-LENGTH`如果为0的话, 响应就会应用到所有网络. 目前猜测ZDNS的权威可能属于这个问题的范围.

查询了一下文档, 找到了IETF上有一个相关文档 [A Look at the ECS Behavior of
DNS Resolvers](https://www.ietf.org/proceedings/106/slides/slides-106-maprg-a-look-at-the-ecs-behavior-of-dns-resolvers-kyle-schomp-01)

有如下一段内容:

```text
ECS Purpose
• Enable CDN server selection by ADNS based on client subnet
• ECS Option in DNS queries from resolvers to ADNS includes
• Client IP address prefix
• Source prefix length
• ECS Option in DNS responses from ADNS to resolvers includes
• Scope prefix length
```

现在可以推断极大概率是因为这个scop prefix length的问题了

### 验证

使用tcpudump抓包两次递归服务的递归结果
```shell
tcpdump -i eth0 port 53 -w zcloud.cap
tcpdump -i eth0 port 53 -w aws.cap
```

在wireshark中打开看到结果

在响应结果的记录中
- 打开Domain Name System (response)
- 打开Addional records
- 打开<Root>: type OPT
- 打开<Option: CSUBNET - Client subnet

对比看到Scope Netmask有区别, aws返回为24, zdns返回为0

问题确认, 是由于权威返回结果的问题导致的
