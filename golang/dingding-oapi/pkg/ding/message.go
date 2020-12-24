package ding

// "encoding/json"

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
