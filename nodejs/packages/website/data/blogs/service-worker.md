### 简介：什么是 `Service Worker`

`Service workers` 本质上充当 Web 应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理。
它们旨在（除其他之外）使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作。
他们还允许访问推送通知和后台同步 API。

### Service Worker 概念和用法

Service worker 是一个注册在指定源和路径下的事件驱动 worker。它采用 JavaScript 控制关联的页面或者网站，拦截并修改访问和资源请求，细粒度地缓存资源。你可以完全控制应用在特定情形（最常见的情形是网络不可用）下的表现。

Service worker 运行在 worker 上下文，因此它不能访问 DOM。相对于驱动应用的主 JavaScript 线程，它运行在其他线程中，所以不会造成阻塞。它设计为完全异步，同步 API（如 XHR 和 localStorage）不能在 service worker 中使用。

出于安全考量，Service workers 只能由 HTTPS 承载，毕竟修改网络请求的能力暴露给中间人攻击会非常危险。在 Firefox 浏览器的用户隐私模式，Service Worker 不可用。

      注意：Service workers之所以优于以前同类尝试（如AppCache），是因为它们无法支持当操作出错时终止操作。Service workers可以更细致地控制每一件事情。

      注意：Service workers大量使用Promise，因为通常它们会等待响应后继续，并根据响应返回一个成功或者失败的操作。Promise非常适合这种场景。

**注册：**

使用 ServiceWorkerContainer.register() 方法首次注册 service worker。如果注册成功，service worker 就会被下载到客户端并尝试安装或激活（见下文），这将作用于整个域内用户可访问的 URL，或者其特定子集。

**下载、安装和激活**

此时，你的服务工作者(service worker)将遵守以下生命周期：

1. 下载
2. 安装
3. 激活

用户首次访问 service worker 控制的网站或页面时，service worker 会立刻被下载。

之后，在以下情况将会触发更新:

一个前往作用域内页面的导航
在 service worker 上的一个事件被触发并且过去 24 小时没有被下载
无论它与现有 service worker 不同（字节对比），还是第一次在页面或网站遇到 service worker，如果下载的文件是新的，安装就会尝试进行。

如果这是首次启用 service worker，页面会首先尝试安装，安装成功后它会被激活。

如果现有 service worker 已启用，新版本会在后台安装，但不会被激活，这个时序称为 worker in waiting。直到所有已加载的页面不再使用旧的 service worker 才会激活新的 service worker。只要页面不再依赖旧的 service worker，新的 service worker 会被激活（成为 active worker）。

你可以监听`InstallEvent`，事件触发时的标准行为是准备 service worker 用于使用，例如使用内建的 storage API 来创建缓存，并且放置应用离线时所需资源。

还有一个 activate 事件，触发时可以清理旧缓存和旧的 service worker 关联的东西。

Servcie worker 可以通过 `FetchEvent` 事件去响应请求。通过使用 `FetchEvent.respondWith` 方法，你可以任意修改对于这些请求的响应。

      注意: 因为oninstall和onactivate完成前需要一些时间，service worker标准提供一个waitUntil方法，当oninstall或者onactivate触发时被调用，接受一个promise。在这个 promise被成功resolve以前，功能性事件不会分发到service worker。

### 其他使用场景

Service workers 也可以用来做这些事情：

- 后台数据同步
- 响应来自其它源的资源请求
- 集中接收计算成本高的数据更新，比如地理位置和陀螺仪信息，这样多个页面就可以利用同一组数据
- 在客户端进行 CoffeeScript，LESS，CJS/AMD 等模块编译和依赖管理（用于开发目的）
- 后台服务钩子
- 自定义模板用于特定 URL 模式
- 性能增强，比如预取用户可能需要的资源，比如相册中的后面数张图片

未来 service workers 能够用来做更多使 web 平台接近原生应用的事。 值得关注的是，其他标准也能并且将会使用 service worker，例如:

- 后台同步：启动一个 service worker 即使没有用户访问特定站点，也可以更新缓存
- 响应推送：启动一个 service worker 向用户发送一条信息通知新的内容可用
- 对时间或日期作出响应
- 进入地理围栏

### 接口

- Cache

表示用于 Request/Response 对象对的存储，作为 ServiceWorker 生命周期的一部分被缓存。

- CacheStorage

表示 Cache 对象的存储。提供一个所有命名缓存的主目录，ServiceWorker 可以访问并维护名字字符串到 Cache 对象的映射。

- Client

表示 service worker client 的作用域。一个 service worker client 可以是浏览器上下文的一个文档，也可以是一个由活动 worker 控制的 SharedWorker。

- Clients

表示一个 Client 对象容器，是访问当前源的活动 service worker clients 的主要途径。

- ExtendableEvent

扩展被分发到 ServiceWorkerGlobalScope 的 install 和 activate 事件时序，作为 service worker 生命周期的一部分。这会确保任何功能型事件（如 FetchEvent）不被分发到 ServiceWorker，直到它更新了数据库架构、删除过期缓存项等等以后。

- ExtendableMessageEvent

The event object of a message event fired on a service worker (when a channel message is received on the ServiceWorkerGlobalScope from another context) — extends the lifetime of such events.

- FetchEvent

传递给 ServiceWorkerGlobalScope.onfetch 处理函数的参数，FetchEvent 代表一个在 ServiceWorker 的 ServiceWorkerGlobalScope 中分发的请求动作。它包含关于请求和响应的结果信息，并且提供 FetchEvent.respondWith()方法，这个方法允许我们提供任意的响应返回到控制页面。

- InstallEvent

传递给 oninstall 处理函数的参数，InstallEvent 接口代表一个在 ServiceWorker 的 ServiceWorkerGlobalScope 中分发的安装动作，作为 ExtendableEvent 的子事件，它保证诸如 FetchEvent 的功能性事件在安装过程中不会被分发。

- NavigationPreloadManager

Provides methods for managing the preloading of resources with a service worker.

- Navigator.serviceWorker

返回一个 ServiceWorkerContainer 对象，可以提供入口用于注册，删除，更新以及与在相关 document 中 ServiceWorker 通信的对象。

- NotificationEvent

传递给 onnotificationclick 处理函数的参数，NotificationEvent 接口代表在 ServiceWorker 里 ServiceWorkerGlobalScope 中分发的单击事件通知。

- ServiceWorker

表示一个 service worker。多个浏览的上下文(例如 pages,workers 等等)都能通过相同的 ServiceWorker 对象相关联。

- ServiceWorkerContainer

提供一个在网络生态中把 service worker 作为一个整体的对象，包括辅助注册，反注册以及更新服务工作者，并且访问 service worker 的状态以及他们的注册信息。

- ServiceWorkerGlobalScope

表示 service worker 的全局执行上下文。

- ServiceWorkerMessageEvent

包含关于一个发送给以 navigator.serviceWorker 为目标的事件信息。Note that this interface is deprecated in modern browsers. Service worker messages will now use the MessageEvent interface, for consistency with other web messaging features.

- ServiceWorkerRegistration

表示 service worker 的注册。

- ServiceWorkerState

Associated with its ServiceWorker's state.

- SyncEvent

传递给同步函数的参数，SyncEvent 接口代表在 ServiceWorker 里 ServiceWorkerGlobalScope 分发的同步动作。

- SyncManager

提供一个接口用于注册和返回 SyncRegistration 对象。

- WindowClient

表示在浏览器上下文中记录的 service worker 客户端的作用域，被活动的工作者控制。是 Client 对象的特殊类型，包含一些附加的方法和可用的属性。
