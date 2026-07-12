# Accessibility and Performance Rules

## Accessibility acceptance criteria

- Page has a working skip link.
- Landmarks and heading hierarchy are logical.
- All controls are keyboard reachable.
- Focus is clearly visible on every interactive element.
- Hover-only information also appears on focus and tap.
- Project demos have accessible names and controls.
- Motion never communicates essential information by itself.
- Reduced-motion mode provides a complete static experience.
- Text remains readable at 200% zoom without horizontal page scrolling.
- Color contrast meets the applicable WCAG target.
- Icon-only buttons have accessible labels.
- Decorative visual layers are hidden from assistive technology.
- Status updates use text and appropriate live regions.
- No keyboard trap exists in previews, drawers, dialogs, or menus.

## Performance acceptance criteria

- Initial page remains useful before noncritical media loads.
- Major project media is lazy-loaded.
- Off-screen animation pauses.
- WebGL is optional and lazy-loaded.
- Static fallbacks exist for all major visuals.
- No large autoplay background video.
- Images use correct intrinsic dimensions.
- Layout shift is minimized.
- Project demos use small local mock data.
- Mobile touch remains responsive.
- No console errors or repeated warnings.

## Motion safety

Avoid rapid flashing, high-frequency oscillation, or large unexpected movement. Keep user controls stable. Do not animate focus position or scroll the page without a direct user action.
