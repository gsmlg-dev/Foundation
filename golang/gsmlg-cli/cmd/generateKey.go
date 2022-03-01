/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>

*/
package cmd

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"fmt"

	"github.com/spf13/cobra"
)

// generateKeyCmd represents the generateKey command
var generateKeyCmd = &cobra.Command{
	Use:   "generateKey",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		k, err := rsa.GenerateKey(rand.Reader, 2048)
		if err != nil {
			println(err.Error())
		}
		key := x509.MarshalPKCS1PrivateKey(k)
		// pubKey := x509.MarshalPKCS1PublicKey(&k.PublicKey)
		keyStr := base64.StdEncoding.EncodeToString(key)
		// pubStr := base64.StdEncoding.EncodeToString(pubKey)
		fmt.Printf("%s\n\n", keyStr)
		// fmt.Printf("%s\n\n", pubStr)
	},
}

func init() {
	rsaCmd.AddCommand(generateKeyCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// generateKeyCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// generateKeyCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
