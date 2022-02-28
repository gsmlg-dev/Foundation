package blog

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func Fetch() ([]Blog, error) {
	resp, err := http.Get(BLOG_API_URL)
	if err != nil {
		return nil, err
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var br FetchResponse
	if err := json.Unmarshal(body, &br); err != nil {
		return nil, err
	}

	return br.Data, nil
}

func FetchOne(id int) (Blog, error) {
	url := fmt.Sprintf("%s/%d", BLOG_API_URL, id)
	resp, err := http.Get(url)
	if err != nil {
		return Blog{}, err
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return Blog{}, err
	}

	var br FetchOneResponse
	if err := json.Unmarshal(body, &br); err != nil {
		return Blog{}, err
	}

	return br.Data, nil
}
