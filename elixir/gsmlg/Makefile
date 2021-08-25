default:
	@echo "========================================"
	@echo " release: create otp package            "
	@echo " page: update to github pages           "
	@echo "========================================"

publish: docker dockerhub

release: build copy

page: web subtree

web:
	@cd assets; \
		rm -rf node_modules; \
		./yarn ; \
		./yarn run build

build:
	@docker run --rm -v $$(pwd):/app -v $$(pwd)/build.sh:/build.sh --entrypoint /build.sh gsmlg/phoenix:alpine

copy:
	@export VER=$$(grep version mix.exs |awk -F'["]' '{print $$2}') ; \
		export APP=$$(grep 'app:' mix.exs |awk -F'[:,]' '{print $$3}') ; \
		\cp _build/prod/rel/$${APP}/releases/$${VER}/$${APP}.tar.gz . ; \
		\cp $${APP}.tar.gz $${APP}-v$${VER}.tar.gz

subtree:
	git branch -D __tmp ; \
	git checkout -b __tmp ; \
	git add -f priv/static ; \
	git commit -m 'publish ghpage' ; \
	git push origin `git subtree split --prefix priv/static `:master --force ; \
	git checkout -f elixir ; \
	git branch -D __tmp

docker:
	@docker build -t gsmlg/gsmlg.org:latest .

dockerhub:
	docker publish -t gsmlg/gsmlg.org:latest

