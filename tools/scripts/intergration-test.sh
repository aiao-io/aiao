#!/bin/sh
echo "integration test"

port=6200

SKIP_TEST=(
  integration/stencil-toolkit-nx/
  integration/lazy-module/
)

for D in integration/*/; do
  port=$(($port + 1))
  if [[ "${SKIP_TEST[*]}" =~ "${D}" ]]; then
    echo "skip ${D}"
  else
    sh -c "cd ${D} && yarn install --frozen-lockfile --non-interactive && yarn run e2e"
  fi
done
