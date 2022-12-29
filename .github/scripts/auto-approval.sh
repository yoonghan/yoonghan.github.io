#!/bin/bash

APPROVE_RUN_NUMBER=`cat ./backstop.approve`

echo github [$GITHUB_RUN_NUMBER]
echo approve [$APPROVE_RUN_NUMBER]
echo
if [ "$APPROVE_RUN_NUMBER" = "$GITHUB_RUN_NUMBER" ]; then
    echo 'auto approving backstop'
    npm run backstop:approve
    rm ./backstop_data/bitmaps_test/*/failed*
    git add ./backstop_data/*
    git commit -m "Auto Approval"
    git push
fi
exit 0
