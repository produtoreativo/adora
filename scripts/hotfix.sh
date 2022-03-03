#!/bin/sh -x
FB=hotfix($1)
git stash
git checkout beta
git pull --rebase origin beta
git checkout -b $FB beta
