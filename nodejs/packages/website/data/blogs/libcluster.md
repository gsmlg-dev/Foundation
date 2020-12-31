### `libcluster`

之前看了**Elixir Conf**上演示的集群自动扩展和发现，一直很想试试

有空在博客上实现了这个功能，使用`libcluster`来完成集群中的节点自动发现

`libcluster` 提供了很多自动发现的方式，有：

- Cluster.Strategy.Epmd, which relies on epmd to connect to a configured set of hosts.
- Cluster.Strategy.ErlangHosts, which uses the .hosts.erlang file to determine which hosts to connect to.
- Cluster.Strategy.Gossip, which uses multicast UDP to form a cluster between nodes gossiping a heartbeat.
- Cluster.Strategy.Kubernetes, which uses the Kubernetes Metadata API to query nodes based on a label selector and basename.
- Cluster.Strategy.Kubernetes.DNS, which uses DNS to join nodes under a shared headless service in a given namespace.
- Cluster.Strategy.Kubernetes.DNSSRV, which uses DNS SRV to join nodes under a shared headless service in a given namespace.
- Cluster.Strategy.Rancher, which like the Kubernetes strategy, uses a metadata API to query nodes to cluster with.

根据我的情况，使用 Kubernetes 的发现机制来实现

Kuberntes 有几种，DNS 和 DNSSRV 比较适合 statefulset 来控制，由于我使用的是 deployment，所以就使用了`Cluster.Strategy.Kubernetes`

### 使用中的一些问题

官方版本的服务发现写死了 cluster domain 为 cluster.local，由于我自己使用了公开域名来做 cluster domain，所以我 fork 了一个版本做了修改

修改过程还发现一个问题，Module 的 attribute 值是编译时决定的，我错误的使用系统 env 导致每次都失败，后来排查发现了问题。

这里是我的 topoogies 配置

```elixir
topologies = [
  gsmlg: [
    strategy: Cluster.Strategy.Kubernetes,
    config: [
      mode: :ip,
      kubernetes_ip_lookup_mode: :pods,
      kubernetes_node_basename: "#{GSMLG.name}",
      kubernetes_selector: System.get_env("SELECTOR", "gsmlg.org/app=blog"),
      kubernetes_namespace: System.get_env("NAMESPACE", "#{GSMLG.name}"),
      polling_interval: 10_000
    ]
  ]
]
```

我选用的是 IP 模式，是根据 selector，来选取 endpoint 和 pod 来连接服务

这里的 node_basename 是 opt app name，不是 domain 的 basename，区别于 dns/hostname 模式

### 完成总结

最后实现成功后发现原先写的小程序有问题，因为原先的服务发现是自己手动调整的，处理时间有问题，还需要重新调整一下。
