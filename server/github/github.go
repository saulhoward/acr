package github

import (
	"encoding/base64"
	"strings"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

type File struct {
	Filename string
	Content  string
}

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

func FilesFromLastCommit() ([]File, error) {
	// get last updated repo
	opt := &github.ListOptions{PerPage: 1}
	events, _, err := client.Activity.ListEventsPerformedByUser("saulhoward", false, opt)
	if err != nil {
		return nil, err
	}
	repo := events[0].Repo
	repoNameParts := strings.Split(*repo.Name, "/")
	repoOwner := repoNameParts[0]
	repoName := repoNameParts[1]

	// get last commit to that repo
	commitOpt := &github.CommitsListOptions{Author: "saulhoward"}
	commits, _, err := client.Repositories.ListCommits(repoOwner, repoName, commitOpt)
	if err != nil {
		return nil, err
	}
	sha := commits[0].SHA
	commit, _, err := client.Repositories.GetCommit(repoOwner, repoName, *sha)
	if err != nil {
		return nil, err
	}

	// build slice of files
	files := make([]File, len(commit.Files))
	for i := 0; i < len(commit.Files); i++ {
		var fileContent string
		filename := *commit.Files[i].Filename
		contentGetOpts := &github.RepositoryContentGetOptions{}
		repoContent, _, _, err := client.Repositories.GetContents(repoOwner, repoName, filename, contentGetOpts)
		if err != nil || repoContent == nil {
			fileContent = ""
		} else {
			fileBytes, err := base64.StdEncoding.DecodeString(*repoContent.Content)
			if err != nil {
				fileContent = ""
			} else {
				fileContent = string(fileBytes[:])
			}
		}
		files[i] = File{Content: fileContent, Filename: filename}
	}

	return files, err
}
