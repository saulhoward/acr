package main

import (
	"io"
	"net/http"
	// "fmt"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

var repos []github.Repository
var client *github.Client

func listRepos(w http.ResponseWriter, r *http.Request) {
	opt := &github.RepositoryListOptions{Type: "all", Sort: "updated", Direction: "desc", IncludeOrg: true}
	repos, _, err := client.Repositories.List("", opt)
	if err != nil {
		// fmt.Printf("error: %v\n\n", err)
		io.WriteString(w, err.Error())
	} else {
		for _, r := range repos {
			io.WriteString(w, *r.Name)
		}
	}
}

func main() {
	// github api
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: ""},
	)
	tc := oauth2.NewClient(oauth2.NoContext, ts)
	client = github.NewClient(tc)

	// start http interface
	mux := http.NewServeMux()
	mux.HandleFunc("/", listRepos)
	http.ListenAndServe(":8083", mux)
}
