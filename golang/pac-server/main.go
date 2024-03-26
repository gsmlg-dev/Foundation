package main

import (
	"bytes"
	_ "embed"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"regexp"
	"time"
)

var (
	host        string
	proxyServer string
	printHosts  bool
)

func init() {
	flag.StringVar(&host, "h", ":1080", "Set pac server listen address, default is ':1080'.")
	flag.StringVar(&proxyServer, "s", "PROXY 127.0.0.1:3128", "Set proxy server address, default is 'PROXY 127.0.0.1:3128'.")
	flag.BoolVar(&printHosts, "p", false, "Print hosts in gfwlist.pac.")
}

//go:embed gfwlist.pac
var pac []byte

func pacHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("Request from %s\n", r.RemoteAddr)

	w.Header().Set("Content-Type", "application/x-ns-proxy-autoconfig")

	cl := fmt.Sprintf("%d", len(pac))
	w.Header().Set("Content-Length", cl)

	pac = bytes.Replace(pac, []byte("SOCKS5 127.0.0.1:1080; SOCKS 127.0.0.1:1080"), []byte(proxyServer), 1)

	pacReader := bytes.NewReader(pac)
	io.Copy(w, pacReader)
}

func showHosts() {
	r, _ := regexp.Compile(" {12}\".*\",?\n")
	rn, _ := regexp.Compile("[\",\n]")
	matched := r.FindAll(pac, -1)
	for _, m := range matched {
		h := rn.ReplaceAll(m[12:], []byte(""))
		fmt.Printf("%s\n", h)
	}
}

func main() {
	flag.Parse()

	if printHosts {
		showHosts()
		os.Exit(0)
	}

	s := &http.Server{
		Addr:           host,
		Handler:        http.HandlerFunc(pacHandler),
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	log.Println(fmt.Sprintf("PAC Server start at %s", host))

	log.Fatal(s.ListenAndServe())
}
