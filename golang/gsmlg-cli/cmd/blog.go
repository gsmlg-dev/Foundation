/*
Copyright © 2022 Jonathan Gao <gsmlg.com@gmail.com>

*/
package cmd

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gsmlg-dev/Foundation/golang/gsmlg/blog"
	"github.com/spf13/cobra"
)

var (
	id     int
	output string
)

// blogCmd represents the blog command
var blogCmd = &cobra.Command{
	Use:   "blog",
	Short: "List blog",
	Long: `Print blog info in terminal. Format:

    Support plain text and json format.`,
	Run: func(cmd *cobra.Command, args []string) {
		if id > 0 {
			b, err := blog.FetchOne(id)
			if err != nil {
				log.Fatalln(err)
			}

			if output == "json" {
				s, err := json.Marshal(b)
				if err != nil {
					log.Fatalln(err)
				}
				fmt.Printf("%s\n", s)
			} else {
				pf := fmt.Sprintf("%%-%dd\t%%-%ds\t%%s\n", len(string(b.Id)), len(b.Slug))
				fmt.Printf(pf, b.Id, b.Slug, b.Title)
			}
		} else {

			list, err := blog.Fetch()

			if err != nil {
				log.Fatalln(err)
			}

			if output == "json" {
				s, err := json.Marshal(list)
				if err != nil {
					log.Fatalln(err)
				}
				fmt.Printf("%s\n", s)
			} else {
				var (
					l1 int = 0
					l2 int = 0
				)
				for _, b := range list {
					if l := len(string(b.Id)); l > l1 {
						l1 = l
					}
					if l := len(b.Slug); l > l2 {
						l2 = l
					}
				}
				pf := fmt.Sprintf("%%-%dd\t%%-%ds\t%%s\n", l1, l2)

				for _, b := range list {
					fmt.Printf(pf, b.Id, b.Slug, b.Title)
				}
			}
		}
	},
}

func init() {
	rootCmd.AddCommand(blogCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	blogCmd.PersistentFlags().StringVar(&output, "output", "text", "Output format")

	// blogCmd.Flags(),String("type", "type", false)
	blogCmd.Flags().IntVar(&id, "id", 0, "Get blog by id")
}
