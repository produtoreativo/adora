#!/bin/sh -x
FB=hotfix($1)
git stash
git checkout lambda
git pull --rebase origin lambda
git checkout -b $FB lambda
