package main

import (
	_ "embed"
	"encoding/json"
	"flag"
	"fmt"
	"net"

	"github.com/gsmlg-dev/gsmlg-golang/geoip2"
)

var (
	ips    string
	dbFile string
)

func init() {
	flag.StringVar(&ips, "ip", "1.1.1.1", "query ip")
	flag.StringVar(&dbFile, "db", "GeoLite2-City.mmdb", "Set geoip mmdb file.")
}

func main() {
	flag.Parse()

	db, _ := geoip2.Open(dbFile)
	defer db.Close()

	ip := net.ParseIP(ips)
	record, _ := db.City(ip)

	c := geoip2.ProduceCity(record, "en")

	s, _ := json.Marshal(c)

	fmt.Printf("%s\n", s)
}
