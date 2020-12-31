## 为什么使用 make

在项目中部署使用了 makefile 配置,来方便快速的执行一些工作流

相比于其它 task runner，make 的优势是不需要安装，所有系统当前都已经预置

方便，是最大的原因

目前使用的 makefile 如下：

```makefile
GREEN=\033[0;32m
NC=\033[0m
INSTALL_DIR=/usr/local/public
PUBLIC=./public
HOST=10.1.101.60
TARFILE=assets.tar.bz2
HASHFILE=assets.hash.txt

.ONESHELL:

default:
	@cat ReadMe

zddi:
	@rm -rf public/assets/*
	@./yarn run build

watch:
	@./yarn watch

build-system:
	@./yarn --offline

rebuild-system:
	@./yarn cache clean
	@rm -rf node_modules
	@rm -f yarn.lock
	@./yarn

tar:
	@cd ${PUBLIC} ;\
	tar jcf ${TARFILE} assets

rmtar:
	@cd ${PUBLIC} ;\
	rm ${TARFILE}

commit: tar
	@-cd ${PUBLIC} ;\
	SHASUM=$(shell shasum ${PUBLIC}/${TARFILE} | awk '{print $$1}') ;\
	echo $${SHASUM} > ${HASHFILE} ;\
	git add ${HASHFILE} ;\
	git commit -nm "create checksum commit HASH: [$${SHASUM}]" ;

upload: commit
	@cd ${PUBLIC} ;\
	SHASUM=$(shell shasum ${PUBLIC}/${TARFILE} | awk '{print $$1}') ;\
	COMMIT=$(shell git log -1 --pretty=format:%H) ;\
	BRANCH=$(shell git rev-parse --abbrev-ref HEAD) ;\
	curl -X POST http://${HOST}/api/web_build/upload \
 -F hash=$${SHASUM} \
 -F user=$(shell git config --get user.name) \
 -F commit=$${COMMIT} \
 -F branch=$${BRANCH} \
 -F assets=@./${TARFILE}

push: zddi upload rmtar

download:
	@cd ${PUBLIC} ;\
	curl http://${HOST}/api/web_build/$(shell cat ${PUBLIC}/${HASHFILE}) > ${TARFILE}

install: download
	@rm -rf ${PUBLIC}/assets
	@cd ${PUBLIC} ;\
	tar jxf ${TARFILE}
	@rm -rf ${INSTALL_DIR}
	@cp -r ${PUBLIC} /usr/local/
	@rm -rf ${PUBLIC}/assets
	@rm ${PUBLIC}/${TARFILE}
	@rm /usr/local/${PUBLIC}/${TARFILE}
	@echo -e "Install public folder to ${GREEN}${INSTALL_DIR}${NC}"

pull: download
	@rm -rf ${PUBLIC}/assets
	@cd ${PUBLIC} ;\
	tar jxf ${TARFILE}
	@rm ${PUBLIC}/${TARFILE}
	@echo -e "${GREEN}Code pull from remote done!${NC}"


```

### 定义变量

makefile 中的变量定义和 shell 中一样，都可以直接使用

```
abc = 123
bcd += ddd
cc := f2
```

#### shel 中的变量

由于 makefile 中的变量和 shell 格式一样，所以当要使用 shell 变量时，
会需要使用转义序列来处理，方式是两个`$`符号

### shell

makefile 中的 shell 使用需要注意，每一行都会启动一个 shell，单独运行
当调用 shell 进行插值的时候，shell 的执行顺序也不是顺序执行的

由于都是使用单独的 shell，所以当想要使用相同的上下文时，
可以使用`.ONESHELL`指令设置，或者是转义换行符

### 连续的 task

由于 makefile 中 shell 无法连续执行，所以，将 task 拆分成多个，然后通过 task 依赖关系顺序执行

task 依赖，在 task 后输入其它的 task 名称，就会按照顺序，连续执行这些 task

当出现错误，task 队列会中断，这时需要在 shell 开始的行添加一个`-`来继续执行 task
