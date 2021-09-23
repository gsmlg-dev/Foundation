package main

import (
	"os"
	"io/ioutil"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"strings"
	"path/filepath"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func base64UrlSafeEncode(source []byte) string {
	// Base64 Url Safe is the same as Base64 but does not contain '/' and '+' (replaced by '_' and '-') and trailing '=' are removed.
	bytearr := base64.StdEncoding.EncodeToString(source)
	safeurl := strings.Replace(string(bytearr), "/", "_", -1)
	safeurl = strings.Replace(safeurl, "+", "-", -1)
	safeurl = strings.Replace(safeurl, "=", "", -1)
	return safeurl
}

func Hashdir(dir string) string {
	h := sha256.New()

	err := filepath.Walk(dir, func(path string, info os.FileInfo, e error) error {
		check(e)
		name := info.Name()
		if strings.HasPrefix(name, ".") {
			return nil
		}
		if info.Mode().IsRegular() {
			data, err := ioutil.ReadFile(path)
			check(err)
			h.Write(data)
		}
		return nil
	})
	check(err)

	ha := h.Sum(nil)
	encodHash := base64UrlSafeEncode(ha)

	return encodHash
}

func main() {

	dir := os.Args[1]

	encodHash := Hashdir(dir)

	fmt.Println(encodHash)

}

