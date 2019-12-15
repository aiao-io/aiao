#!/bin/bash

echo "stencil-toolkit"

OUT_DIR=../../dist/libs/stencil-toolkit
AIAO_DIR=../../node_modules/@aiao
NODE_MODULE_DIR=$AIAO_DIR/stencil-toolkit

rm -rf $OUT_DIR
tsc -p ./tsconfig.lib.json

cp README.md $OUT_DIR
cp ../../LICENSE $OUT_DIR

# build
cp ./src/lib/builders/build/schema.json $OUT_DIR/lib/builders/build/schema.json

# serve
cp ./src/lib/builders/serve/schema.json $OUT_DIR/lib/builders/serve/schema.json

# library
cp ./src/lib/schematics/library/schema.json $OUT_DIR/lib/schematics/library/schema.json
cp ./src/lib/schematics/library/schema.d.ts $OUT_DIR/lib/schematics/library/schema.d.ts
cp -rf ./src/lib/schematics/library/files $OUT_DIR/lib/schematics/library/files

# init
cp ./src/lib/schematics/init/schema.json $OUT_DIR/lib/schematics/init/schema.json
cp ./src/lib/schematics/init/schema.d.ts $OUT_DIR/lib/schematics/init/schema.d.ts

cp ../../LICENSE $OUT_DIR/LICENSE
cp ./README.md $OUT_DIR/README.md

cp package.json $OUT_DIR
cp builders.json $OUT_DIR
cp collection.json $OUT_DIR
