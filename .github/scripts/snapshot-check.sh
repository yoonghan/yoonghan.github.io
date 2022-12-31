#!/bin/bash

if ls ./backstop_data/bitmaps_test/*/failed* 1> /dev/null 2>&1; then
    echo "Contains failed snapshot."
    echo "-----"
    echo "Download new snapshots in bitmaps_test and replace in reference if you are confident on the change."
    echo "Push new changes after the copy."
    echo " OR "
    echo "Update backstopjs.approve with (${GITHUB_RUN_NUMBER} + 1) and commit backstopjs.approve file."
    echo " OR "
    echo "Run Action with 'Create Approved Snapshot'"
    echo "---"
    echo "For change comparison, locate it in ./html_report/index.html"
    exit 1
fi
exit 0
