package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"strings"
)

// Server ...
type Server struct {
	Host   string
	Port   string
	Target string
}

// Client ...
type Client struct {
	conn   net.Conn
	target string
}

// Run ...
func (server *Server) Run() {
	listener, err := net.Listen("tcp", fmt.Sprintf("%s:%s", server.Host, server.Port))
	if err != nil {
		log.Fatal(err)
	}
	defer listener.Close()

	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Fatal(err)
		}

		client := &Client{
			conn:   conn,
			target: server.Target,
		}
		go client.handleRequest()
	}
}

func (client *Client) handleRequest() {
	reader := bufio.NewReader(client.conn)
	for {
		message, err := reader.ReadString('\n')
		if err != nil {
			client.conn.Close()
			return
		}
		fmt.Print(message)
		// fmt.Printf("Message incoming: %s", string(message))
		m := strings.NewReader(message)
		_, err1 := http.Post(client.target, "application/json", m)
		if err1 != nil {
			fmt.Fprintf(os.Stderr, "ERR: %s\r\n%v\r\n%s", client.target, err1, m)
		}
		client.conn.Write([]byte("Log received and forwarded. \n"))
	}
}

func main() {
	server := &Server{
		Host:   getAddr(),
		Port:   getPort(),
		Target: getTarget(),
	}
	server.Run()
}

func getAddr() string {
	val, ok := os.LookupEnv("ADDR")
	if !ok {
		return "0.0.0.0"
	} else {
		return val
	}
}

func getPort() string {
	val, ok := os.LookupEnv("PORT")
	if !ok {
		return "3396"
	} else {
		return val
	}
}

func getTarget() string {
	val, ok := os.LookupEnv("TARGET")
	if !ok {
		return "http://couch:couch@couch1.log-target.dev:5984/web-log"
	} else {
		return val
	}
}
