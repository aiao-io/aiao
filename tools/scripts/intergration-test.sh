#!/bin/bash
echo "integration test"

port=6200

SKIP_TEST=(
  integration/elements-angular/
  integration/stencil-toolkit-nx/
  integration/lazy-module/
)

for name in integration/*/; do
  port=$((port + 1))
  if [[ "${SKIP_TEST[*]}" =~ "${name}" ]]; then
    echo "skip ${name}"
  else
    echo "================================="
    echo "[integration] test ${name}"
    echo "================================="
    sh -c "cd ${name} && yarn install --frozen-lockfile --non-interactive && yarn run e2e"
  fi
done
