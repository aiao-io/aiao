#!/bin/bash
cat >~/.netrc <<EOF
machine api.heroku.com
  login $HEROKU_LOGIN
  password $HEROKU_API_KEY
EOF

cat >~/.netrc <<EOF
machine git.heroku.com
  login $HEROKU_LOGIN
  password $HEROKU_API_KEY
EOF

mkdir -p ~/.ssh/
cat >>~/.ssh/config <<EOF
StrictHostKeyChecking no
EOF
