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

var (
	dingUrl = "https://oapi.dingtalk.com/robot/send?%s"
)

type Message struct {
	Type string `json:"msgtype"`
}

type TextMessage struct {
	Type string `json:"msgtype"`
	Text string `json:"text"`
	At   At     `json:"at"`
}

type At struct {
	AtMobiles []string `json:"atMobiles"`
	IsAtAll   bool     `json:"isAtAll"`
}

type LinkMessage struct {
	Type string `json:"msgtype"`
	Link Link   `json:"link"`
}

type Link struct {
	Text       string `json:"text"`
	Title      string `json:"title"`
	PicUrl     string `json:"picUrl"`
	MessageUrl string `json:"messageUrl"`
}

type MarkdownMessage struct {
	Type     string   `json:"msgtype"`
	Markdown Markdown `json:"markdown"`
	At       At       `json:"at"`
}

type Markdown struct {
	Title string `json:"title"`
	Text  string `json:"text"`
}

type ActionCartMessage struct {
	Type  string `json:"msgtype"`
	Title string `json:"title"`
	Text  string `json:"text"`
}

type Ding struct {
	url    string
	token  string
	secret string
}

func New(token string, secret string) Ding {
	ding := Ding{
		url:    dingUrl,
		token:  token,
		secret: secret,
	}
	return ding
}

func (d Ding) Send(message string, typ string) {
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

	var msg map[string]interface{} = map[string]interface{}{}

	msg["type"] = typ
	msg["text"] = message

	m, err := json.Marshal(msg)
	if err != nil {
		println(err.Error())
		os.Exit(1)
	}

	r := bytes.NewReader(m)
	resp, err := http.Post(baseurl, "application/json", r)
	if err != nil {
		println(err.Error())
		os.Exit(1)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		println(err.Error())
		os.Exit(1)
	}
	fmt.Printf("Response:\n%s\n", body)
}

func makeTimestamp() int64 {
	return time.Now().UnixNano() / 1e6
}
