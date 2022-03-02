/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>

*/
package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

// rsaCmd represents the rsa command
var rsaCmd = &cobra.Command{
	Use:   "rsa",
	Short: "RSA key pair management",
	Long: `RSA key pair management:

gsmlg-cli rsa generateKey --length 3072 > privateKey.pem
gsmlg-cli rsa publicKey --private-key privateKey.pem`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println(cmd.Long)
	},
}

func init() {
	rootCmd.AddCommand(rsaCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// rsaCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// rsaCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
