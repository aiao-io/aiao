if [[ -n $GITHUB_BASE_REF ]]; then
  echo "Fetching Base Commit from GitHub"
  echo "NX_BASE=$GITHUB_BASE_REF" >>$GITHUB_ENV
else
  if [[ ! -f dist/ci/last-deploy.txt ]]; then
    mkdir -p dist/ci && git rev-list --max-parents=0 HEAD >dist/ci/last-deploy.txt
  fi
  echo "NX_BASE=$(cat dist/ci/last-deploy.txt)" >>$GITHUB_ENV
fi
