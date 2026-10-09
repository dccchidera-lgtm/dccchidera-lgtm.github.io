#!/usr/bin/env bash
# Hands a coding task to OpenAI Codex and prints its final summary.
# Usage: .claude/codex.sh "detailed task brief"   (or pipe the brief on stdin)
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"

if command -v codex >/dev/null 2>&1; then
  codex_cmd=(codex)
else
  codex_cmd=(npx -y @openai/codex)
fi

if ! "${codex_cmd[@]}" login status >/dev/null 2>&1; then
  if [ -n "${OPENAI_API_KEY:-}" ]; then
    printenv OPENAI_API_KEY | "${codex_cmd[@]}" login --with-api-key >/dev/null
  else
    echo "Codex is not logged in. Run 'codex login' locally, or set OPENAI_API_KEY in the cloud environment." >&2
    exit 2
  fi
fi

summary="$(mktemp)"
trap 'rm -f "$summary"' EXIT

"${codex_cmd[@]}" exec \
  --sandbox workspace-write \
  --cd "$repo_root" \
  --color never \
  --output-last-message "$summary" \
  "$@" >&2

cat "$summary"
