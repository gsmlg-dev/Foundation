# `Serverless` and `Lambda`

## What is `Serverless`

通常，我们可以控制向我们已经部署的的 Web 应用发起的 Http 请求。
我们负责为应用配置和管理资源，保证应用在服务上运行。
这有一些问题：

1. 即使我们的服务没有被用户请求，也会被收取服务费用。

2. 我们需要负责服务器及其所有资源的正常运行和维护。

3. 我们还负责将适当的安全更新应用于服务器。

4. 当应用使用量激增的时候我们需要扩展服务。当应用使用量下降时我们需要减少服务投入。

对于较小的公司和个人开发者来说，这可能需要处理很多。
这最终会分散我们的精力，分散我们投入在构建和维护实际应用的力量。

在大型组织中，这由基础架构团队处理，通常不是单个开发人员的责任。
但是，支持此操作所需的过程最终会减慢开发时间。

应用因为必需与基础架构团队合作才能启动和运行，所以很难持续构建应用。
作为开发人员，我们一直在寻找这些问题的解决方案，而`serverless`正是应运而生。

## Severless Coumputing

**Serverless Coumputing**（简称为 `serverless`）是一种执行模型，其中云提供商（AWS，Azure 或 Google Cloud）负责通过动态分配资源来执行一段代码。
并且根据运行代码的资源量进行收费。

代码通常在无状态容器内运行，可以由各种事件触发，包括
`http requests`, `database events`, `queuing services`, `monitoring alerts`, `file uploads`, `scheduled events` (`cron jobs`), 等。
发送到云的代码执行提供程序通常采用函数的形式。

因此，`serverless`有时被称为`Fucntions as Services`或`FaaS`。
以下是主要云提供商的 FaaS 产品：

