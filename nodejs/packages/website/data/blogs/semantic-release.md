# Using semantic release
在介绍`semantic release`之前, 首先介绍`semantic versioning`

## Semantic Versioning
语义化版本 [链接](https://semver.org)

### 摘要

版本格式：主版本号.次版本号.修订号，版本号递增规则如下：
1. 主版本号：当你做了不兼容的 API 修改，
2. 次版本号：当你做了向下兼容的功能性新增，
3. 修订号：当你做了向下兼容的问题修正。
先行版本号及版本编译元数据可以加到“主版本号.次版本号.修订号”的后面，作为延伸。

### 简介

在软件管理的领域里存在着被称作“依赖地狱”的死亡之谷，系统规模越大，加入的包越多，你就越有可能在未来的某一天发现自己已深陷绝望之中。
在依赖高的系统中发布新版本包可能很快会成为噩梦。如果依赖关系过高，可能面临版本控制被锁死的风险（必须对每一个依赖包改版才能完成某次升级）。而如果依赖关系过于松散，又将无法避免版本的混乱（假设兼容于未来的多个版本已超出了合理数量）。当你专案的进展因为版本依赖被锁死或版本混乱变得不够简便和可靠，就意味着你正处于依赖地狱之中。
作为这个问题的解决方案之一，我提议用一组简单的规则及条件来约束版本号的配置和增长。这些规则是根据（但不局限于）已经被各种封闭、开放源码软件所广泛使用的惯例所设计。为了让这套理论运作，你必须先有定义好的公共 API 。这可以透过文件定义或代码强制要求来实现。无论如何，这套 API 的清楚明了是十分重要的。一旦你定义了公共 API，你就可以透过修改相应的版本号来向大家说明你的修改。考虑使用这样的版本号格式：X.Y.Z （主版本号.次版本号.修订号）修复问题但不影响API 时，递增修订号；API 保持向下兼容的新增及修改时，递增次版本号；进行不向下兼容的修改时，递增主版本号。
我称这套系统为“语义化的版本控制”，在这套约定下，版本号及其更新方式包含了相邻版本间的底层代码和修改内容的信息。

### 为什么要使用语义化的版本控制？

这并不是一个新的或者革命性的想法。实际上，你可能已经在做一些近似的事情了。问题在于只是“近似”还不够。如果没有某个正式的规范可循，版本号对于依赖的管理并无实质意义。将上述的想法命名并给予清楚的定义，让你对软件使用者传达意向变得容易。一旦这些意向变得清楚，弹性（但又不会太弹性）的依赖规范就能达成。
举个简单的例子就可以展示语义化的版本控制如何让依赖地狱成为过去。假设有个名为“救火车”的函式库，它需要另一个名为“梯子”并已经有使用语义化版本控制的包。当救火车创建时，梯子的版本号为 3.1.0。因为救火车使用了一些版本 3.1.0 所新增的功能， 你可以放心地指定依赖于梯子的版本号大等于 3.1.0 但小于 4.0.0。这样，当梯子版本 3.1.1 和 3.2.0 发布时，你可以将直接它们纳入你的包管理系统，因为它们能与原有依赖的软件兼容。
作为一位负责任的开发者，你理当确保每次包升级的运作与版本号的表述一致。现实世界是复杂的，我们除了提高警觉外能做的不多。你所能做的就是让语义化的版本控制为你提供一个健全的方式来发行以及升级包，而无需推出新的依赖包，节省你的时间及烦恼。
如果你对此认同，希望立即开始使用语义化版本控制，你只需声明你的函式库正在使用它并遵循这些规则就可以了。请在你的 README 文件中保留此页连结，让别人也知道这些规则并从中受益。

## Semantic Release
Semantic release, 中文大意是语义发布, 作用是实现完全自动化的版本管理和发布.

`Semantic-release` 会自动完成整个发布流程, 包括: 自动查明下一个版本号, 生成release note 和 进行包的发布.

这消除了人类情感和版本号之间的直接联系, 严格的遵循`Semantic Versioning` 规范.

![kill-all-humans](semantic-release/kill-all-humans.png)

### 亮点

* 完全自动发布
* 确保语义版本(Semantic Versioning)规范
* 新特性和修复可以立即对用户可用
* 提醒维护者和用户新的发布
* 在代码库中使用格式化的提交信息变化并生成文档
* 基于git merges可以创建不同的发布频道
* 和CI工作流集成
* 和手动发布相比避免潜在的说明错误
* 经由插件支持任何版本能管理和语言
* 使用`共享配置(shareable configurations)`来方便和复用配置

### How it works?

#### 提交信息格式 (commit message format)

`Semantic Release`使用用户提交信息(commit message) 查出更新变化的类型.
通过commit message的格式约定, semantic-release 自动查出下一个semantic version版本号,
生成更新日志并发布版本.

Semantic-release默认使用Angular Commit message conventions. 
提交信息格式可以通过修改`@semantic-release/commit-analyzer`和`@semantic-release/release-notes-generator`的`preset`和`config`选项来改变.

通过像commitzen和commitlint之类的工具可以帮助确保验证提交信息符合约定.

提交示例:
```markdown
fix(pencil): stop graphite breaking when too much pressure applied        Patch Release
feat(pencil): add 'graphiteWidth' option                                  Minor Feature Release
perf(pencil): remove graphiteWidth option                                 Major Breaking Release

BREAKING CHANGE: The graphiteWidth option has been removed. 
The default graphite width of 10mm is always used for 
performance reasons.
```

### 现实中的项目示例

```yaml
name: nodejs-scripts-validate-and-release
on:
  push:
    paths:
      - 'nodejs/packages/scripts/**'
      - '.github/workflows/nodejs-scripts-validate-and-release.yml'
    branches:
      - '+([0-9])?(.{+([0-9]),x}).x'
      - 'master'
      - 'next'
      - 'next-major'
      - 'beta'
      - 'alpha'
      - '!all-contributors/**'
  pull_request: {}
jobs:
  main:
    # ignore all-contributors PRs
    if: ${{ !contains(github.head_ref, 'all-contributors') }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest]
        node: [12, 14, 15]
    runs-on: ${{ matrix.os }}
    steps:
      - name: 🛑 Cancel Previous Runs
        uses: styfle/cancel-workflow-action@0.6.0
        with:
          access_token: ${{ secrets.GITHUB_TOKEN }}

      - name: ⬇️ Checkout repo
        uses: actions/checkout@v2

      - name: ⎔ Setup node
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node }}

      - name: 📥 Download deps
        uses: bahmutov/npm-install@v1
        with:
          useLockFile: false
          working-directory: 'nodejs/packages/scripts'

      - name: ▶️ Run validate script
        working-directory: 'nodejs/packages/scripts'
        run: npm run validate

      - name: ⬆️ Upload coverage report
        uses: codecov/codecov-action@v1
        with:
          directory: 'nodejs/packages/scripts/coverage/'

  release:
    needs: main
    runs-on: ubuntu-latest
    if:
      ${{ github.repository == 'gsmlg/Foundation' &&
      contains('refs/heads/master,refs/heads/beta,refs/heads/next,refs/heads/alpha',
      github.ref) && github.event_name == 'push' }}
    steps:
      - name: 🛑 Cancel Previous Runs
        uses: styfle/cancel-workflow-action@0.6.0
        with:
          access_token: ${{ secrets.GITHUB_TOKEN }}

      - name: ⬇️ Checkout repo
        uses: actions/checkout@v2

      - name: ⎔ Setup node
        uses: actions/setup-node@v1
        with:
          node-version: 14

      - name: 📥 Download deps
        uses: bahmutov/npm-install@v1
        with:
          useLockFile: false
          working-directory: 'nodejs/packages/scripts'

      - name: 🏗 Run build script
        working-directory: 'nodejs/packages/scripts'
        run: npm run build

      - name: 🚀 Release
        uses: gsmlg/semantic-release-action@v2
        with:
          working-directory: 'nodejs/packages/scripts'
          semantic_version: 17
          branches: |
            [
              '+([0-9])?(.{+([0-9]),x}).x',
              'master',
              'next',
              'next-major',
              {name: 'beta', prerelease: true},
              {name: 'alpha', prerelease: true}
            ]
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

```

