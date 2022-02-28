package blog

const BLOG_API_URL = "https://gsmlg.org/api/blogs"

type Blog struct {
	Id      int    `json:"id"`
	Slug    string `json:"slug"`
	Title   string `json:"title"`
	Date    string `json:"date"`
	Author  string `json:"author"`
	Content string `json:"content"`
}

type FetchResponse struct {
	Data []Blog `json:"data"`
}

type FetchOneResponse struct {
	Data Blog `json:"data"`
}