- AWS：[AWS Lambda](https://aws.amazon.com/lambda/)
- Microsoft Azure：[Azure Functions](https://azure.microsoft.com/en-us/services/functions/)
- Google Cloud：[Cloud Functions](https://cloud.google.com/functions/)

虽然`serverless`将底层基础架构从开发人员手中抽象出来，但`server`仍然参与执行我们的`function`。

由于代码将作为单独的函数执行，因此我们需要注意一些事项。

## Microservices

在转换到`serverless`世界时，我们面临的最大变化是我们的应用程序需要以`functions`的形式进行组织。
我们可能习惯将应用程序部署为单个 Rails 或 Express 整体应用程序。

在`serverless`的世界中，我们通常需要采用更基础的微服务的架构。
我们可以通过在单个函数中运行整个应用程序，并自行处理应用整体路由来解决这个问题。
但不建议这样做，因为我们需要尽量减小`functions`的大小。

## Stateless Functions

我们的`functions`通常运行在安全的无状态容器内。
这意味着我们不能在应用服务中运行一些代码：

- 在 event 完成后还需要运行，执行时间超长
- 需要使用先前的上下文来执行请求
  我们必须认为我们的函数每次都在新的容器中运行使用。

这有一些细微之处，我们将在什么是 AWS Lambda 章节中讨论。

## Cold Starts

由于我们的函数是在按需响应事件的容器内运行的，因此存在一些与之相关的延迟，这被称之为`Cold Start`。
在`function`完成执行后，我们的容器可能会保留一段时间。如果在此期间触发了另一个事件，则响应速度更快，这通常称为`Warm Start`。

`Code Start`的延迟时间取决于所使用的云提供商的实现。
在 AWS Lambda 上，它的范围可以从几百毫秒到几秒不等。
它可以取决于所使用的运行时（或语言），函数的大小（作为包），当然还有所涉及的云提供者。
多年来，`Code Start`已经大大改善，因为云提供商在优化低延迟时间方面已经做得更好。

除了优化我们的`functions`外，我们还可以使用一些简单的技巧，例如指定时间内执行脚本，每隔几分钟调用一次`function`以保持`Warm`。

使用 [`Serverless Framework`](https://serverless.com) 可以帮助我们很好的使 `serverless` 应用 [`Warm Start`](https://github.com/FidelLimited/serverless-plugin-warmup)

# What is Lambda

AWS Lambda (简称为 Lambda) 是由亚马逊云计算（AWS）提供的`serverless` 服务。
当我们使用 Lambda 来构建 serverless 应用时，虽然我们不需要知道 Lambda 内部是如何工作的，但是我们了解`functions`是如何被执行的还是非常重要的。

## Lambda Specs

我们从 Lambda 的技术规范开始。Lambda 支持如下运行时。

- Node.js: v10.15 and v8.10
- Java 8
- Python: 3.7, 3.6, and 2.7
- .NET Core: 1.0.1 and 2.1
- Go 1.x
- Ruby 2.5
- Rust

每个函数都在一个 64 位 Amazon Linux AMI 中的容器内运行。并且执行环境具有：

- Memory: 128MB - 3008MB, in 64 MB increments
- Ephemeral disk space: 512MB
- Max execution duration: 900 seconds
- Compressed package size: 50MB
- Uncompressed package size: 250MB

我们看到 CPU 未被提及作为容器规范的一部分。
这是因为我们无法直接控制 CPU。
随着内存的增加，CPU 也会增加。

临时磁盘空间以`/tmp`目录的形式提供。
我们只能将此空间用于临时存储，因为后续调用将无法访问此空间。
我们将在下面讨论 Lambda 函数的无状态特性。

执行持续时间意味着您的 Lambda 函数最多可以运行 900 秒或 15 分钟。
这意味着 Lambda 不适用于长时间运行的进程。

包大小是指运行函数所需的所有代码。
这包括我们的函数可能导入的任何依赖项（Node.js 中的 `node_modules` 目录）。
未压缩的上限制为 250MB，压缩后限制为 50MB。
我们将看看下面的包装过程。

## Lambda Function

最后，这是 Lambda Function (Node.js 版本) 的样子。

```javascript

exports.myHandler = function(event, context, callback) {

  // Do Stuff

  callback(Error error, Object result)

}

```

这里，`myHandler` 是我们的 Lambda function 的名字。
`event` 对象包含了触发这个 Lambda 的时间的所有信息。
如果 event 为一个 HTTP 请求触发，信息为 HTTP 请求的所有特征。
`context`对象包含了 Lambda function 执行的运行时的信息
当函数执行结束后，我们使用`callback`来回结束执行，并返回结果，AWS 会把结果返回给 HTTP 请求

## Packaging Functions

Lambda function 需要打包并发送到 AWS。
这通常是压缩函数及其所有依赖项并将其上载到 S3 存储桶的过程。并且让 AWS 知道您希望在特定 event 发生时使用此包。
为了简化完成此过程，我们可以使用`Serverless Framework`。

## Execution Model

运行我们的`function`的容器（以及它使用的资源）完全由 AWS 管理。
它在`event`发生时启动，如果没有使用则关闭。
如果在执行`event`时发出了其他相同`event`，则会启动一个新容器来响应请求。
这意味着如果我们遇到使用量激增，云提供商只需使用我们的函数创建容器的多个实例来为这些请求提供服务。

这有一些有趣的含义。
首先，我们的`function`实际上是`stateless`的。
其次，每个请求（或 event）由独立的实例提供`Lambda function`服务。
这意味着我们不需要在代码中处理并发请求。
只要有新请求，AWS 就会调出一个容器。
它在这里进行了一些优化。
它会让容器留存几分钟（5 到 15 分钟，具体取决于负载），因此它可以在没有`Cold Start`的情况下响应后续请求。

## Stateless Functions

上述执行模型使 `Lambda function` 实际的无状态。
这意味着每次`Lambda function`由`event`触发时，都会在全新的环境中调用它。
您无权访问上一个事件的执行上下文。

但是，由于上面提到的优化，每个容器实例化仅调用一次实际的`Lambda function`。
回想一下，我们的函数是在容器内运行的。
因此，当首次调用函数时，我们的处理函数中的所有代码都会被执行，并且调用处理函数。
如果容器仍可用于后续请求，则将调用您的函数，而不是其周围的代码。

例如，下面的`createNewDbConnection`方法在每个容器实例化时调用一次，而不是每次调用`Lambda function`时调用。
另一方面，`myHandler`函数在每次调用时都会被调用。

```javascript
var dbConnection = createNewDbConnection();

exports.myHandler = function (event, context, callback) {
  var result = dbConnection.makeQuery();
  callback(null, result);
};
```

容器的缓存效果也适用于我们上面讨论过的`/tmp`目录。
只要容器被缓存，它就可用。

现在我们可以猜测这不是一种使我们的`Lambda function`有状态的非常可靠的方法。
这是因为我们只是不控制调用`Lambda`或缓存其容器的基础进程。

## Pricing

最后，Lambda 函数仅对执行函数所花费的时间进行计费。
它从它开始执行到返回或终止的时间计算。
它向上舍入到最接近的 100 毫秒。

请注意，虽然 AWS 可能会在容器完成后保留容器和 Lambda 函数; 但我们不用为这个付费。

Lambda 提供了非常慷慨的免费套餐。

Lambda 免费套餐包括每月 1,000,000 次免费请求和每月 400,000 GB-seconds 的计算时间。
过去，每 100 万个请求需要 0.20 美元，每 GB-seconds 需要 0.00001667 美元。
GB-seconds 基于 Lambda 函数的内存消耗。
有关详细信息，请查看 Lambda 定价页面。

Lambda 通常是我们基础设施成本中最便宜的部分。

# Why Create Serverless Apps?

```
 _____ _   _       _____ _
|_   _| | ( )     /  __ \ |
  | | | |_|/ ___  | /  \/ |__   ___  ___ _ __
  | | | __| / __| | |   | '_ \ / _ \/ _ \ '_ \
 _| |_| |_  \__ \ | \__/\ | | |  __/  __/ |_) |
 \___/ \__| |___/  \____/_| |_|\___|\___| .__/
                                        | |
                                        |_|
```

重要的是要明白为什么值得学习如何创建`serverless`应用程序。
`serverless`应用程序优于传统服务器托管应用程序的原因有几个：

- 低维护
- 低成本
- 易于扩展

到目前为止，最大的好处是我们只需要关心代码而不需要担心其他问题。
低维护是因为没有任何服务器需要管理。
我们无需确保服务器正常运行并保证我们的服务器应用正确的安全更新。
我们只需要处理自己的应用程序代码，没有别的。

运行`serverless`应用程序更便宜的主要原因是您实际上只按每个请求付费。
因此，当我们的服务未被使用时，我们不会被收取任何费用。
让我们快速分析一下我们运行笔记应用的成本。
我们假设每天有 1000 个活跃用户每天向我们的 API 发出 20 个请求，并在 S3 上存储大约 10MB 的文件。
这是对我们成本的非常粗略的计算。

| Service             | Rate                                                                  |   Cost |
| :------------------ | :-------------------------------------------------------------------- | -----: |
| Cognito             | Free[1]                                                               | \$0.00 |
| API Gateway         | $3.5/M reqs + $0.09/GB transfer                                       | \$2.20 |
| Lambda              | Free[2]                                                               | \$0.00 |
| DynamoDB            | $0.0065/hr 10 write units, $0.0065/hr 50 read units[3]                | \$2.80 |
| S3                  | $0.023/GB storage, $0.005/K PUT, $0.004/10K GET, $0.0025/M objects[4] | \$0.24 |
| CloudFront          | $0.085/GB transfer + $0.01/10K reqs                                   | \$0.86 |
| Route53             | $0.50 per hosted zone + $0.40/M queries                               | \$0.50 |
| Certificate Manager | Free                                                                  | \$0.00 |
| Total               |                                                                       | \$6.10 |

- [1] Cognito is free for < 50K MAUs and \$0.00550/MAU onwards.
- [2] Lambda is free for < 1M requests and 400000GB-secs of compute.
- [3] DynamoDB gives 25GB of free storage.
- [4] S3 gives 1GB of free transfer.

因此成本大约是每月**\$6.1**。
这些都是非常粗略的估计。
现实世界的使用模式可能会有一些不同。
但是，这让我们了解如何计算运行`serverless`应用程序的成本。
