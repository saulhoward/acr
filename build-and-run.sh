#!/bin/bash
go build && ./acr -github-token="`cat token.txt`"
