- 压缩对比，查看 css 优化功能，并进行对比

## 对比 css 代码

```css
.btnShrink {
  background: url(~iframe/icons_rigth.png) 0 0 no-repeat;
  width: 8px;
  height: 80px;
  position: absolute;
  left: 0;
  top: 50%;
  margin: -40px 0 0 0;
  overflow: hidden;
  display: block;
  cursor: pointer;
}

.btnShrink.shrinkExt {
  left: -16px;
  margin-top: -25px;
  background: url(~iframe/icons_rigth.png) -7px 0 no-repeat;
  width: 23px;
}
```

- css-clean 与 cssnano 优化结果基本一致
  只在压缩级别上控制会优化 background 的 position 属性

```css
.btnShrink {
  background: url(~iframe/icons_rigth.png) 0 0 no-repeat;
  width: 8px;
  height: 80px;
  position: absolute;
  left: 0;
  top: 50%;
  margin: -40px 0 0 0;
  overflow: hidden;
  display: block;
  cursor: pointer;
}

.btnShrink.shrinkExt {
  left: -16px;
  margin-top: -25px;
  background: url(~iframe/icons_rigth.png) -7px 0 no-repeat;
  width: 23px;
}
```

## 对比 css 代码

如下：

```css
.btnShrink {
  background-image: url(~iframe/icons_rigth.png);
  background-position: 0 0;
  background-repeat: no-repeat;
  width: 8px;
  height: 80px;
  position: absolute;
  left: 0;
  top: 50%;
  margin: -40px 0 0 0;
  overflow: hidden;
  display: block;
  cursor: pointer;
}

.btnShrink.shrinkExt {
  left: -16px;
  margin-top: -25px;
  background-image: url(~iframe/icons_rigth.png);
  background-position: -7px 0;
  background-repeat: no-repeat;
  width: 23px;
}
```

使用 clean-css 压缩优化后结果：

```css
.btnShrink {
  background-image: url(~iframe/icons_rigth.png);
  background-position: 0 0;
  background-repeat: no-repeat;
  width: 8px;
  height: 80px;
  position: absolute;
  left: 0;
  top: 50%;
  margin: -40px 0 0;
  overflow: hidden;
  display: block;
  cursor: pointer;
}
.btnShrink.shrinkExt {
  left: -16px;
  margin-top: -25px;
  background-image: url(~iframe/icons_rigth.png);
  background-position: -7px 0;
  background-repeat: no-repeat;
  width: 23px;
}
```

使用 cssnano 压缩后对比结果：

```css
.btnShrink {
  background-position: 0 0;
  width: 8px;
  height: 80px;
  position: absolute;
  left: 0;
  top: 50%;
  margin: -40px 0 0;
  overflow: hidden;
  display: block;
  cursor: pointer;
}
.btnShrink,
.btnShrink.shrinkExt {
  background-image: url(~iframe/icons_rigth.png);
  background-repeat: no-repeat;
}
.btnShrink.shrinkExt {
  left: -16px;
  margin-top: -25px;
  background-position: -7px 0;
  width: 23px;
}
```

结论：
明显属性分离后可以更好的优化重复属性，尤其是在使用了 inline-image 后优化效果更加明显
