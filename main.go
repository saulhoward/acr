package main

import (
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/saulhoward/acr/github"
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

	// // list repos
	// repos, err := github.ListRepos()
	// if err != nil {
	// 	fmt.Fprintf(os.Stderr, "%v", err)
	// } else {
	// 	for _, r := range repos {
	// 		fmt.Fprintf(os.Stderr, "%v\n", r)
	// 	}
	// }

	commit, err := github.LastCommit()
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v", err)
	} else {
		fmt.Fprintf(os.Stderr, "%v\n", commit)
	}

	// start http interface
	// mux := http.NewServeMux()
	// mux.HandleFunc("/", listReposHandler)
	// http.ListenAndServe(":8083", mux)
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
