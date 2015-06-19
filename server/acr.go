package main

import (
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/saulhoward/acr/server/github"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var (
	ghToken = flag.String("github-token", "", "GitHub access token")
	verbose = flag.Bool("v", false, "verbose output")
)

func log(s string) {
	if *verbose {
		fmt.Fprintf(os.Stderr, s)
	}
}

func main() {
	flag.Usage = usage
	flag.Parse()

	github.InitClient(ghToken)

	files, err := github.FilesFromLastCommit()
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v", err)
	} else {
		for _, f := range files {
			fmt.Fprintf(os.Stderr, "%v\n", f.Filename)

			// decide if it is go or js or txt
			// pass it to the processor for the language
			// print a function out

		}
	}

	// gofile := *GoFile{
	// 	Contents: contents
	// }

	// start http interface
	// mux := http.NewServeMux()
	// mux.HandleFunc("/", listReposHandler)
	// http.ListenAndServe(":8083", mux)

	r := gin.Default()
	r.LoadHTMLFiles("./client/static/index.html")
	r.Static("/js", "./client/static/js")
	r.Static("/css", "./client/static/css")

	r.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", nil)
	})

	r.GET("/ws", func(c *gin.Context) {
		wshandler(c.Writer, c.Request)
	})

	r.Run("localhost:12312")
}

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func wshandler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Failed to set websocket upgrade: %+v", err)
		return
	}

	for {
		t, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}
		conn.WriteMessage(t, msg)
	}
}

func listReposHandler(w http.ResponseWriter, r *http.Request) {
	repos, err := github.ListRepos()
	if err != nil {
		// fmt.Printf("error: %v\n\n", err)
		io.WriteString(w, err.Error())
	} else {
		for _, r := range repos {
			io.WriteString(w, r)
		}
	}
}

func usage() {
	fmt.Fprintf(os.Stderr, "usage: acr [options]\n")
	fmt.Fprintf(os.Stderr, "Flags:\n")
	flag.PrintDefaults()
	os.Exit(2)
}
