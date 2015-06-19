#!/bin/bash
go build ./server/acr.go && ./acr -github-token="`cat token.txt`"
