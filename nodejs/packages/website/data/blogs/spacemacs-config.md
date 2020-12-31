# Spacemacs 使用配置

## 安装

```shell
% git clone https://github.com/syl20bnr/spacemacs ~/.emacs.d/spacemacs
```

修改配置 `init.el`

```elisp
(setenv "SPACEMACSDIR" "~/.emacs.d/lisp/")

;; (package-initialize)

(setq spacemacs-start-directory "~/.emacs.d/spacemacs/")
(load-file (concat spacemacs-start-directory "init.el"))

```

## 配置

启动 Emacs 后，会在`~/.emacs.d/lisp/init.el`生成`spacemacs`配置

重度 Emacs 用户选择编辑模式为`emacs`

### 配置概念：`layer`

每一种编辑配置都会进行配置，名称叫做`layer`

每一个`layer`用来处理一种语言配置或配置罗辑

### 配置`layer`

常用 layer 添加：

- org
- git
- chinese
- markdown
- javascript
- elixir

[![Built with Spacemacs](https://cdn.rawgit.com/syl20bnr/spacemacs/442d025779da2f62fc86c2082703697714db6514/assets/spacemacs-badge.svg)](http://spacemacs.org)
