package main

import (
        "net/http"
        "log"
        "io"
        "time"
        "fmt"
        "os"
)

func myHandler (w http.ResponseWriter, r *http.Request) {
        str := fmt.Sprintf("====> New request from %s \r\n", r.RemoteAddr)
        os.Stdout.WriteString(str)

        echo := io.MultiWriter(w, os.Stdout)
        str = fmt.Sprintf("%s %s %s\r\n", r.Method, r.URL, r.Proto)
        io.WriteString(echo, str)

        for k,v := range(r.Header) {
                for _, vv := range(v) {
                        str := fmt.Sprintf("%s: %s\r\n", k, vv)
                        io.WriteString(echo, str)
                }
        }
        io.WriteString(echo, "\r\n")

        _, err := io.Copy(echo, r.Body)
        if err != nil {
                log.Printf("Error reading body: %v", err)
                http.Error(w, "can't read body", http.StatusBadRequest)
                os.Stdout.WriteString("\r\n====> End request With Error \r\n")
                return
        }

        os.Stdout.WriteString("\r\n====> End request \r\n")
}

func getPort() string {
        val, ok := os.LookupEnv("PORT")
        if !ok {
                return "80"
        } else {
                return val
        }
}

func main() {

        port := getPort()
        addr := fmt.Sprintf(":%s", port)

        s := &http.Server{
                Addr:           addr,
                Handler:        http.HandlerFunc(myHandler),
                ReadTimeout:    10 * time.Second,
                WriteTimeout:   10 * time.Second,
                MaxHeaderBytes: 1 << 20,
        }

        log.Fatal(s.ListenAndServe())

}
