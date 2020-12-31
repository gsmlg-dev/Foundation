## es6 中新增加了 `const` 和 `let`

`const` 和 `let` 都是新增加的变量声名方式

### 有别于`var`声名,他们没有变量提升(Hoisting)机制

```javascript
if (!('someone' in window)) {
  var someone = 'Joe';
} else {
  someone = 'reload';
}

console.log(someone);
```

总是会打印出 'reload'

在预编译阶段会变成

```javascript
var someone;

if (!('someone' in window)) {
  someone = 'Joe';
} else {
  someone = 'reload';
}

console.log(someone);
```

### 禁止重声名

`let` 会禁止重新声名变量

### const

`const` 声名时必须赋值

### 临时性死区

使用`cosnt`或者`let`声名变量，如果在之前调用他们，会抛出一个异常`ReferenceError`

这时使用 `typeof` 操作时也是不安全的，这里成为临时性死区 (Temporal Dead Zone)
