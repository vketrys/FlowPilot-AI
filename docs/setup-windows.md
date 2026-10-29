# Windows setup (PowerShell)

**Prerequisites**: Git; current Node.js LTS; VS Code/your IDE; Docker Desktop (later, for M1). No application dependencies are installed by this starter.

## Install Antigravity CLI
From the **official** https://www.antigravity.google/docs/cli/install/ page:

```powershell
irm https://antigravity.google/cli/install.ps1 | iex
agy --version
```

Review script/security prompts before running a remote installer. If `agy` is not on PATH, open a fresh PowerShell window.

## Start a repository
```powershell
cd path\to\flowpilot
git init
agy
```

Sign in with the Google account on your **Google AI Pro** subscription. Then check `/usage`, `/permissions`, and type `/` to locate project skills. Use default request review or strict permissions first; do not enable automatic billable AI-credit overages.

## Verify agent discovery
Prompt:
> Explain the 5 most important rules in AGENTS.md and list the workspace skills and subagents that are available. Do not modify any files or run shell commands.

If skills are not visible, verify `.agents/skills/<skill>/SKILL.md` paths and reload/restart the CLI. If sign-in fails, use the official troubleshooting guide for Antigravity (not old Gemini CLI OAuth tutorials).

## Initial development task
Prompt:
> Read docs/roadmap.md and activate plan-feature. Prepare a reviewable implementation plan for Milestone 1. Keep the scope to pnpm monorepo setup, Next.js and NestJS local startup, PostgreSQL Docker Compose, and CI scripts. Show commands and tests. Do not implement before approval.
