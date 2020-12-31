## 概念

基于组件的软件工程（Component-based software engineering，简称 CBSE）或基于组件的开发（Component-Based Development，简称 CBD）是一种软件开发范型。

它是现今软件复用理论实用化的研究热点，在组件对象模型的支持下，通过复用已有的构件，软件开发者可以“即插即用”地快速构造应用软件。

这样不仅可以节省时间和经费，提高工作效率，而且可以产生更加规范、更加可靠的应用软件。

## 什么是组件？

摘自 Wikipedia：

    一个单独的软件组件是一个软件包，一个Web服务，一个Web资源，或封装了一组相关功能（或数据）的模块。

    组件通过接口相互通信。当一个组件向系统的其他部分提供服务时，它会采用一个提供的接口来指定其他组件可以使用的服务，以及如何这样做。这个接口可以被看作是组件的签名 - 客户端不需要知道组件的内部工作（实现），以便使用它。这个原理导致组件被称为封装。

## Web 设计的 3 层结构

- 结构层 Structural layer => HTML

- 表现层 Design layer => CSS

- 行为层 Behavioral layer => JavaScript

一个独立的组件需要包含这 3 层结构，并且提供 API 接口，和其他组件之间通信。

设计一个组件需要有可编程接口，可以通过行为层控制，而这些都需要通过 js 来控制

涉及技术：

- html in js
- css in js

## React 组件

React 是一个用于创建用户 UI 的 JavaScript 库

React 组件可以被认为是一个基本的视图元素，用户界面中的一个片段。

在一个应用中，组件具有巢状结构，整个应用由一些容器组件构成，而容器组件由多级组件嵌套构成。

## 设计分类：

- Component UI 组件

- Container 组件容器，包含 UI 组件，并且给 UI 组件绑定相应的数据

### UI 组件

UI 组件需要包含了完整页面部分和展示结构，以及对应行为接口.

一个 UI 组件是完整的，独立的，可测试的。

可以参考的 React UI 组件库：

- [Semantic UI](https://react.semantic-ui.com/introduction)

- [Material UI](https://material-ui-next.com/getting-started/installation/)

目前需要提取当前 UI 组件，实现组件独立可重用。
当前有待实现的是 Dialog 模块的 React 组件化

### Container 容器组件

容器组件是由 UI 组件和业务数据，处理逻辑组成
容器把业务数据和 UI 组件绑定，构成一个对应的功能模块

### container 的绑定

在 React 中，组件拥有生命周期，数据和 UI 的绑定会和生命周期方法相关
通过生命周期方法来关联数据

### 高阶组件 Hight-Order Components

高阶组件是 React 的一项高级技术，来实现组件的重用。高阶组件是由 React 设计而衍生出的一种构成模式。

高阶组件实质上是一个函数，接受一个组件传入，并返回一个新的组件。
高阶组件常见于 React 相关的第三方库，比如 Redux 的 connect 函数

目前有待实现的高阶组件：

- loadModule：
  分离一个模块到单独的文件，实现模块依赖加载，当时用到的时候才会去加载对应的功能模块。

- withReducer：
  分割 Reducer 处理逻辑，分模块加载 reducer 控制逻辑

- withEffects：
  分割模块 action 异步控制逻辑，管理 action 调度功能
  目前可以参考的是 saga 和 reactivex 技术

## React context 技术

React context 技术可以在应用上发布一个共享数据集合，应用下的任何一个组件都可以通过声明订阅的方式来获取这个数据。

目前我们已经使用了这个技术的地方是 redux 的 Provider，发布了 store 给所有组件

### 其他类似功能实现：

- LanguagePrivider 由 react-intl 提供，实现语言动态切换
- JssProvider 由 CSS in JS 技术提供，结合 withStyles 高阶组件来实现动态样式更新
- RouterProvider 由 React-Router 提供，实现 router 导航功能
