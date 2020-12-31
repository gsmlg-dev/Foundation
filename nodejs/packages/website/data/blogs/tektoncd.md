# Tekton Pipelines

## Intro

Tekton Pipelines 是一个为`Kubernetes`应用程序配置和运行`CI / CD`风格的`Pipelined`的开源实现

`Pipeline` 创建 `Custom Resources` 作为构建模块来声明`pipelines`

Tekton Pipelines 是云原生的

- 运行于`Kubernetes`
- 将`Kubernetes`集群作为一级资源类型
- 使用容器作为构建块

Tekton Pipelines 是解耦的

- Pipeline 可以被部署于任意 k8s 集群
- 组成`pipeline`的`task`可以分开独立运行
- 向 Git repos 之类的资源可以轻松的在运行之间交换

Tekton Pipelines are Typed

- 类型化的资源意味着对于诸如 Image 之类的资源，可以轻松地将资源输出

### 此设计的高级细节：

- Pipeline 运行管道，可以实现一个流程，可以由事件出发，也可以通过`PipelineRun`来运行
- Task 基本运行单元，可以通过`TaskRun`来运行
- PipelineResource `Task`的输入和输出资源

## 各类资源介绍

### PipelineResources

`PipelineResource` 是 `Pipline` 中 `Task` 的输入和输出对象

Syntax:

To define a configuration file for a PipelineResource, you can specify the following fields:

- Required:
  - apiVersion - Specifies the API version, for example tekton.dev/v1alpha1.
  - kind - Specify the PipelineResource resource object.
  - metadata - Specifies data to uniquely identify the PipelineResource object, for example a name.
  - spec - Specifies the configuration information for your PipelineResource resource object.
  - type - Specifies the type of the PipelineResource
- Optional:
  - params - Parameters which are specific to each type of PipelineResource

Types:

- Git
- PullRequest
- Image
- Cluster
- Storage
- CloutEvent

### Tasks

Task(or ClusterTask) 是 CI 中一个组顺序执行的 step 的集合，是基本任务单位。Task 会在 pod 中运行。

Task 需要声明三部分：

- inputs
- outputs
- steps

Task 在 namespace 中可用，ClusterTask 在整个集群可用

Syntax:

To define a configuration file for a Task resource, you can specify the following fields:

- Required:
  - apiVersion - Specifies the API version, for example tekton.dev/v1alpha1.
  - kind - Specify the Task resource object.
  - metadata - Specifies data to uniquely identify the Task resource object, for example a name.
  - spec - Specifies the configuration information for your Task resource object. Task steps must be defined through either of the following fields:
    -steps - Specifies one or more container images that you want to run in your Task.
- Optional:
  - inputs - Specifies parameters and PipelineResources needed by your Task
  - outputs - Specifies PipelineResources created by your Task
  - volumes - Specifies one or more volumes that you want to make available to your Task's steps.
  - stepTemplate - Specifies a Container step definition to use as the basis for all steps within your Task.
  - sidecars - Specifies sidecar containers to run alongside steps.

### Piplines

Pipline 定义并执行一组 Task

Syntax:

To define a configuration file for a Pipeline resource, you can specify the following fields:

- Required:
  - apiVersion - Specifies the API version, for example tekton.dev/v1alpha1.
  - kind - Specify the Pipeline resource object.
  - metadata - Specifies data to uniquely identify the Pipeline resource object, for example a name.
  - spec - Specifies the configuration information for your Pipeline resource object. In order for a Pipeline to do anything, the spec must include:
    - tasks - Specifies which Tasks to run and how to run them
- Optional:
  - resources - Specifies which PipelineResources of which types the Pipeline will be using in its Tasks
  - tasks
    - resources.inputs / resource.outputs
      - from - Used when the content of the PipelineResource should come from the output of a previous Pipeline Task
      - runAfter - Used when the Pipeline Task should be executed after another Pipeline Task, but there is no output linking required
      - retries - Used when the task is wanted to be executed if it fails. Could be a network error or a missing dependency. It does not apply to cancellations.
      - conditions - Used when a task is to be executed only if the specified conditions are evaluated to be true.

