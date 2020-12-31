## 如何停止 erlang VM

当你需要停止一个 Erlang VM 的时候，如果你不知道怎么做？
这里有 10 种方式介绍如何停止

### 比较好的方式

1. q/0, c:q/0, init:stop/0

最简单和直接的方式是使用`q/0`或者`c:q/0`（实际相同），就像文档种的一样

```
This function is shorthand for init:stop(), that is, it causes the node to stop in a controlled fashion.
```

`init:stop/0` :

```
The same as stop(0).
```

所以，最直接的方式就是运行`init:stop(0)`。要明白这个指令如何运行，我们可以检查文档：

```
All applications are taken down smoothly, all code is unloaded,
and all ports are closed before the system terminates by calling halt(Status).
If command-line flag -heart was specified, the heartprogram is terminated before the Erlang node terminates.
For more information, see heart(3).

To limit the shutdown time, the time init is allowed to spend taking down applications,
command-line flag -shutdown_time is to be used.
```

所以这种方式是最直接的终止方式。

2. erlang:halt/0

向上边的文档中提到的一样，`erlang:halt()`和`erlang:halt(0,[])`。
更多的内容可以看下边的`erlang:halt/1,2`，但是现在，`erlang:halt()` 只停止关闭
VM，不处理应用的终止和任何的端口关闭

3. JCL mode

先前的方式需要你能够链接到 erlang shell 才可以执行。如果你做不到，或者是 shell 被阻止了该如何操作？
如果你进入了 shell，但是无法输入，你可以指键入`Ctrl-g`([JCL mode](http://erlang.org/doc/man/shell.html#jcl-mode))

这样操作的效果和`erlang:halt(0)`相同

4. BREAK mode

除了`Ctrl-g`，还可以使用`Ctrl-c`。
这样会进入`*BREAK mode*`,样式如下：

```
BREAK: (a)bort (c)ontinue (p)roc info (i)nfo (l)oaded
       (v)ersion (k)ill (D)b-tables (d)istribution
```

可以用两种方式关闭 erlang 节点：

- Press **Ctrl-c** again
- Press **a** and then return

效果都和`erlang:halt(0)`一样

### 不好的方式

如果想要用一些不太好的方式来退出，并生成某些错误报告。
那么，这些是可以做的选择……

5. erlang:halt/1,2

正如你看到的[这些文档](https://erldocs.com/current/erts/erlang.html?i=0&search=erlang:ha#halt/1)，
`erlang:halt/1,2`可以提交一些选项并输出处理错误。可以看一下文档中的这些选项：

- 如果你想要一个干净的关闭并且有一个合适的退出状态，使用整数比较好
- 如果需要生成`erl_crash.dump`，使用一个`string`
- 如果需要生成`core dump`，可以使用`atom` `abort`

当然，无论选择什么，都不会终止任何 application 和官彬任何 ports，etc.

6. Just kill it

Erlang VM 只是一个操作系统进程，在类 Unix 系统可以使用关闭进程的信号来关闭进程。
不同的信号会给 Erlang VM 不同的处理。通常的信号：`kill -SIGTERM`的行为会和`init:stop()`一样。
而`kill -SIGKILL`会和`erlang:halt(137)`一样

还有一些其他的信号，生成`erl_crash.dump`: `kill -SIGUSR1`。

### 最恶的方式

关闭虚拟机的乐趣何在？让他们燃烧吧……

7. Don't event let it start

```
$ erl -s something_that_doesnt_exist
Erlang/OTP 20 [erts-9.0] [source] [64-bit] [smp:8:8] [ds:8:8:10] [async-threads:10] [kernel-poll:false]
…
init terminating in do_boot ({undef,[{something_that_doesnt_exist,start,[],[]},{init,start_em,1,[]},{init,do_boot,3,[]}]})
Crash dump is being written to: erl_crash.dump...done
```

8. Kill the Kernel

```
$ erl
Erlang/OTP 20 [erts-9.0] [source] [64-bit] [smp:8:8] [ds:8:8:10] [async-threads:10] [kernel-poll:false]
…
1> exit(whereis(application_controller), kill).
true
*** ERROR: Shell process terminated! ***
*** ERROR: Shell process terminated! ***
*** ERROR: Shell process terminated! ***
*** ERROR: Shell process terminated! ***
*** ERROR: Shell process terminated! ***
*** ERROR: Shell process terminated! ***
*** ERROR: Shell process terminated! ***
*** ERROR: Shell process terminated! ***
*** ERROR: Shell process terminated! ***
*** ERROR: Shell process terminated! ***
{"Kernel pid terminated",application_controller,killed}
Kernel pid terminated (application_controller) (killed)
Crash dump is being written to: erl_crash.dump...done
```

9. Exhaust the Atom Table

```
$ erl
Erlang/OTP 20 [erts-9.0] [source] [64-bit] [smp:8:8] [ds:8:8:10] [async-threads:10] [kernel-poll:false]
…
1> [list_to_atom(integer_to_list(I)) || I <- lists:seq(erlang:system_info(atom_count), erlang:system_info(atom_limit))].
no more index entries in atom_tab (max=1048576)
Crash dump is being written to: erl_crash.dump...done
```

10. Turn off your Computer

![laugh](stop-an-erlang-vm/evil-laugh.jpg)
