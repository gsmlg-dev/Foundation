/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>

*/
package cmd

import (
	"fmt"
	"os"

	"github.com/gsmlg-dev/Foundation/golang/gsmlg/hashdir"
	"github.com/spf13/cobra"
)

// hashdirCmd represents the hashdir command
var hashdirCmd = &cobra.Command{
	Use:   "hashdir",
	Short: "Get directory hash",
	Long: `Get directory hash, by using:

gsmlg-cli hashdir [directory]

List files in directory and sum files by sha256 algorithm.`,
	Run: func(cmd *cobra.Command, args []string) {
		if len(args) != 1 {
			fmt.Fprintln(os.Stderr, "Require a directory as argument, like: gsmlg-cli hashdir [directory]")
			os.Exit(1)
		}
		hash := hashdir.Hashdir(args[0])
		fmt.Print(hash)
	},
}

func init() {
	rootCmd.AddCommand(hashdirCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// hashdirCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// hashdirCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
