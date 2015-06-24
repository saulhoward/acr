package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/saulhoward/acr/server/github"

	"github.com/gin-gonic/gin"
)

var (
	verbose = flag.Bool("v", false, "verbose output")
)

func log(s string) {
	if *verbose {
		fmt.Fprintf(os.Stderr, s)
	}
}

type Token struct {
	Id      string       `json:"id"`
	Created string       `json:"created"`
	Token   github.Token `json:"token"`
}

func main() {
	flag.Usage = usage
	flag.Parse()

	r := gin.Default()
	r.LoadHTMLFiles("./client/static/index.html")
	r.Static("/js", "./client/static/js")
	r.Static("/css", "./client/static/css")

	r.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", nil)
	})

	r.PUT("/tokens/:id", func(c *gin.Context) {
		id := c.Param("id")
		var token Token
		c.Bind(&token)

		go github.Start(&id, &token.Token)

		c.JSON(201, gin.H{
			"code":   201,
			"status": "success",
			"url":    "/tokens/" + id + "/excerpt",
		})
	})

	r.GET("/tokens/:id/excerpt", func(c *gin.Context) {
		id := c.Param("id")
		excerpt, err := github.GetFile(&id)
		if err != nil {
			c.JSON(500, gin.H{
				"code":   500,
				"status": "error",
			})
		} else {
			c.JSON(200, excerpt)
		}
	})

	r.Run("localhost:12312")
}

func usage() {
	fmt.Fprintf(os.Stderr, "usage: acr [options]\n")
	fmt.Fprintf(os.Stderr, "Flags:\n")
	flag.PrintDefaults()
	os.Exit(2)
}
