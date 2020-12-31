## 奇怪的 Bug

开发网络管理的时候，发现了一个非常奇怪的 bug。

当时的情况是：当网络管理打开一个对话框并关闭后，切换到其它的菜单后，再切换回来，对话框会自动的打开。

经过多次调试后发现，在 HOC 挂载 reducer 的时候，redux 执行了 action `{ type: @@redux/INIT }`，
在 action 进入 reducer 的时候，突然变成了打开对话框的 action `{ type: address/networks/trigger-action, payload: { aciton: 'create'} }`

**对比发现问题**

- Chrome，Firefox 出现这个问题，IE，Safari 没有这个问题
- 在 Chrome 和 Firefox 中，build production 时也没有这个问题
- 在调试过程加断点，当逐步调试进入 eval 代码快中后，也没有这个问题了

## 结论

Webpack DLL 插件为了加速编译，模块被转换为字符串在 eval 中执行，在 eval 中执行出现了内存泄漏，导致执行错误。

Javascript 中 `eval` 函数作为被严格模式禁止的函数，必然存在 bug，目前不能在项目中使用。
