#!/bin/sh -x
CURRENT=`git branch | grep "*" | awk '{print $2}'`
git checkout lambda
git pull --rebase origin lambda
git checkout $CURRENT
git rebase lambda