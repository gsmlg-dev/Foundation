/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>

*/
package cmd

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/spf13/cobra"
)

type Blog struct {
	Id      int    `json:"id"`
	Slug    string `json:"slug"`
	Title   string `json:"title"`
	Date    string `json:"date"`
	Author  string `json:"author"`
	Content string `json:"content"`
}

type BlogResponse struct {
	Data []Blog `json:"data"`
}

// blogCmd represents the blog command
var blogCmd = &cobra.Command{
	Use:   "blog",
	Short: "List blog",
	Long: `Print blog info in terminal. Format:

    Support plain text and json format.
`,
	Run: func(cmd *cobra.Command, args []string) {
		resp, err := http.Get("https://gsmlg.org/api/blogs")
		if err != nil {
			log.Fatalln(err)
		}

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatalln(err)
		}

		var br BlogResponse
		if err := json.Unmarshal(body, &br); err != nil {
			log.Fatalln(err)
		}

		var maxLen int = 0
		for _, b := range br.Data {
			if l := len(b.Slug); l > maxLen {
				maxLen = l
			}
		}

		pf := fmt.Sprintf("%%-3d\t%%-%ds\t%%s\n", maxLen)

		// fmt.Printf("%+v\n", b.Data)
		for _, b := range br.Data {
			fmt.Printf(pf, b.Id, b.Slug, b.Title)
		}
	},
}

func init() {
	rootCmd.AddCommand(blogCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// blogCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// blogCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
