package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"log"
	"net"
	"net/http"
	"os"
	"time"

	"github.com/gsmlg-dev/gsmlg-golang/geoip2"
)

var (
	db     *geoip2.Reader
	addr   string
	dbFile string
	ips    string
)

func init() {
	flag.StringVar(&ips, "ip", "", "query ip")
	flag.StringVar(&addr, "addr", ":8080", "Set geoip server listen address, default is ':8080'.")
	flag.StringVar(&dbFile, "db", "GeoLite2-City.mmdb", "Set geoip mmdb file.")
}

func pacHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("Request from %s => ", r.RemoteAddr)

	qip := r.URL.Query().Get("ip")
	ipStr := r.URL.Path[1:]
	if qip != "" {
		ipStr = qip
	}
	ip := net.ParseIP(ipStr)
	fmt.Printf("Query IP %s\n", ipStr)
	record, _ := db.City(ip)
	lang := "en"
	qlang := r.URL.Query().Get("lang")
	if qlang != "" {
		lang = qlang
	}
	c := geoip2.ProduceCity(record, lang)
	s, _ := json.Marshal(c)
	l := len(s)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", fmt.Sprintf("%d", l))
	w.Header().Set("Access-Control-Allow-Origin", "*")

	pacReader := bytes.NewReader(s)
	io.Copy(w, pacReader)
}

func main() {
	flag.Parse()

	db, _ = geoip2.Open(dbFile)
	defer db.Close()

	if ips != "" {
		ip := net.ParseIP(ips)
		record, _ := db.City(ip)

		c := geoip2.ProduceCity(record, "en")

		s, _ := json.Marshal(c)

		fmt.Printf("%s\n", s)
		os.Exit(0)
	}

	s := &http.Server{
		Addr:           addr,
		Handler:        http.HandlerFunc(pacHandler),
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	log.Printf("GeoIP Server start at %s\n", addr)

	log.Fatal(s.ListenAndServe())
}
