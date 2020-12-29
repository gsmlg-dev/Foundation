package ding

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"time"
)

const (
	URL = "https://oapi.dingtalk.com/robot/send?%s"
)

type Ding struct {
	url    string
	token  string
	secret string
	msg    map[string]interface{}
}

func New(token string, secret string) Ding {
	ding := Ding{
		url:    URL,
		token:  token,
		secret: secret,
	}
	return ding
}

func (d Ding) SetMessage() {
	var msg map[string]interface{}
	msg["type"] = "text"
	d.msg = msg
}

func (d Ding) Send() {
	access_token := d.token
	secret := d.secret

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

	baseurl := fmt.Sprintf(d.url, params.Encode())

	var msg map[string]interface{}

	m, e := json.Marshal(msg)
	if e != nil {
		os.Exit(1)
	}

	r := bytes.NewReader(m)
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
