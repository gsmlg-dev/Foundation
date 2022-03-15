package main

import (
	"bytes"
	_ "embed"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"log"
	"net"
	"net/http"
	"time"

	"github.com/gsmlg-dev/Foundation/golang/gsmlg/geoip2"
)

var (
	db     *geoip2.Reader
	addr   string
	dbFile string
)

func init() {
	flag.StringVar(&addr, "addr", ":8080", "Set geoip server listen address, default is ':8080'.")
	flag.StringVar(&dbFile, "db", "GeoLite2-City.mmdb", "Set geoip mmdb file.")
}

func pacHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("Request from %s => ", r.RemoteAddr)

	ipStr := fmt.Sprintf("%s", r.URL)
	ip := net.ParseIP(ipStr[1:])
	fmt.Printf("Query IP %s\n", ipStr[1:])
	record, _ := db.City(ip)
	s, _ := json.Marshal(record)
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

	s := &http.Server{
		Addr:           addr,
		Handler:        http.HandlerFunc(pacHandler),
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	log.Println(fmt.Sprintf("PAC Server start at %s", addr))

	log.Fatal(s.ListenAndServe())
}
