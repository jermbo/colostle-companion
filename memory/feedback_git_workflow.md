---
name: Git commit workflow
description: Never run git commit without explicit user approval; stage and draft only
type: feedback
---

Always stage files and write the proposed commit message for the user to review. Never run `git commit` (or any destructive/publishing git command) without the user explicitly saying to proceed.

**Why:** User interrupted a commit mid-run and stated this preference directly.

**How to apply:** After staging, present the commit message as a draft and ask "Ready to commit?" or equivalent. Wait for a "yes" / "go ahead" before running `git commit`.
