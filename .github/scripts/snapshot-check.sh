#!/bin/bash

if find ./visual-results -type f \( -name "*-diff.png" -o -name "*-actual.png" \) | grep -q .; then
    echo "Contains failed snapshot."
    echo "-----"
    echo "Download new snapshots from visual-results and replace in src/__e2e__/*-snapshots/ if you are confident on the change."
    echo "Push new changes after the copy."
    echo " OR "
    echo "Update visual.approve with (${GITHUB_RUN_NUMBER} + 1) and commit visual.approve file."
    echo " OR "
    echo "Run Action with 'Create Approved Snapshot'"
    echo "---"
    echo "For change comparison, check the playwright test output."
    exit 1
fi
exit 0
