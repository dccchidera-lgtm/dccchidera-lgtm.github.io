#!/usr/bin/env bash
# Cloud sessions only: install Codex and log it in with the environment's OpenAI key.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

if ! command -v codex >/dev/null 2>&1; then
  npm install -g @openai/codex >/dev/null 2>&1 || echo "Codex install failed; .claude/codex.sh will fall back to npx." >&2
fi

if [ -n "${OPENAI_API_KEY:-}" ] && command -v codex >/dev/null 2>&1; then
  codex login status >/dev/null 2>&1 || printenv OPENAI_API_KEY | codex login --with-api-key >/dev/null
fi
