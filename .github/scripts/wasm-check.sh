#!/bin/bash

# Can't compare *.wasm file as binary compilation are different
# Can't compare js., order of generated function is different.

cd crate

wasm_dir_compare="./$1/"
wasm_dir=./pkg/

function cmpFile() {
    fileName="${1##*/}"
    echo "comparing $fileName"
    cmp -b $wasm_dir_compare$fileName $wasm_dir$fileName
    if [[ $? -ne 0 ]]; then
        echo "Please recompile WASM with $fileName"
        echo "---content---"
        cat $wasm_dir_compare$fileName
        exit 1
    fi
}

for file in ./$wasm_dir_compare/*.ts ; do
    [ -L "${file%/}" ] && continue
    cmpFile $file
done
