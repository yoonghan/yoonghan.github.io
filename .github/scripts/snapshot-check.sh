#!/bin/bash

if ls ./backstop_data/bitmaps_test/*/failed* 1> /dev/null 2>&1; then
    echo "Contains failed snapshot."
    echo "Download new snapshots in bitmaps_test and replace in reference if you are confident on the change."
    echo "Push new changes after the copy."
    echo " OR "
    echo "For auto approval, do echo $GITHUB_RUN_NUMBER + 1 > backstop.approve file."
    echo "---"
    echo "Push new changes after updating snapshot of backstop.approve creation file."
    echo "---"
    echo "For change comparison, locate it in ./html_report/index.html"
    exit 1
fi
exit 0
