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

const (
	Url = "https://oapi.dingtalk.com/robot/send?%s"
)

func Send(access_token string, secret string) {
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

	baseurl := fmt.Sprintf(Url, params.Encode())

	r := bytes.NewReader([]byte("{\"msgtype\": \"text\",\"text\": {\"content\": \"Hi threre, Jonathan Grant is here\"}}"))
	resp, err := http.Post(baseurl, "application/json", r)
	if err != nil {
		os.Exit(1)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	fmt.Printf("Response: %s", body)
}

func makeTimestamp() int64 {
	return time.Now().UnixNano() / 1e6
}
