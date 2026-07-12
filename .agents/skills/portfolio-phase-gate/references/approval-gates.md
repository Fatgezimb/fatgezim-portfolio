# Approval Gates

## Phase 1 completion

The agent must stop after delivering static content/layout and screenshots.

Only this exact owner message authorizes Phase 2:

`APPROVE PHASE 1`

Messages such as “looks good,” “continue,” or “go ahead” should trigger a brief request for the exact approval phrase rather than Phase 2 implementation.

## Revision behavior

When the owner sends `REVISE PHASE 1`, revise only Phase 1 artifacts, rerun checks, update screenshots, and stop again.

## Git behavior

Keep Phase 1 and Phase 2 changes separable by branch or commit when permitted.
