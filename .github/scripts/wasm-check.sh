#!/bin/bash

# Can't compare *.wasm file as binary compilation are different

cd crate

wasm_dir_compare="./$1/"
wasm_dir=./pkg/

function cmpFile() {
    fileName="${1##*/}"
    echo "comparing $fileName"
    cmp -b $wasm_dir_compare$fileName $wasm_dir$fileName
    if [[ $? -ne 0 ]]; then
        echo "Please recompile WASM with $fileName"
        exit 1
    fi
}

for file in ./$wasm_dir_compare/*.ts ; do
    [ -L "${file%/}" ] && continue
    cmpFile $file
done

for file in ./$wasm_dir_compare/*.js ; do
    [ -L "${file%/}" ] && continue
    cmpFile $file
done
