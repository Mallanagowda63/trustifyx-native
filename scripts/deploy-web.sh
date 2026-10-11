#!/usr/bin/env bash
# Builds the website and pushes the built files to the `deploy` branch.
# Hostinger pulls that branch into public_html (auto-deploy via GitHub webhook).
set -euo pipefail
cd "$(dirname "$0")/.."

npx expo export --platform web

wt="$(mktemp -d)"
trap 'git worktree remove --force "$wt" >/dev/null 2>&1 || true' EXIT

if git ls-remote --exit-code --heads origin deploy >/dev/null 2>&1; then
  git fetch -q origin deploy
  git worktree add -q -B deploy "$wt" origin/deploy
else
  git worktree add -q --orphan -b deploy "$wt"
fi

# Replace everything on the branch with the fresh build.
find "$wt" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -r dist/. "$wt"/

cd "$wt"
git add -A
if git diff --cached --quiet; then
  echo "Nothing changed since the last deploy."
  exit 0
fi
git commit -q -m "Deploy website $(date '+%Y-%m-%d %H:%M')"
git push -q origin deploy
echo "Pushed to the deploy branch. Hostinger will update trustifyx.in shortly."
