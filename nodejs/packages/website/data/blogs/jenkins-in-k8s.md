## 在 Kubernetes 中安装 jenkins

### 简介

在 kubernetes 中安装 Jenkins
Jenkins 会以 master 方式运行，当有 build 任务时，会在 kubernetes 中启动一个 pod 来运行对应的构建任务
需要配置对应的 pod 来解决常规的构建问题

### 安装 Jeknis 到 Kubernetes：

    使用仓库 https://github.com/gsmlg/jenkins 中的配置

1. 配置 Deployment
   使用 deployment.yaml

```
kubectl create -f deployment.yaml
```

2. 配置 service.yaml
   使用 service.yaml

```
kubectl create -f service.yaml
```

3. 手动添加 ingress 配置
   使用`rancher`配置 ingress 服务

### 对 jenkins 进行配置

1. 在 configure global security 中可以配置用户，用于登陆管理

2. 配置连接 kubernetes 的权限

   - 在 configure system 中，配置

添加 cloud 配置

- 配置 `kubernetes URL` 为 `API server` 的地址

- 在 `Credentials` 配置上配置 `kubeconfig`

- 添加`Jenkins tunnel` 地址，地址为`service`配置中的 `jenkins-jnlp` 的地址

- 配置`Kubenetes Pod Template`， `labels` 配置用于`slave`启动时添加的配置

- 配置`contaienr`参照需求配置

  记录下配置的 Labels

  删除 command to run， Arguments to pass to the command 配置

  dind 配置需要添加 volume 映射 docker.sock

        contaienr镜像当前需要自己配置，目前已经做了两个镜像
        - gsmlg/jenkins-slave-jnlp-dind
        - gsmlg/jenkins-slave-jnlp-nodejs

### 配置项目

添加`project`的时候

- 通过 `Label Expression` 来确定使用哪一个`Pod template` 来启动 `slave`

- `Source Code Management` 配置 git 项目地址

- `branches to build` 指定那些分支会进行构建

- `Build Triggers` 中指定自动出发 build 的触发器

- `Build Environment` 指定 Build 终端输出颜色

- `Build` 指定 build 命令，可以分阶段执行

- `Post build` build 完成后的动作

## Comment

- jnlp - Java Network Launch Protocol [Link](https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/jnlp.html)
