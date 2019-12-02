#!/usr/bin/env bash

echo "build-stencil"

OUT_DIR=../../dist/libs/build-stencil
AIAO_DIR=../../node_modules/@aiao
NODE_MODULE_DIR=$AIAO_DIR/build-stencil

rm -rf $OUT_DIR
tsc -p ./tsconfig.lib.json

cp README.md $OUT_DIR
cp ../../LICENSE $OUT_DIR
cp build-stencil.schema.json $OUT_DIR
cp package.json $OUT_DIR
cp builders.json $OUT_DIR

rm -rf $NODE_MODULE_DIR
mkdir -pv $AIAO_DIR
cp -rf $OUT_DIR $NODE_MODULE_DIR
