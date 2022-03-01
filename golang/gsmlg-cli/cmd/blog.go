/*
Copyright © 2022 Jonathan Gao <gsmlg.com@gmail.com>

*/
package cmd

import (
	"log"

	"github.com/gsmlg-dev/Foundation/golang/gsmlg/blog"
	"github.com/gsmlg-dev/Foundation/golang/gsmlg/print"
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
				print.Json(b)
			} else {
				pf := []blog.Blog{b}
				print.Table(pf, []string{"id", "slug", "title", "date"})
			}
		} else {

			list, err := blog.Fetch()

			if err != nil {
				log.Fatalln(err)
			}

			if output == "json" {
				print.Json(list)
			} else {
				print.Table(list, []string{"id", "slug", "title", "date"})
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
