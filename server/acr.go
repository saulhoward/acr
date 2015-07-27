package main

import (
	"errors"
	"flag"
	"fmt"
	"io/ioutil"
	"math/rand"
	"os"
	"path/filepath"

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

type tokenRequest struct {
	Id       string       `json:"id"`
	Created  string       `json:"created"`
	Token    github.Token `json:"token"`
	Username string       `json:"username"`
}

var (
	errNoFilesFound = errors.New("No files found")
	errNoUserFound  = errors.New("No user found")
	users           = make(map[string]*user)
	localFiles      = make([]file, 0)
)

type user struct {
	Username  string       `json:"username"`
	Token     github.Token `json:"token"`
	Files     []file       `json:"-"`
	FileIndex int          `json:"-"`
	Error     error        `json:"-"`
}

func (u *user) setIndex(i int) {
	u.FileIndex = i
}

func newUser(username *string, token *github.Token) *user {
	files := make([]file, 0)
	return &user{
		Username:  *username,
		Token:     *token,
		Files:     files,
		FileIndex: 0,
	}
}

func fetchFilesForUser(id *string, username *string, token *github.Token) {
	files, err := github.GetFiles(id, username, token)
	users[*id] = &user{
		Username:  *username,
		Token:     *token,
		Files:     githubFiles(files),
		FileIndex: 0,
		Error:     err,
	}
}

func getRandomLocalFile() (file, error) {
	if len(localFiles) == 0 {
		return file{}, errNoFilesFound
	}
	return localFiles[rand.Intn(len(localFiles))], nil
}

func getUserFile(id *string) (file, error) {
	u := users[*id]
	if u == nil {
		return file{}, errNoUserFound
	}
	if len(u.Files) == 0 {
		if u.Error != nil {
			return file{}, u.Error
		}
		return file{}, errNoFilesFound
	}
	if (u.FileIndex + 1) < len(u.Files) {
		u.setIndex(u.FileIndex + 1)
		return u.Files[u.FileIndex], nil
	}
	u.setIndex(0)
	return getUserFile(id)
}

func readExampleSourceFiles() ([]file, error) {
	var files []file
	dirname := "." + string(filepath.Separator) + "excerpts"
	d, err := os.Open(dirname)
	if err != nil {
		return files, err
	}
	defer d.Close()
	srcFiles, err := d.Readdir(-1)
	if err != nil {
		return files, err
	}
	for _, f := range srcFiles {
		if f.Mode().IsRegular() {
			filePath := dirname + string(filepath.Separator) + f.Name()
			fileBytes, err := ioutil.ReadFile(filePath)
			if err == nil {
				fileStr := string(fileBytes[:])
				files = append(files, file{Filename: f.Name(), Content: fileStr})
			}
		}
	}
	return files, nil
}

func main() {
	flag.Usage = usage
	flag.Parse()

	// Load local example src files
	var err error
	localFiles, err = readExampleSourceFiles()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	// HTML server
	r := gin.Default()
	r.LoadHTMLFiles("./client/static/index.html")
	r.Static("/js", "./client/static/js")
	r.Static("/css", "./client/static/css")

	r.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", nil)
	})

	r.PUT("/users/:id/tokens", func(c *gin.Context) {
		id := c.Param("id")
		var token tokenRequest
		c.Bind(&token)

		users[id] = newUser(&token.Username, &token.Token)

		go fetchFilesForUser(&id, &token.Username, &token.Token)

		c.JSON(201, gin.H{
			"code":   201,
			"status": "success",
			"url":    "/users/" + id + "/excerpts",
		})
	})

	r.GET("/users/:id", func(c *gin.Context) {
		id := c.Param("id")
		u := users[id]
		if u == nil {
			c.JSON(404, gin.H{
				"code":    404,
				"status":  "error",
				"message": errNoUserFound.Error(),
			})
		} else {
			c.JSON(200, u)
		}
	})

	r.GET("/excerpts", func(c *gin.Context) {
		excerpt, err := getRandomLocalFile()
		if err != nil {
			switch err {
			case errNoFilesFound:
				c.JSON(404, gin.H{
					"code":    404,
					"status":  "error",
					"message": err.Error(),
				})
			default:
				c.JSON(500, gin.H{
					"code":    500,
					"status":  "error",
					"message": err.Error(),
				})
			}
		} else {
			c.JSON(200, excerpt)
		}
	})

	r.GET("/users/:id/excerpts", func(c *gin.Context) {
		id := c.Param("id")
		excerpt, err := getUserFile(&id)
		if err != nil {
			switch err {
			case errNoFilesFound, errNoUserFound:
				c.JSON(404, gin.H{
					"code":    404,
					"status":  "error",
					"message": err.Error(),
				})
			default:
				c.JSON(500, gin.H{
					"code":    500,
					"status":  "error",
					"message": err.Error(),
				})
			}
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
