#!/bin/bash

LIB_NAME=leancloud-hash

echo "Build $LIB_NAME"
AIAO_DIR=../../node_modules/@aiao
NODE_MODULE_DIR=$AIAO_DIR/$LIB_NAME
OUT_DIR=../../dist/libs/$LIB_NAME

# build
rm -rf $OUT_DIR
tsc -p ./tsconfig.lib.json

# cp
cp ../../LICENSE $OUT_DIR/LICENSE
cp package.json $OUT_DIR
cp README.md $OUT_DIR
