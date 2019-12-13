#!/bin/sh
echo "integration install"

for D in integration/*/; do sh -c "cd ${D} && yarn install --frozen-lockfile --non-interactive"; done

docker-compose up -d
