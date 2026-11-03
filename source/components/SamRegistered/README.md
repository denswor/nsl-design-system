# SamRegistered

Header button after the search field linking to the SAM-registered vendor page.

- Hat icon + "SAM registered" (case as written, no uppercase transform) in IBM Plex Sans Condensed SemiBold 16, `primary-900` on a 4% brand tint with a `primary-100` border, 40px tall, `radius-md`.
- When space runs out it shortens to the hat + "SAM": automatically inside Header below 1280px, or with `compact`.
- Props: `href` (default `/sam-registered-vendor/`), `label`, `compact`. Header shows it by default; `sam={false}` hides it.
- Not a CTA: it's a trust mark that links to information, so it doesn't count toward One CTA.
- `SamApproved` is kept as an alias of this component for older code.
