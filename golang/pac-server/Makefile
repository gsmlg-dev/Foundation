default: build

download:
	curl -sSLO https://raw.githubusercontent.com/petronny/gfwlist2pac/master/gfwlist.pac

build:
	@CGO_ENABLE=0 go build -o pac-server ./...

