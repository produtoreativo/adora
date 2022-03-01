#!/bin/sh -x
CURRENT=`git branch | grep "*" | awk '{print $2}'`
git push -u origin ${CURRENT}