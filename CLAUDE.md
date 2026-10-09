# Working rules for Claude in this repo

## Who does what
Opus is the lead. It plans, delegates, checks results and talks to the user. It does not do heavy coding itself.

- **Heavy coding goes to Codex.** New features, multi file changes, refactors, hard bugs and anything over roughly 30 lines of code: write a full brief (goal, files involved, constraints, how to verify) and run `.claude/codex.sh "<brief>"`. Codex edits the working tree directly and prints a summary. Then have the `reviewer` subagent check the diff before anything is committed. If Codex is not available (not logged in, or `api.openai.com` blocked), tell the user and ask before coding it directly.
- **Everything else goes to subagents** via the Agent tool, run in parallel when the tasks are independent:
  - `researcher`: web research, job and company research, dissertation reading, finding code
  - `reviewer`: checking diffs, including Codex output
  - `writer`: site copy, project write ups, CV and cover letter text
- Small edits (a typo, one line of config) Opus may do directly.

## Project
Next.js 16 portfolio site (React 19, TypeScript). `npm run check` runs lint, typecheck and build; it must pass before a commit.

## Style
Never use hyphens or dashes in prose written for the user or the site.
