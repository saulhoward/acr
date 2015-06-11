package github

import (
	"strings"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

var repos []github.Repository
var client *github.Client

func InitClient(token *string) {
	if *token != "" {
		ts := oauth2.StaticTokenSource(
			&oauth2.Token{AccessToken: *token},
		)
		tc := oauth2.NewClient(oauth2.NoContext, ts)
		client = github.NewClient(tc)
	} else {
		client = github.NewClient(nil)
	}
}

func ListRepos() ([]string, error) {
	opt := &github.RepositoryListOptions{Type: "all", Sort: "updated", Direction: "desc", IncludeOrg: true}
	repos, _, err := client.Repositories.List("", opt)

	reposArr := make([]string, len(repos))
	for i := 0; i < len(repos); i++ {
		reposArr[i] = *repos[i].Name
	}

	return reposArr, err
}

func LastCommit() (string, error) {
	// get last updated repo
	opt := &github.ListOptions{PerPage: 1}
	events, _, err := client.Activity.ListEventsPerformedByUser("saulhoward", false, opt)
	if err != nil {
		return "", err
	}
	repo := events[0].Repo

	// get last commit to that repo
	commitOpt := &github.CommitsListOptions{Author: "saulhoward"}
	repoNameParts := strings.Split(*repo.Name, "/")
	commits, _, err := client.Repositories.ListCommits(repoNameParts[0], repoNameParts[1], commitOpt)

	return *commits[0].Commit.Message, err
}
