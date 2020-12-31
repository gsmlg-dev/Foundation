# 概述

无界面浏览器 <`headdless mode`> 在进行自动化测试和服务器上运行时非常有用。

在服务器上，可能需要运行浏览器去执行一些特殊的任务，但是服务器上是没有 X Window 系统，这个时候
就需要使用无界面浏览器了。

无界面浏览器可以去打开一些真正的页面，并且渲染，然后输出到 html，pdf 或图片。

无界面浏览器还可以打开调试端口，在没有图形界面的情况下，调试真正的浏览器页面。

## Chrome

Chrome 从版本 59 开始，提供了无界面浏览功能，使用方式如下:

```shell
chrome \
  --headless \                   # Runs Chrome in headless mode.
  --disable-gpu \                # Temporarily needed for now.
  --remote-debugging-port=9222 \
  https://www.chromestatus.com   # URL to open. Defaults to about:blank.
```

- chrome 命令设置：

```shell
alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
alias chrome-canary="/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary"
alias chromium="/Applications/Chromium.app/Contents/MacOS/Chromium"
```

Chrome headless mode 提供了很多强大功能：

- 输出 DOM 结构

`--dump-dom` flag 会输出`document.body.innerHTML`

```shell
chrome --headless --disable-gpu --dump-dom https://www.chromestatus.com/
```

- 输出 PDF

```shell
chrome --headless --disable-gpu --print-to-pdf https://www.chromestatus.com/
```

- 输出截图

```shell
chrome --headless --disable-gpu --screenshot https://www.chromestatus.com/

# Size of a standard letterhead.
chrome --headless --disable-gpu --screenshot --window-size=1280,1696 https://www.chromestatus.com/

# Nexus 5x
chrome --headless --disable-gpu --screenshot --window-size=412,732 https://www.chromestatus.com/
```

- REPL

`--repl` 会打开一个 JS Console

```shell
$ chrome --headless --disable-gpu --repl https://www.chromestatus.com/
[0608/112805.245285:INFO:headless_shell.cc(278)] Type a Javascript expression to evaluate or "quit" to exit.
>>> location.href
{"result":{"type":"string","value":"https://www.chromestatus.com/features"}}
>>> quit
$
```

- 远程调试

`--remote-debugging-port=9222` 会打开调试端口，调试基于`DevTools protocol`协议
可以通过编辑器连接，来进行远程调试。

### Node 编程接口

**The Puppeteer API**

Puppeteer is a Node library developed by the Chrome team.
It provides a high-level API to control headless (or full) Chrome.
It's similar to other automated testing libraries like Phantom and NightmareJS,
but it only works with the latest versions of Chrome.

Among other things, Puppeteer can be used to easily take screenshots,
create PDFs, navigate pages, and fetch information about those pages.
I recommend the library if you want to quickly automate browser testing.
It hides away the complexities of the DevTools protocol and takes care of redundant tasks like launching a debug instance of Chrome.

Install it:

```shell
yarn add puppeteer
```

Example - print the user agent

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  console.log(await browser.version());
  browser.close();
})();
```

Example - taking a screenshot of the page

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.chromestatus.com', { waitUntil: 'networkidle' });
  await page.pdf({ path: 'page.pdf', format: 'A4' });

  browser.close();
})();
```

Check out [Puppeteer's documentation](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md) to learn more about the full API.

## Firefox

Headless Firefox works on Fx55+ on Linux, and 56+ on Windows/Mac.

从 Firefox 57 开始，Firefox 开始支持截图

```
/path/to/firefox -headless -screenshot https://developer.mozilla.com
```

- `-screenshot` name url — Set a custom name for the screenshot by including it between the -screenshot flag and the URL you want to capture. Note that you can specify other web-compatible image formats such as .jpg, .bmp, etc.
- `--window-size=x` — Set a custom viewport width when taking the screenshot (full height is maintained). Note that the single argument version of this doesn't work.
- `--window-size=x,y` — Set a custom viewport width and height to capture.

Firefox headless 模式可以用于自动化测试，基于`Selenium`。

MDN 的[`headless-example`](https://github.com/mdn/headless-examples)
