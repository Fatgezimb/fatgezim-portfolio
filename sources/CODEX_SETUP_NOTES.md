# Codex Setup Notes

This pack is designed around current Codex workflow features:

- Plan mode for complex tasks
- `AGENTS.md` for durable repository instructions
- repository skills under `.agents/skills`
- explicit skill invocation with `$portfolio-phase-gate`
- image attachments and image generation where available
- plugins/MCP for connected tools
- subagents for bounded audits and reviews
- Git checkpoints and review workflows

## Recommended start

In the Codex desktop app, IDE, or CLI:

1. Open the résumé repository.
2. Use Plan mode.
3. Attach the visual references.
4. Invoke `$portfolio-phase-gate`.
5. Paste `SUBMIT_THIS_TO_CODEX.md`.

## CLI-style example

Exact flags and plugin availability vary by environment, but the intended sequence is:

```text
/plan
$portfolio-phase-gate
Read SUBMIT_THIS_TO_CODEX.md and begin Phase 0 and Phase 1 only.
```

When visual attachments are supported, include the markup images and one or two concept renders in the first turn.

## Permission boundary

Keep normal approval and sandbox protections enabled. The prompt instructs Codex to request or create Git checkpoints rather than overwrite unrelated work.

## Official documentation reviewed when preparing this pack

- https://learn.chatgpt.com/docs/agent-configuration/agents-md
- https://learn.chatgpt.com/docs/build-skills
- https://learn.chatgpt.com/guides/best-practices
- https://learn.chatgpt.com/docs/codex/cli
