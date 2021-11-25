file = cmd/hashdir.go

default:
	GOOS=linux GOARCH=amd64 go build -o build/hash_linux_amd64 ${file}
	GOOS=windows GOARCH=amd64 go build -o build/hash_amd64.exe ${file}
	GOOS=darwin GOARCH=amd64 go build -o build/hash_mac_amd64 ${file}
	GOOS=linux GOARCH=arm64 go build -o build/hash_linux_arm64 ${file}
	GOOS=windows GOARCH=arm64 go build -o build/hash_arm64.exe ${file}
	GOOS=darwin GOARCH=arm64 go build -o build/hash_mac_arm64 ${file}

clean:
	@rm -rf build/hash*
