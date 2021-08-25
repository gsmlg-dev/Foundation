default:
	@echo "========================================"
	@echo " release: create otp package            "
	@echo " page: update to github pages           "
	@echo "========================================"

publish: docker dockerhub

release: build copy

build:
	MIX_ENV=prod mix deps.get
	MIX_ENV=prod mix compile
	MIX_ENV=prod mix distillery.release --env prod

copy:
	@export VER=$$(grep version mix.exs |awk -F'["]' '{print $$2}') ; \
		export APP=$$(grep 'app:' mix.exs |awk -F'[:,]' '{print $$3}') ; \
		\cp _build/prod/rel/$${APP}/releases/$${VER}/$${APP}.tar.gz . ; \
		\mv $${APP}.tar.gz $${APP}-v$${VER}.tar.gz

docker:
	@docker build -t gsmlg/gsmlg.org:latest .

dockerhub:
	docker publish -t gsmlg/gsmlg.org:latest

