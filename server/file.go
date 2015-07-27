package main

import (
	"github.com/saulhoward/acr/server/github"
)

type file struct {
	Filename string `json:"filename"`
	Content  string `json:"content"`
}

func githubFiles(ghFiles []github.File) []file {
	files := make([]file, len(ghFiles))
	for i, f := range ghFiles {
		files[i] = file{
			Filename: f.Filename,
			Content:  f.Content,
		}
	}
	return files
}
