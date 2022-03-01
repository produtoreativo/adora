#!/bin/sh -x
FB="feat($1)"
git stash
git checkout maste
git pull --rebase origin master
git checkout -b $FB master
git status