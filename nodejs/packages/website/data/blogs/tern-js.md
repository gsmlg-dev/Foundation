## Tern: JavaScript 智能分析工具

Tern 是一个独立的 JavaScript 代码分析引擎

Tern 被设计成为编辑器插件，用来强化编辑器的智能编辑。

提供了如下特性：

- 自动完成变量名称／属性
- 函数参数提示
- 查询表达式属性
- 查到目标定义的地点
- 自动重构

### 编辑器插件

- Emacs
- Vim
- Sublime Text
- Brackets (built in to the base editor)
- Light Table
- Eclipse (and general Java API)
- TextMate
- SourceLair (built in to the base editor)
- Chocolat (built in to the base editor)

### 支持文档与配置

[在线文档](http://ternjs.net/doc/manual.html)

配置文件，需要在项目下添加`.tern-project`文件
格式为 JSON 格式，示例如下：

```json
{
  "libs": ["browser", "jquery"],
  "loadEagerly": ["importantfile.js"],
  "plugins": {
    "doc_comment": {},
    "node": {},
    "webpack": {
      "configPath": "./tasks/webpack.conf.js"
    }
  }
}
```

#### libs

整个项目中包含的库，由[JSON type descriptions](http://ternjs.net/doc/manual.html#typedef)格式指定

使用 JSON 格式定义的库文档，全局有效

已有预定义库：

- browser
- chai
- ecmascript
- jquery
- react
- underscore

#### loadEagerly

配置总是会加载的文件

#### Plugins - 支持的插件：

- commonjs
- angular
- complete_strings
- doc_comment
- es_modules
- modules
- node_resolve
- requirejs
- node
- webpack

其它配置项可以参考在线文档

### 安装

```shell

npm install -g tern
// or
yarn global add tern

```

### 使用

编辑器会自动从`PATH`下启动`tern`

#### Emacs 使用

```lisp
(maybe-require-package 'tern)
(maybe-require-package 'company-tern)
```

使用搜索`tern`开头的函数

默认快捷键

- `M-.` 跳到定义点
- `m-,` 跳回
- `C-c c` 读取类型
- `C-c d` 读取文档

#### 其它编辑器

配置类似 Emacs

快捷键检查通过命令搜索，预定义快捷键

#### DEBUG

启动`tern`，项目目录下：

```shell

tern --persistent --debug --verbose

```

可以向`tern`监听的端口发送`POST`请求就可以获取对应数据信息

示例：

```shell

Mac-Pro% curl -i localhost:64672 -X POST -d '
{"query": {
    "end": 4,
    "file": "assets/javascripts/zddi/address/audit_ip/models/audit_ips.js",
    "type": "definition",
    "variable": null
  }}'
HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
Date: Sun, 25 Jun 2017 11:10:56 GMT
Connection: keep-alive
Transfer-Encoding: chunked

{"origin":"assets/javascripts/zddi/common/models/collection.js","start":361,"end":1130,"file":"assets/javascripts/zddi/common/models/collection.js","contextOffset":50,"context":"able: false,\n\n    model: Model,\n\n    constructor: "}%

```
