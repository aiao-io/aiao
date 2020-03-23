#!/bin/bash

LIB_NAME=stencil-toolkit

echo "Build $LIB_NAME"
AIAO_DIR=../../node_modules/@aiao
NODE_MODULE_DIR=$AIAO_DIR/$LIB_NAME
OUT_DIR=../../dist/libs/$LIB_NAME

# build
rm -rf $OUT_DIR
tsc -p ./tsconfig.lib.json

# cp
cp ../../LICENSE $OUT_DIR/LICENSE
cp ./README.md $OUT_DIR/README.md
cp builders.json $OUT_DIR
cp collection.json $OUT_DIR
cp package.json $OUT_DIR
cp README.md $OUT_DIR

# cp build
cp ./src/lib/builders/build/schema.json $OUT_DIR/lib/builders/build/schema.json

# cp serve
cp ./src/lib/builders/serve/schema.json $OUT_DIR/lib/builders/serve/schema.json

# cp init
cp ./src/lib/schematics/init/schema.json $OUT_DIR/lib/schematics/init/schema.json

# cp library
cp ./src/lib/schematics/library/schema.json $OUT_DIR/lib/schematics/library/schema.json
cp -rf ./src/lib/schematics/library/files $OUT_DIR/lib/schematics/library/files

# cp component
cp ./src/lib/schematics/component/schema.json $OUT_DIR/lib/schematics/component/schema.json
cp -rf ./src/lib/schematics/component/files $OUT_DIR/lib/schematics/component/files
