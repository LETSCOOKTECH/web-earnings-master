#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
REPO="${REPO:-LETSCOOKTECH/web-earnings-master}"
if ! command -v gh >/dev/null 2>&1; then
  echo 'GitHub CLI required: https://cli.github.com/ ; run gh auth login' >&2; exit 2
fi
gh auth status >/dev/null
if gh repo view "$REPO" >/dev/null 2>&1; then
  echo "Refusing to overwrite an existing repo: $REPO" >&2; exit 3
fi
if [[ ! -d .git ]]; then git init -b main; fi
if [[ -z "$(git log -1 --format=%H 2>/dev/null || true)" ]]; then
  git add .
  git -c user.name='LetsCookTech' -c user.email='295086907+LETSCOOKTECH@users.noreply.github.com' commit -m 'Create Web Earnings Master Codex skills'
fi
gh repo create "$REPO" --private --source=. --remote=origin --push
visibility="$(gh repo view "$REPO" --json visibility --jq .visibility)"
if [[ "$visibility" != PRIVATE ]]; then
  echo "SECURITY ALERT: unexpected visibility $visibility" >&2; exit 4
fi
echo "Private repo verified: https://github.com/$REPO"