Task 执行顺序，所有 Task 默认都会并行执行，除非指定了

- from
- runAfter
  两项会指定 task 执行的依赖关系

For example see this Pipeline spec:

```yaml
- name: lint-repo
  taskRef:
    name: pylint
  resources:
    inputs:
      - name: workspace
        resource: my-repo
- name: test-app
  taskRef:
    name: make-test
  resources:
    inputs:
      - name: workspace
        resource: my-repo
- name: build-app
  taskRef:
    name: kaniko-build-app
  runAfter:
    - test-app
  resources:
    inputs:
      - name: workspace
        resource: my-repo
    outputs:
      - name: image
        resource: my-app-image
- name: build-frontend
  taskRef:
    name: kaniko-build-frontend
  runAfter:
    - test-app
  resources:
    inputs:
      - name: workspace
        resource: my-repo
    outputs:
      - name: image
        resource: my-frontend-image
- name: deploy-all
  taskRef:
    name: deploy-kubectl
  resources:
    inputs:
      - name: my-app-image
        resource: my-app-image
        from:
          - build-app
      - name: my-frontend-image
        resource: my-frontend-image
        from:
          - build-frontend
```

This will result in the following execution graph:

```none
        |            |
        v            v
     test-app    lint-repo
    /        \
   v          v
build-app  build-frontend
   \          /
    v        v
    deploy-all
```

## 安装

运行 kubectl 安装指定的 yaml 文件

```shell
kubectl apply -f https://raw.githubusercontent.com/gsmlg/pipeline/master/updated.yaml
```

检查所有 pod 都处于`running`状态时，安装完成

```shell
kubectl -n tekton-pipelines get pods
```

安装 dashboard，更方便的查看 pipeline

```shell
kubectl apply -f https://raw.githubusercontent.com/gsmlg/pipeline/master/updated_dashboard.yaml
```

## 演示运行一个`singlecloud`的构建过程

创建账户

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: pipeline-run-role
rules:
  - apiGroups:
      - extensions
    resources:
      - deployments
    verbs:
      - get
      - list
      - watch
      - create
      - update
      - patch
      - delete

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: pipeline-run-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: pipeline-run-role
subjects:
  - kind: ServiceAccount
    name: pipeline-run-service
    namespace: default

---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: pipeline-run-service
  namespace: default
secrets:
  - name: regcred

---
apiVersion: v1
data:
  .dockerconfigjson: <encoded docker registry auth data>
kind: Secret
metadata:
  name: regcred
  namespace: default
type: kubernetes.io/dockerconfigjson
```

定义资源

```yaml
apiVersion: tekton.dev/v1alpha1
kind: PipelineResource
metadata:
  name: zcloud-image
spec:
  type: image
  params:
    - name: url
      value: docker.io/gsmlg/zcloud
```

创建 task

```yaml
apiVersion: tekton.dev/v1alpha1
kind: Task
metadata:
  name: build-image-from-git
