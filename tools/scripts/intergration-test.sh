#!/bin/sh
echo "integration test"

for D in integration/*/; do
  sh -c "cd ${D} && yarn install --frozen-lockfile --non-interactive"
done
