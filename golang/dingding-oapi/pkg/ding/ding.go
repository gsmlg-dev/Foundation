package ding

const (
	URL = "https://oapi.dingtalk.com/robot/send?%s"
)

type Ding struct {
	url    string
	token  string
	secret string
}

func (d Ding) New(token string, secret string) {
	ding := Ding{
		url:    URL,
		token:  token,
		secret: secret,
	}
}

func (d Ding) Send(msg Message) {

}
