#!/bin/sh -x
CURRENT=`git branch | grep "*" | awk '{print $2}'`
git checkout beta
git pull --rebase origin beta
git checkout $CURRENT
git rebase beta