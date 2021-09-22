default:
	docker build -t gsmlg/devdocs -t gsmlg/devdocs:downloader . -f ./Dockerfile.downloader
	docker push gsmlg/devdocs:downloader
	docker build -t gsmlg/devdocs -t gsmlg/devdocs:builder . -f ./Dockerfile.builder
	docker push gsmlg/devdocs:builder
	docker build -t gsmlg/devdocs -t gsmlg/devdocs:runner . -f ./Dockerfile.runner
	docker push gsmlg/devdocs:runner
