/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>

*/
package cmd

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
	"fmt"

	"github.com/spf13/cobra"
)

var rsa_generateKey_length *int
var rsa_generateKey_raw *bool

// generateKeyCmd represents the generateKey command
var generateKeyCmd = &cobra.Command{
	Use:   "generateKey",
	Short: "RSA generate private key",
	Long: `RSA generate private key:

Use --length or -l to set private key length.`,
	Run: func(cmd *cobra.Command, args []string) {
		k, err := rsa.GenerateKey(rand.Reader, *rsa_generateKey_length)
		if err != nil {
			println(err.Error())
		}

		key := x509.MarshalPKCS1PrivateKey(k)
		if *rsa_generateKey_raw {
			keyStr := base64.StdEncoding.EncodeToString(key)
			fmt.Printf("%s\n", keyStr)
		} else {
			block := &pem.Block{
				Type: "RSA PRIVATE KEY",
				Headers: map[string]string{
					"Generater": "gsmlg-cli",
				},
				Bytes: []byte(key),
			}
			b := pem.EncodeToMemory(block)
			fmt.Printf("%s", b)
		}

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
	rsa_generateKey_length = generateKeyCmd.Flags().IntP("length", "l", 2048, "RSA private key length")
	rsa_generateKey_raw = generateKeyCmd.Flags().BoolP("raw", "r", false, "Print raw output RSA private key")
}
