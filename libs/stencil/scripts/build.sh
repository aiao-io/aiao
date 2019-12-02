#!/usr/bin/env bash

echo "stencil"

OUT_DIR=../../dist/libs/stencil
AIAO_DIR=../../node_modules/@aiao
NODE_MODULE_DIR=$AIAO_DIR/stencil

rm -rf $OUT_DIR
tsc -p ./tsconfig.lib.json

cp README.md $OUT_DIR
cp ../../LICENSE $OUT_DIR
cp ./src/lib/builders/build/schema.json $OUT_DIR/lib/builders/build/schema.json

cp package.json $OUT_DIR
cp builders.json $OUT_DIR

rm -rf $NODE_MODULE_DIR
mkdir -pv $AIAO_DIR
cp -rf $OUT_DIR $NODE_MODULE_DIR
