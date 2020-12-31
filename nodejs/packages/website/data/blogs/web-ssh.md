调研相关软件

- node-pty
- xterm.js
- blessed
- ssh2

### node-pty

[链接](https://github.com/microsoft/node-pty)

node.js 的 forkpty（3） 绑定。这允许您使用伪终端文件描述符分叉进程。它返回允许读取和写入的终端对象。

这对于：

- 编写终端仿真器（例如通过 xterm.js）。
- 让某些程序认为您是终端，例如当您需要程序向您发送控制序列时。

node-pty 支持 Linux、macOS 和 Windows。通过使用 Windows 1809+ 上的 [Windows conpty API](https://blogs.msdn.microsoft.com/commandline/2018/08/02/windows-command-line-introducing-the-windows-pseudo-console-conpty/) 或者旧版本中的[winpty](https://github.com/rprichard/winpty)，获得 Windows 支持。

### xterm.js

[链接](https://github.com/xtermjs/xterm.js)

Xterm.js 是一个在 TypeScript 中编写的前端组件，它允许应用程序在浏览器中为其用户带来功能齐全的终端。它被流行的项目，如 VS 代码，超级和 Theia 使用。

#### **Feature**

- Terminal apps just work: Xterm.js 可以通大多数终端 apps，比如`bash`，`vim`和`tmux`，一起工作，这包含了 Curses-based 应用和鼠标事件支持。
- 性能：Xterm.js 非常快速，它甚至包括了 GPU 加速渲染
- 丰富的 unicode 支持：支持 CJK，emojis 和 IMEs
- 自包含：没有任何依赖就可以运行
- 无障碍：可以打开屏幕阅读器和最小对比度支持
- 更多的：Links，therming，addons，优秀的 API 文档，等等

#### What xterm.js is not

- Xterm.js is not a terminal application that you can download and use on your computer.
- Xterm.js is not `bash`. Xterm.js can be connected to processes like `bash` and let you interact with them (provide input, receive output).

### blessed

为 node.js 开发的一个带有高级终端接口的 curses-like library

### ssh2

SSH2 客户端和服务器模块以纯 JavaScript 编写的运行于 node.js.

开发/测试针对 OpenSSH（当前为 7.6） 完成。

## 设计实现

最初设计实现是通过 websocket 服务打通浏览器到 server 之间的连接，使用`xterm.js`在浏览器创建 terminal UI，并使用`node-pty`在 server 打开对应的 shell 来进行服务。

这样只需要使用 web 做好认证就可以处理当前的问题。

经过一番选择后，不希望直接连接服务器，所以更换了一种方式。

在 web 服务器上启动一个`ss2`客户端代理，接入服务后，要求用户来输入用户的 ssh 登陆密码来进行登陆，对应服务器上需要启动 openssh-server。在浏览器启动 xterm.js 模拟终端，之后在浏览器和服务之间创建连接隧道，让终端和 ssh2 代理通讯。

## SSH2 解析

```txt
ssh2@0.8.9
└─┬ ssh2-streams@0.4.10
  ├─┬ asn1@0.2.4
  │ └── safer-buffer@2.1.2
  ├─┬ bcrypt-pbkdf@1.0.2
  │ └── tweetnacl@0.14.5
  └── streamsearch@0.1.2
```

- ssh2
  提供 ssh Client/Server
- ssh-streams
  提供 ssh 传输流，包含加密解密和传输处理

## SSH2 API

`require('ssh2').Client` returns a **_Client_** constructor.

`require('ssh2').Server` returns a **_Server_** constructor.

`require('ssh2').utils` returns the [utility methods from `ssh2-streams`](https://github.com/mscdex/ssh2-streams#utility-methods).

`require('ssh2').HTTPAgent` returns an [`http.Agent`](https://nodejs.org/docs/latest/api/http.html#http_class_http_agent) constructor.

`require('ssh2').HTTPSAgent` returns an [`https.Agent`](https://nodejs.org/docs/latest/api/https.html#https_class_https_agent) constructor. Its API is the same as `HTTPAgent` except it's for HTTPS connections.

`require('ssh2').SFTP_STATUS_CODE` returns the [`SFTPStream.STATUS_CODE` from `ssh2-streams`](https://github.com/mscdex/ssh2-streams/blob/master/SFTPStream.md#sftpstream-static-constants).

`require('ssh2').SFTP_OPEN_MODE` returns the [`SFTPStream.OPEN_MODE` from `ssh2-streams`](https://github.com/mscdex/ssh2-streams/blob/master/SFTPStream.md#sftpstream-static-constants).

### Client

#### Client events

- **banner**(< _string_ >message, < _string_ >language) - A notice was sent by the server upon connection.

- **ready**() - Authentication was successful.

- **tcp connection**(< _object_ >details, < _function_ >accept, < _function_ >reject) - An incoming forwarded TCP connection is being requested. Calling `accept` accepts the connection and returns a `Channel` object. Calling `reject` rejects the connection and no further action is needed. `details` contains:

  - **srcIP** - _string_ - The originating IP of the connection.

  - **srcPort** - _integer_ - The originating port of the connection.

  - **destIP** - _string_ - The remote IP the connection was received on (given in earlier call to `forwardIn()`).

  - **destPort** - _integer_ - The remote port the connection was received on (given in earlier call to `forwardIn()`).

- **x11**(< _object_ >details, < _function_ >accept, < _function_ >reject) - An incoming X11 connection is being requested. Calling `accept` accepts the connection and returns a `Channel` object. Calling `reject` rejects the connection and no further action is needed. `details` contains:

  - **srcIP** - _string_ - The originating IP of the connection.

  - **srcPort** - _integer_ - The originating port of the connection.

- **keyboard-interactive**(< _string_ >name, < _string_ >instructions, < _string_ >instructionsLang, < _array_ >prompts, < _function_ >finish) - The server is asking for replies to the given `prompts` for keyboard-interactive user authentication. `name` is generally what you'd use as a window title (for GUI apps). `prompts` is an array of `{ prompt: 'Password: ', echo: false }` style objects (here `echo` indicates whether user input should be displayed on the screen). The answers for all prompts must be provided as an array of strings and passed to `finish` when you are ready to continue. Note: It's possible for the server to come back and ask more questions.

- **unix connection**(< _object_ >details, < _function_ >accept, < _function_ >reject) - An incoming forwarded UNIX socket connection is being requested. Calling `accept` accepts the connection and returns a `Channel` object. Calling `reject` rejects the connection and no further action is needed. `details` contains:

  - **socketPath** - _string_ - The originating UNIX socket path of the connection.

- **change password**(< _string_ >message, < _string_ >language, < _function_ >done) - If using password-based user authentication, the server has requested that the user's password be changed. Call `done` with the new password.

- **continue**() - Emitted when more requests/data can be sent to the server (after a `Client` method returned `false`).

- **error**(< _Error_ >err) - An error occurred. A 'level' property indicates 'client-socket' for socket-level errors and 'client-ssh' for SSH disconnection messages. In the case of 'client-ssh' messages, there may be a 'description' property that provides more detail.

- **end**() - The socket was disconnected.

- **close**() - The socket was closed.

#### Client methods

- **(constructor)**() - Creates and returns a new Client instance.

- **connect**(< _object_ >config) - _(void)_ - Attempts a connection to a server using the information given in `config`:

  - **host** - _string_ - Hostname or IP address of the server. **Default:** `'localhost'`

  - **port** - _integer_ - Port number of the server. **Default:** `22`

  - **localAddress** - _string_ - IP address of the network interface to use to connect to the server. **Default:** (none -- determined by OS)

  - **localPort** - _string_ - The local port number to connect from. **Default:** (none -- determined by OS)

  - **forceIPv4** - _boolean_ - Only connect via resolved IPv4 address for `host`. **Default:** `false`

  - **forceIPv6** - _boolean_ - Only connect via resolved IPv6 address for `host`. **Default:** `false`

  - **hostHash** - _string_ - Any valid hash algorithm supported by node. The host's key is hashed using this algorithm and passed to the **hostVerifier** function. **Default:** (none)

  - **hostVerifier** - _function_ - Function with parameters `(hashedKey[, callback])` where `hashedKey` is a string hex hash of the host's key for verification purposes. Return `true` to continue with the handshake or `false` to reject and disconnect, or call `callback()` with `true` or `false` if you need to perform asynchronous verification. **Default:** (auto-accept if `hostVerifier` is not set)

  - **username** - _string_ - Username for authentication. **Default:** (none)

  - **password** - _string_ - Password for password-based user authentication. **Default:** (none)

  - **agent** - _string_ - Path to ssh-agent's UNIX socket for ssh-agent-based user authentication. **Windows users: set to 'pageant' for authenticating with Pageant or (actual) path to a cygwin "UNIX socket."** **Default:** (none)

  - **agentForward** - _boolean_ - Set to `true` to use OpenSSH agent forwarding (`auth-agent@openssh.com`) for the life of the connection. `agent` must also be set to use this feature. **Default:** `false`

  - **privateKey** - _mixed_ - _Buffer_ or _string_ that contains a private key for either key-based or hostbased user authentication (OpenSSH format). **Default:** (none)

  - **passphrase** - _string_ - For an encrypted private key, this is the passphrase used to decrypt it. **Default:** (none)

  - **localHostname** - _string_ - Along with **localUsername** and **privateKey**, set this to a non-empty string for hostbased user authentication. **Default:** (none)

  - **localUsername** - _string_ - Along with **localHostname** and **privateKey**, set this to a non-empty string for hostbased user authentication. **Default:** (none)

  - **tryKeyboard** - _boolean_ - Try keyboard-interactive user authentication if primary user authentication method fails. If you set this to `true`, you need to handle the `keyboard-interactive` event. **Default:** `false`

  - **authHandler** - _function_ - Function with parameters `(methodsLeft, partialSuccess, callback)` where `methodsLeft` and `partialSuccess` are `null` on the first authentication attempt, otherwise are an array and boolean respectively. Return or call `callback()` with the name of the authentication method to try next (pass `false` to signal no more methods to try). Valid method names are: `'none', 'password', 'publickey', 'agent', 'keyboard-interactive', 'hostbased'`. **Default:** function that follows a set method order: None -> Password -> Private Key -> Agent (-> keyboard-interactive if `tryKeyboard` is `true`) -> Hostbased

  - **keepaliveInterval** - _integer_ - How often (in milliseconds) to send SSH-level keepalive packets to the server (in a similar way as OpenSSH's ServerAliveInterval config option). Set to 0 to disable. **Default:** `0`

  - **keepaliveCountMax** - _integer_ - How many consecutive, unanswered SSH-level keepalive packets that can be sent to the server before disconnection (similar to OpenSSH's ServerAliveCountMax config option). **Default:** `3`

  - **readyTimeout** - _integer_ - How long (in milliseconds) to wait for the SSH handshake to complete. **Default:** `20000`

  - **sock** - _ReadableStream_ - A _ReadableStream_ to use for communicating with the server instead of creating and using a new TCP connection (useful for connection hopping).

  - **strictVendor** - _boolean_ - Performs a strict server vendor check before sending vendor-specific requests, etc. (e.g. check for OpenSSH server when using `openssh_noMoreSessions()`) **Default:** `true`

  - **algorithms** - _object_ - This option allows you to explicitly override the default transport layer algorithms used for the connection. Each value must be an array of valid algorithms for that category. The order of the algorithms in the arrays are important, with the most favorable being first. For a list of valid and default algorithm names, please review the documentation for the version of `ssh2-streams` used by this module. Valid keys:

    - **kex** - _array_ - Key exchange algorithms.

    - **cipher** - _array_ - Ciphers.

    - **serverHostKey** - _array_ - Server host key formats.

    - **hmac** - _array_ - (H)MAC algorithms.

    - **compress** - _array_ - Compression algorithms.

  - **compress** - _mixed_ - Set to `true` to enable compression if server supports it, `'force'` to force compression (disconnecting if server does not support it), or `false` to explicitly opt out of compression all of the time. Note: this setting is overridden when explicitly setting a compression algorithm in the `algorithms` configuration option. **Default:** (only use compression if that is only what the server supports)

  - **debug** - _function_ - Set this to a function that receives a single string argument to get detailed (local) debug information. **Default:** (none)

**Default authentication method order:** None -> Password -> Private Key -> Agent (-> keyboard-interactive if `tryKeyboard` is `true`) -> Hostbased

- **exec**(< _string_ >command[, < _object_ >options], < _function_ >callback) - _boolean_ - Executes `command` on the server. Returns `false` if you should wait for the `continue` event before sending any more traffic. `callback` has 2 parameters: < _Error_ >err, < _Channel_ >stream. Valid `options` properties are:

  - **env** - _object_ - An environment to use for the execution of the command.

  - **pty** - _mixed_ - Set to `true` to allocate a pseudo-tty with defaults, or an object containing specific pseudo-tty settings (see 'Pseudo-TTY settings'). Setting up a pseudo-tty can be useful when working with remote processes that expect input from an actual terminal (e.g. sudo's password prompt).

  - **x11** - _mixed_ - Set to `true` to use defaults below, set to a number to specify a specific screen number, or an object with the following valid properties:

    - **single** - _boolean_ - Allow just a single connection? **Default:** `false`

    - **screen** - _number_ - Screen number to use **Default:** `0`

    - **protocol** - _string_ - The authentication protocol name. **Default:** `'MIT-MAGIC-COOKIE-1'`

    - **cookie** - _mixed_ - The authentication cookie. Can be a hex _string_ or a _Buffer_ containing the raw cookie value (which will be converted to a hex string). **Default:** (random 16 byte value)

- **shell**([[< _mixed_ >window,] < _object_ >options]< _function_ >callback) - _boolean_ - Starts an interactive shell session on the server, with an optional `window` object containing pseudo-tty settings (see 'Pseudo-TTY settings'). If `window === false`, then no pseudo-tty is allocated. `options` supports the `x11` and `env` options as described in `exec()`. `callback` has 2 parameters: < _Error_ >err, < _Channel_ >stream. Returns `false` if you should wait for the `continue` event before sending any more traffic.

- **forwardIn**(< _string_ >remoteAddr, < _integer_ >remotePort, < _function_ >callback) - _boolean_ - Bind to `remoteAddr` on `remotePort` on the server and forward incoming TCP connections. `callback` has 2 parameters: < _Error_ >err, < _integer_ >port (`port` is the assigned port number if `remotePort` was 0). Returns `false` if you should wait for the `continue` event before sending any more traffic. Here are some special values for `remoteAddr` and their associated binding behaviors:

  - '' - Connections are to be accepted on all protocol families supported by the server.

  - '0.0.0.0' - Listen on all IPv4 addresses.

  - '::' - Listen on all IPv6 addresses.

  - 'localhost' - Listen on all protocol families supported by the server on loopback addresses only.

  - '127.0.0.1' and '::1' - Listen on the loopback interfaces for IPv4 and IPv6, respectively.

- **unforwardIn**(< _string_ >remoteAddr, < _integer_ >remotePort, < _function_ >callback) - _boolean_ - Unbind from `remoteAddr` on `remotePort` on the server and stop forwarding incoming TCP connections. Until `callback` is called, more connections may still come in. `callback` has 1 parameter: < _Error_ >err. Returns `false` if you should wait for the `continue` event before sending any more traffic.

- **forwardOut**(< _string_ >srcIP, < _integer_ >srcPort, < _string_ >dstIP, < _integer_ >dstPort, < _function_ >callback) - _boolean_ - Open a connection with `srcIP` and `srcPort` as the originating address and port and `dstIP` and `dstPort` as the remote destination address and port. `callback` has 2 parameters: < _Error_ >err, < _Channel_ >stream. Returns `false` if you should wait for the `continue` event before sending any more traffic.

- **sftp**(< _function_ >callback) - _boolean_ - Starts an SFTP session. `callback` has 2 parameters: < _Error_ >err, < _SFTPStream_ >sftp. For methods available on `sftp`, see the [`SFTPStream` client documentation](https://github.com/mscdex/ssh2-streams/blob/master/SFTPStream.md) (except `read()` and `write()` are used instead of `readData()` and `writeData()` respectively, for convenience). Returns `false` if you should wait for the `continue` event before sending any more traffic.

- **subsys**(< _string_ >subsystem, < _function_ >callback) - _boolean_ - Invokes `subsystem` on the server. `callback` has 2 parameters: < _Error_ >err, < _Channel_ >stream. Returns `false` if you should wait for the `continue` event before sending any more traffic.

- **end**() - _(void)_ - Disconnects the socket.

- **openssh_noMoreSessions**(< _function_ >callback) - _boolean_ - OpenSSH extension that sends a request to reject any new sessions (e.g. exec, shell, sftp, subsys) for this connection. `callback` has 1 parameter: < _Error_ >err. Returns `false` if you should wait for the `continue` event before sending any more traffic.

- **openssh_forwardInStreamLocal**(< _string_ >socketPath, < _function_ >callback) - _boolean_ - OpenSSH extension that binds to a UNIX domain socket at `socketPath` on the server and forwards incoming connections. `callback` has 1 parameter: < _Error_ >err. Returns `false` if you should wait for the `continue` event before sending any more traffic.

- **openssh_unforwardInStreamLocal**(< _string_ >socketPath, < _function_ >callback) - _boolean_ - OpenSSH extension that unbinds from a UNIX domain socket at `socketPath` on the server and stops forwarding incoming connections. `callback` has 1 parameter: < _Error_ >err. Returns `false` if you should wait for the `continue` event before sending any more traffic.

- **openssh_forwardOutStreamLocal**(< _string_ >socketPath, < _function_ >callback) - _boolean_ - OpenSSH extension that opens a connection to a UNIX domain socket at `socketPath` on the server. `callback` has 2 parameters: < _Error_ >err, < _Channel_ >stream. Returns `false` if you should wait for the `continue` event before sending any more traffic.

### Server

#### Server events

- **connection**(< _Connection_ >client, < _object_ >info) - A new client has connected. `info` contains the following properties:

  - **ip** - _string_ - The `remoteAddress` of the connection.

  - **family** - _string_ - The `remoteFamily` of the connection.

  - **port** - _integer_ - The `remotePort` of the connection.

  - **header** - _object_ - Information about the client's header:

    - **identRaw** - _string_ - The raw client identification string.

    - **versions** - _object_ - Various version information:

      - **protocol** - _string_ - The SSH protocol version (always `1.99` or `2.0`).

      - **software** - _string_ - The software name and version of the client.

    - **comments** - _string_ - Any text that comes after the software name/version.

  Example: the identification string `SSH-2.0-OpenSSH_6.6.1p1 Ubuntu-2ubuntu2` would be parsed as:

```js
        { identRaw: 'SSH-2.0-OpenSSH_6.6.1p1 Ubuntu-2ubuntu2',
          version: {
            protocol: '2.0',
            software: 'OpenSSH_6.6.1p1'
          },
          comments: 'Ubuntu-2ubuntu2' }
```

#### Server methods

- **(constructor)**(< _object_ >config[, < _function_ >connectionListener]) - Creates and returns a new Server instance. Server instances also have the same methods/properties/events as [`net.Server`](http://nodejs.org/docs/latest/api/net.html#net_class_net_server). `connectionListener` if supplied, is added as a `connection` listener. Valid `config` properties:

  - **hostKeys** - _array_ - An array of either Buffers/strings that contain host private keys or objects in the format of `{ key: <Buffer/string>, passphrase: <string> }` for encrypted private keys. (**Required**) **Default:** (none)

  - **algorithms** - _object_ - This option allows you to explicitly override the default transport layer algorithms used for incoming client connections. Each value must be an array of valid algorithms for that category. The order of the algorithms in the arrays are important, with the most favorable being first. For a list of valid and default algorithm names, please review the documentation for the version of `ssh2-streams` used by this module. Valid keys:

    - **kex** - _array_ - Key exchange algorithms.

    - **cipher** - _array_ - Ciphers.

    - **serverHostKey** - _array_ - Server host key formats.

    - **hmac** - _array_ - (H)MAC algorithms.

    - **compress** - _array_ - Compression algorithms.

  - **greeting** - _string_ - A message that is sent to clients immediately upon connection, before handshaking begins. **Note:** Most clients usually ignore this. **Default:** (none)

  - **banner** - _string_ - A message that is sent to clients once, right before authentication begins. **Default:** (none)

  - **ident** - _string_ - A custom server software name/version identifier. **Default:** `'ssh2js' + moduleVersion + 'srv'`

  - **highWaterMark** - _integer_ - This is the `highWaterMark` to use for the parser stream. **Default:** `32 * 1024`

  - **debug** - _function_ - Set this to a function that receives a single string argument to get detailed (local) debug information. **Default:** (none)

#### Connection events

- **authentication**(< _AuthContext_ >ctx) - The client has requested authentication. `ctx.username` contains the client username, `ctx.method` contains the requested authentication method, and `ctx.accept()` and `ctx.reject([< Array >authMethodsLeft[, < Boolean >isPartialSuccess]])` are used to accept or reject the authentication request respectively. `abort` is emitted if the client aborts the authentication request. Other properties/methods available on `ctx` depends on the `ctx.method` of authentication the client has requested:

  - `password`:

    - **password** - _string_ - This is the password sent by the client.

  - `publickey`:

    - **key** - _object_ - Contains information about the public key sent by the client:

      - **algo** - _string_ - The name of the key algorithm (e.g. `ssh-rsa`).

      - **data** - _Buffer_ - The actual key data.

    - **sigAlgo** - _mixed_ - If the value is `undefined`, the client is only checking the validity of the `key`. If the value is a _string_, then this contains the signature algorithm that is passed to [`crypto.createVerify()`](http://nodejs.org/docs/latest/api/crypto.html#crypto_crypto_createverify_algorithm).

    - **blob** - _mixed_ - If the value is `undefined`, the client is only checking the validity of the `key`. If the value is a _Buffer_, then this contains the data that is passed to [`verifier.update()`](http://nodejs.org/docs/latest/api/crypto.html#crypto_verifier_update_data).

    - **signature** - _mixed_ - If the value is `undefined`, the client is only checking the validity of the `key`. If the value is a _Buffer_, then this contains a signature that is passed to [`verifier.verify()`](http://nodejs.org/docs/latest/api/crypto.html#crypto_verifier_verify_object_signature_signature_format).

  - `keyboard-interactive`:

    - **submethods** - _array_ - A list of preferred authentication "sub-methods" sent by the client. This may be used to determine what (if any) prompts to send to the client.

    - **prompt**(< _array_ >prompts[, < _string_ >title[, < _string_ >instructions]], < _function_ >callback) - _boolean_ - Send prompts to the client. `prompts` is an array of `{ prompt: 'Prompt text', echo: true }` objects (`prompt` being the prompt text and `echo` indicating whether the client's response to the prompt should be echoed to their display). `callback` is called with `(err, responses)`, where `responses` is an array of string responses matching up to the `prompts`.

- **ready**() - Emitted when the client has been successfully authenticated.

- **session**(< _function_ >accept, < _function_ >reject) - Emitted when the client has requested a new session. Sessions are used to start interactive shells, execute commands, request X11 forwarding, etc. `accept()` returns a new _Session_ instance. `reject()` Returns `false` if you should wait for the `continue` event before sending any more traffic.

- **tcpip**(< _function_ >accept, < _function_ >reject, < _object_ >info) - Emitted when the client has requested an outbound (TCP) connection. `accept()` returns a new _Channel_ instance representing the connection. `reject()` Returns `false` if you should wait for the `continue` event before sending any more traffic. `info` contains:

  - **srcIP** - _string_ - Source IP address of outgoing connection.

  - **srcPort** - _string_ - Source port of outgoing connection.

  - **destIP** - _string_ - Destination IP address of outgoing connection.

  - **destPort** - _string_ - Destination port of outgoing connection.

- **openssh.streamlocal**(< _function_ >accept, < _function_ >reject, < _object_ >info) - Emitted when the client has requested a connection to a UNIX domain socket. `accept()` returns a new _Channel_ instance representing the connection. `reject()` Returns `false` if you should wait for the `continue` event before sending any more traffic. `info` contains:

  - **socketPath** - _string_ - Destination socket path of outgoing connection.

- **request**(< _mixed_ >accept, < _mixed_ >reject, < _string_ >name, < _object_ >info) - Emitted when the client has sent a global request for `name` (e.g. `tcpip-forward` or `cancel-tcpip-forward`). `accept` and `reject` are functions if the client requested a response. If `bindPort === 0`, you should pass the chosen port to `accept()` so that the client will know what port was bound. `info` contains additional details about the request:

  - `tcpip-forward` and `cancel-tcpip-forward`:

    - **bindAddr** - _string_ - The IP address to start/stop binding to.

    - **bindPort** - _integer_ - The port to start/stop binding to.

  - `streamlocal-forward@openssh.com` and `cancel-streamlocal-forward@openssh.com`:

    - **socketPath** - _string_ - The socket path to start/stop binding to.

- **rekey**() - Emitted when the client has finished rekeying (either client or server initiated).

- **continue**() - Emitted when more requests/data can be sent to the client (after a `Connection` method returned `false`).

- **error**(< _Error_ >err) - An error occurred.

- **end**() - The client socket disconnected.

- **close**() - The client socket was closed.

#### Connection methods

- **end**() - _boolean_ - Closes the client connection. Returns `false` if you should wait for the `continue` event before sending any more traffic.

- **x11**(< _string_ >originAddr, < _integer_ >originPort, < _function_ >callback) - _boolean_ - Alert the client of an incoming X11 client connection from `originAddr` on port `originPort`. `callback` has 2 parameters: < _Error_ >err, < _Channel_ >stream. Returns `false` if you should wait for the `continue` event before sending any more traffic.

- **forwardOut**(< _string_ >boundAddr, < _integer_ >boundPort, < _string_ >remoteAddr, < _integer_ >remotePort, < _function_ >callback) - _boolean_ - Alert the client of an incoming TCP connection on `boundAddr` on port `boundPort` from `remoteAddr` on port `remotePort`. `callback` has 2 parameters: < _Error_ >err, < _Channel_ >stream. Returns `false` if you should wait for the `continue` event before sending any more traffic.

- **openssh_forwardOutStreamLocal**(< _string_ >socketPath, < _function_ >callback) - _boolean_ - Alert the client of an incoming UNIX domain socket connection on `socketPath`. `callback` has 2 parameters: < _Error_ >err, < _Channel_ >stream. Returns `false` if you should wait for the `continue` event before sending any more traffic.

- **rekey**([< _function_ >callback]) - _boolean_ - Initiates a rekeying with the client. If `callback` is supplied, it is added as a one-time handler for the `rekey` event. Returns `false` if you should wait for the `continue` event before sending any more traffic.

#### Session events

- **pty**(< _mixed_ >accept, < _mixed_ >reject, < _object_ >info) - The client requested allocation of a pseudo-TTY for this session. `accept` and `reject` are functions if the client requested a response and return `false` if you should wait for the `continue` event before sending any more traffic. `info` has these properties:

  - **cols** - _integer_ - The number of columns for the pseudo-TTY.

  - **rows** - _integer_ - The number of rows for the pseudo-TTY.

  - **width** - _integer_ - The width of the pseudo-TTY in pixels.

  - **height** - _integer_ - The height of the pseudo-TTY in pixels.

  - **modes** - _object_ - Contains the requested terminal modes of the pseudo-TTY keyed on the mode name with the value being the mode argument. (See the table at the end for valid names).

- **window-change**(< _mixed_ >accept, < _mixed_ >reject, < _object_ >info) - The client reported a change in window dimensions during this session. `accept` and `reject` are functions if the client requested a response and return `false` if you should wait for the `continue` event before sending any more traffic. `info` has these properties:

  - **cols** - _integer_ - The new number of columns for the client window.

  - **rows** - _integer_ - The new number of rows for the client window.

  - **width** - _integer_ - The new width of the client window in pixels.

  - **height** - _integer_ - The new height of the client window in pixels.

- **x11**(< _mixed_ >accept, < _mixed_ >reject, < _object_ >info) - The client requested X11 forwarding. `accept` and `reject` are functions if the client requested a response and return `false` if you should wait for the `continue` event before sending any more traffic. `info` has these properties:

  - **single** - _boolean_ - `true` if only a single connection should be forwarded.

  - **protocol** - _string_ - The name of the X11 authentication method used (e.g. `MIT-MAGIC-COOKIE-1`).

  - **cookie** - _string_ - The X11 authentication cookie encoded in hexadecimal.

  - **screen** - _integer_ - The screen number to forward X11 connections for.

- **env**(< _mixed_ >accept, < _mixed_ >reject, < _object_ >info) - The client requested an environment variable to be set for this session. `accept` and `reject` are functions if the client requested a response and return `false` if you should wait for the `continue` event before sending any more traffic. `info` has these properties:

  - **key** - _string_ - The environment variable's name.

  - **value** - _string_ - The environment variable's value.

- **signal**(< _mixed_ >accept, < _mixed_ >reject, < _object_ >info) - The client has sent a signal. `accept` and `reject` are functions if the client requested a response and return `false` if you should wait for the `continue` event before sending any more traffic. `info` has these properties:

  - **name** - _string_ - The signal name (e.g. `SIGUSR1`).

- **auth-agent**(< _mixed_ >accept, < _mixed_ >reject) - The client has requested incoming ssh-agent requests be forwarded to them. `accept` and `reject` are functions if the client requested a response and return `false` if you should wait for the `continue` event before sending any more traffic.

- **shell**(< _mixed_ >accept, < _mixed_ >reject) - The client has requested an interactive shell. `accept` and `reject` are functions if the client requested a response. `accept()` returns a _Channel_ for the interactive shell. `reject()` Returns `false` if you should wait for the `continue` event before sending any more traffic.

- **exec**(< _mixed_ >accept, < _mixed_ >reject, < _object_ >info) - The client has requested execution of a command string. `accept` and `reject` are functions if the client requested a response. `accept()` returns a _Channel_ for the command execution. `reject()` Returns `false` if you should wait for the `continue` event before sending any more traffic. `info` has these properties:

  - **command** - _string_ - The command line to be executed.

- **sftp**(< _mixed_ >accept, < _mixed_ >reject) - The client has requested the SFTP subsystem. `accept` and `reject` are functions if the client requested a response. `accept()` returns an _SFTPStream_ in server mode (see the [`SFTPStream` documentation](https://github.com/mscdex/ssh2-streams/blob/master/SFTPStream.md) for details). `reject()` Returns `false` if you should wait for the `continue` event before sending any more traffic. `info` has these properties:

- **subsystem**(< _mixed_ >accept, < _mixed_ >reject, < _object_ >info) - The client has requested an arbitrary subsystem. `accept` and `reject` are functions if the client requested a response. `accept()` returns a _Channel_ for the subsystem. `reject()` Returns `false` if you should wait for the `continue` event before sending any more traffic. `info` has these properties:

  - **name** - _string_ - The name of the subsystem.

- **close**() - The session was closed.

### Channel

This is a normal **streams2** Duplex Stream (used both by clients and servers), with the following changes:

- A boolean property `allowHalfOpen` exists and behaves similarly to the property of the same name for `net.Socket`. When the stream's end() is called, if `allowHalfOpen` is `true`, only EOF will be sent (the server can still send data if they have not already sent EOF). The default value for this property is `true`.

- A `close` event is emitted once the channel is completely closed on both the client and server.

- Client-specific:

  - For exec():

    - An `exit` event _may_ (the SSH2 spec says it is optional) be emitted when the process finishes. If the process finished normally, the process's return value is passed to the `exit` callback. If the process was interrupted by a signal, the following are passed to the `exit` callback: null, < _string_ >signalName, < _boolean_ >didCoreDump, < _string_ >description.

    - If there was an `exit` event, the `close` event will be passed the same arguments for convenience.

    - A `stderr` property contains a Readable stream that represents output from stderr.

  - For shell() and exec():

    - The readable side represents stdout and the writable side represents stdin.

    - **signal**(< _string_ >signalName) - _boolean_ - Sends a POSIX signal to the current process on the server. Valid signal names are: 'ABRT', 'ALRM', 'FPE', 'HUP', 'ILL', 'INT', 'KILL', 'PIPE', 'QUIT', 'SEGV', 'TERM', 'USR1', and 'USR2'. Some server implementations may ignore this request if they do not support signals. Note: If you are trying to send SIGINT and you find `signal()` doesn't work, try writing `'\x03'` to the Channel stream instead. Returns `false` if you should wait for the `continue` event before sending any more traffic.

    - **setWindow**(< _integer_ >rows, < _integer_ >cols, < _integer_ >height, < _integer_ >width) - _boolean_ - Lets the server know that the local terminal window has been resized. The meaning of these arguments are described in the 'Pseudo-TTY settings' section. Returns `false` if you should wait for the `continue` event before sending any more traffic.

- Server-specific:

  - For exec-enabled channel instances there is an additional method available that may be called right before you close the channel. It has two different signatures:

    - **exit**(< _integer_ >exitCode) - _boolean_ - Sends an exit status code to the client. Returns `false` if you should wait for the `continue` event before sending any more traffic.

    - **exit**(< _string_ >signalName[, < _boolean_ >coreDumped[, < _string_ >errorMsg]]) - _boolean_ - Sends an exit status code to the client. Returns `false` if you should wait for the `continue` event before sending any more traffic.

  - For exec and shell-enabled channel instances, `channel.stderr` is a writable stream.

### Pseudo-TTY settings

- **rows** - < _integer_ > - Number of rows. **Default:** `24`

- **cols** - < _integer_ > - Number of columns. **Default:** `80`

- **height** - < _integer_ > - Height in pixels. **Default:** `480`

- **width** - < _integer_ > - Width in pixels. **Default:** `640`

- **term** - < _string_ > - The value to use for \$TERM. **Default:** `'vt100'`

- **modes** - < _object_ > - An object containing [Terminal Modes](#terminal-modes) as keys, with each value set to each mode argument. **Default:** `null`

`rows` and `cols` override `width` and `height` when `rows` and `cols` are non-zero.

Pixel dimensions refer to the drawable area of the window.

Zero dimension parameters are ignored.

### Terminal modes

| Name          | Description                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| VINTR         | Interrupt character; 255 if none. Similarly for the other characters. Not all of these characters are supported on all systems. |
| VQUIT         | The quit character (sends SIGQUIT signal on POSIX systems).                                                                     |
| VERASE        | Erase the character to left of the cursor.                                                                                      |
| VKILL         | Kill the current input line.                                                                                                    |
| VEOF          | End-of-file character (sends EOF from the terminal).                                                                            |
| VEOL          | End-of-line character in addition to carriage return and/or linefeed.                                                           |
| VEOL2         | Additional end-of-line character.                                                                                               |
| VSTART        | Continues paused output (normally control-Q).                                                                                   |
| VSTOP         | Pauses output (normally control-S).                                                                                             |
| VSUSP         | Suspends the current program.                                                                                                   |
| VDSUSP        | Another suspend character.                                                                                                      |
| VREPRINT      | Reprints the current input line.                                                                                                |
| VWERASE       | Erases a word left of cursor.                                                                                                   |
| VLNEXT        | Enter the next character typed literally, even if it is a special character                                                     |
| VFLUSH        | Character to flush output.                                                                                                      |
| VSWTCH        | Switch to a different shell layer.                                                                                              |
| VSTATUS       | Prints system status line (load, command, pid, etc).                                                                            |
| VDISCARD      | Toggles the flushing of terminal output.                                                                                        |
| IGNPAR        | The ignore parity flag. The parameter SHOULD be 0 if this flag is FALSE, and 1 if it is TRUE.                                   |
| PARMRK        | Mark parity and framing errors.                                                                                                 |
| INPCK         | Enable checking of parity errors.                                                                                               |
| ISTRIP        | Strip 8th bit off characters.                                                                                                   |
| INLCR         | Map NL into CR on input.                                                                                                        |
| IGNCR         | Ignore CR on input.                                                                                                             |
| ICRNL         | Map CR to NL on input.                                                                                                          |
| IUCLC         | Translate uppercase characters to lowercase.                                                                                    |
| IXON          | Enable output flow control.                                                                                                     |
| IXANY         | Any char will restart after stop.                                                                                               |
| IXOFF         | Enable input flow control.                                                                                                      |
| IMAXBEL       | Ring bell on input queue full.                                                                                                  |
| ISIG          | Enable signals INTR, QUIT, [D]SUSP.                                                                                             |
| ICANON        | Canonicalize input lines.                                                                                                       |
| XCASE         | Enable input and output of uppercase characters by preceding their lowercase equivalents with "\".                              |
| ECHO          | Enable echoing.                                                                                                                 |
| ECHOE         | Visually erase chars.                                                                                                           |
| ECHOK         | Kill character discards current line.                                                                                           |
| ECHONL        | Echo NL even if ECHO is off.                                                                                                    |
| NOFLSH        | Don't flush after interrupt.                                                                                                    |
| TOSTOP        | Stop background jobs from output.                                                                                               |
| IEXTEN        | Enable extensions.                                                                                                              |
| ECHOCTL       | Echo control characters as ^(Char).                                                                                             |
| ECHOKE        | Visual erase for line kill.                                                                                                     |
| PENDIN        | Retype pending input.                                                                                                           |
| OPOST         | Enable output processing.                                                                                                       |
| OLCUC         | Convert lowercase to uppercase.                                                                                                 |
| ONLCR         | Map NL to CR-NL.                                                                                                                |
| OCRNL         | Translate carriage return to newline (output).                                                                                  |
| ONOCR         | Translate newline to carriage return-newline (output).                                                                          |
| ONLRET        | Newline performs a carriage return (output).                                                                                    |
| CS7           | 7 bit mode.                                                                                                                     |
| CS8           | 8 bit mode.                                                                                                                     |
| PARENB        | Parity enable.                                                                                                                  |
| PARODD        | Odd parity, else even.                                                                                                          |
| TTY_OP_ISPEED | Specifies the input baud rate in bits per second.                                                                               |
| TTY_OP_OSPEED | Specifies the output baud rate in bits per second.                                                                              |

### HTTPAgent

#### HTTPAgent methods

- **(constructor)**(< _object_ >sshConfig[, < _object_ >agentConfig]) - Creates and returns a new `http.Agent` instance used to tunnel an HTTP connection over SSH. `sshConfig` is what is passed to `client.connect()` and `agentOptions` is passed to the `http.Agent` constructor.
