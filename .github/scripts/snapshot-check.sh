if ls ./backstop_data/bitmaps_test/*/failed* 1> /dev/null 2>&1; then
    echo "Contains failed snapshot."
    echo "Download new snapshots in bitmaps_test and replace in reference if you are confident on the change."
    echo "Push new changes after the copy."
    exit 1
fi
exit 0
