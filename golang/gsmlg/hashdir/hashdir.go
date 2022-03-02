package hashdir

import (
	"crypto/sha256"
	"encoding/base64"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func base64UrlSafeEncode(source []byte) string {
	// Base64 Url Safe is the same as Base64 but does not contain '/' and '+' (replaced by '_' and '-') and trailing '=' are removed.
	safeurl := base64.StdEncoding.EncodeToString(source)
	safeurl = strings.ReplaceAll(safeurl, "/", "_")
	safeurl = strings.ReplaceAll(safeurl, "+", "-")
	safeurl = strings.ReplaceAll(safeurl, "=", "")
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
