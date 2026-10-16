# Portfolio destination repair

## Confirmed cause

The local editorial site was newer than the public GitHub Pages release. The resume contact action linked directly to the public canonical URL, leaving the preview for the older release. Public `/work/` returned 404.

## Change

`sitePath` now translates this portfolio's own canonical URLs into the current build's internal routes, preserving the Pages base, query and fragment. Other projects and external sources retain their destinations. A rendered-resume regression check verifies the Portfolio action stays on the current origin.

The complete editorial site and five engineering/data showcase apps are included in the release. Reviewed resume files remain byte-identical. Existing external projects remain independent destinations.

## Pre-release evidence

Lint, TypeScript, 15 rendered-route tests and 7 export tests pass. Root and Pages builds, validated five-route static export and pack validation pass. The earlier app scans cover all nine new views and responsive sizes. Native keyboard checks now pass: Relay reset opens with Enter, cancel activates with Enter, Tab reaches Module workspace with a 3px focus outline; Grid prediction bounds toggle false/true with Space; Video threshold advances 0.50 to 0.55 with ArrowRight and returns with ArrowLeft.

All three project source packages and executed analyses were previously checksum-verified. Final local/public link reports are under `work/link-repair/`. Public post-release results follow deployment.

## Release recovery

The previous published checkpoint is `31e8f0933cb013c5a64957a732b0bfdb90256069`. If the new root, work collection, assets or approved downloads fail after deployment, repair forward or revert the release through the Pages workflow. There are no database migrations or production data writes in this release.
