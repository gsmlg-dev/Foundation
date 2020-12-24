package ding

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"time"
)

func main() {
	access_token := os.Getenv("access_token")
	secret := os.Getenv("secret")

	t := makeTimestamp()

	signString := fmt.Sprintf("%d\n%s", t, secret)

	h := hmac.New(sha256.New, []byte(secret))
	h.Write([]byte(signString))
	hmac := h.Sum(nil)

	encoded := base64.StdEncoding.EncodeToString(hmac[:])

	params := url.Values{}
	params.Add("access_token", access_token)
	params.Add("timestamp", fmt.Sprintf("%d", t))
	params.Add("sign", encoded)

	baseurl := fmt.Sprintf("https://oapi.dingtalk.com/robot/send?%s", params.Encode())

	msg := os.Args[1:]

	r := bytes.NewReader([]byte(fmt.Sprintf("{\"msgtype\": \"text\",\"text\": {\"content\": \"%s\"}}", msg)))
	resp, err := http.Post(baseurl, "application/json", r)
	if err != nil {
		fmt.Printf("Error: %v", err)
		os.Exit(1)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	fmt.Printf("Response: %s", body)
}

func makeTimestamp() int64 {
	return time.Now().UnixNano() / 1e6
}