spec:
  inputs:
    resources:
      - name: docker-source
        type: git
    params:
      - name: pathToDockerFile
        type: string
        description: The path to the dockerfile to build
        default: /workspace/docker-source/Dockerfile
      - name: pathToContext
        type: string
        description: The build context used by Kaniko
          (https://github.com/GoogleContainerTools/kaniko#kaniko-build-contexts)
        default: /workspace/docker-source
  outputs:
    resources:
      - name: builtImage
        type: image
  steps:
    - name: build-and-push
      image: registry.zdns.cn/gsmlg/kaniko-project-executor:v0.13.0
      # specifying DOCKER_CONFIG is required to allow kaniko to detect docker credential
      env:
        - name: 'DOCKER_CONFIG'
          value: '/builder/home/.docker/'
      command:
        - /kaniko/executor
      args:
        - --dockerfile=$(inputs.params.pathToDockerFile)
        - --destination=$(outputs.resources.builtImage.url)
        - --context=$(inputs.params.pathToContext)
        - --oci-layout-path=/builder/home/image-outputs/builtImage
        - --skip-tls-verify

---
apiVersion: tekton.dev/v1alpha1
kind: Task
metadata:
  name: build-zcloud
spec:
  inputs:
    resources:
      - name: docker-source
        type: git
      - name: image
        type: image
      - name: uiImage
        type: image
    params:
      - name: pathToDockerFile
        type: string
        description: The path to the dockerfile to build
        default: /workspace/docker-source/Dockerfile
      - name: pathToContext
        type: string
        description: The build context used by Kaniko
          (https://github.com/GoogleContainerTools/kaniko#kaniko-build-contexts)
        default: /workspace/docker-source
  outputs:
    resources:
      - name: builtImage
        type: image
  steps:
    - name: setup-dockerfile
      image: docker.io/ubuntu:18.04
      command:
        - /workspace/docker-source/setup.sh
      args:
        - $(inputs.resources.image.url)
        - $(inputs.resources.uiImage.url)
        - /workspace/docker-source/Dockerfile
    - name: build-and-push
      image: registry.zdns.cn/gsmlg/kaniko-project-executor:v0.13.0
      # specifying DOCKER_CONFIG is required to allow kaniko to detect docker credential
      env:
        - name: 'DOCKER_CONFIG'
          value: '/builder/home/.docker/'
      command:
        - /kaniko/executor
      args:
        - --dockerfile=$(inputs.params.pathToDockerFile)
        - --destination=$(outputs.resources.builtImage.url)
        - --context=$(inputs.params.pathToContext)
        - --oci-layout-path=/builder/home/image-outputs/builtImage
        - --skip-tls-verify

---
apiVersion: tekton.dev/v1alpha1
kind: Pipeline
metadata:
  name: zcloud-build-pipeline
spec:
  resources:
    - name: singlecloud-repo
      type: git
    - name: singlecloud-ui-repo
      type: git
    - name: zcloud-repo
      type: git
    - name: singlecloud-image
      type: image
    - name: singlecloud-ui-image
      type: image
    - name: zcloud-image
      type: image
  tasks:
    - name: build-singlecloud-ui
      retries: 1
      taskRef:
        name: build-image-from-git
      resources:
        inputs:
          - name: docker-source
            resource: singlecloud-ui-repo
        outputs:
          - name: builtImage
            resource: singlecloud-ui-image
    - name: build-singlecloud
      taskRef:
        name: build-image-from-git
      resources:
        inputs:
          - name: docker-source
            resource: singlecloud-repo
        outputs:
          - name: builtImage
            resource: singlecloud-image
    - name: build-zcloud
      taskRef:
        name: build-zcloud
      resources:
        inputs:
          - name: docker-source
            resource: zcloud-repo
          - name: uiImage
            resource: singlecloud-ui-image
            from:
              - build-singlecloud-ui
          - name: image
            resource: singlecloud-image
            from:
              - build-singlecloud
        outputs:
          - name: builtImage
            resource: zcloud-image
```

运行 pipelinue:

```yaml
apiVersion: tekton.dev/v1alpha1
kind: PipelineRun
metadata:
  generateName: zcloud-build-run-
spec:
  pipelineRef:
    name: zcloud-build-pipeline
  serviceAccount: pipeline-run-service
  resources:
    - name: singlecloud-repo
      resourceSpec:
        type: git
        params:
          - name: revision
            value: master
          - name: url
            value: https://github.com/zdnscloud/singlecloud
    - name: singlecloud-ui-repo
      resourceSpec:
        type: git
        params:
          - name: revision
            value: master
          - name: url
            value: https://github.com/zdnscloud/singlecloud-ui
    - name: zcloud-repo
      resourceSpec:
        type: git
        params:
          - name: revision
            value: master
          - name: url
            value: https://github.com/gsmlg/zcloud-image
    - name: singlecloud-image
      resourceSpec:
        type: image
        params:
          - name: url
            value: registry.zdns.cn/zcloud/singlecloud:master
    - name: singlecloud-ui-image
      resourceSpec:
        type: image
        params:
          - name: url
            value: registry.zdns.cn/zcloud/singlecloud-ui:master
    - name: zcloud-image
      resourceRef:
        name: zcloud-image
```
