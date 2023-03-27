#!/bin/bash

wasm_dir_compare="./$1/"
wasm_dir=./pkg/

for file in ./$wasm_dir_compare/*.wasm* ; do
    [ -L "${file%/}" ] && continue
    fileName="${file##*/}"
    cmp "$wasm_dir_compare$fileName" "$wasm_dir$fileName"
done