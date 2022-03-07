#!/bin/sh -x
FB="feat(#$1)"
git stash
git checkout master
git pull --rebase origin master
git checkout -b $FB master
git status