package main

import (
	"os"

	"github.com/gsmlg-dev/Foundation/golang/dingding-oapi/pkg/ding"
)

func main() {
	access_token := os.Getenv("access_token")
	secret := os.Getenv("secret")

	ding := ding.New(access_token, secret)

	ding.SetMessage()

	ding.Send()

}
