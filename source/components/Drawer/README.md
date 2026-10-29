# Drawer

A panel docked to the side of the page, for tasks the buyer does next to what they're looking at — asking a specialist while configuring.

- Header: Mono `title` (heading-sm 20/24), optional `description` (body-sm `text-secondary`), CloseButton. Body scrolls; `footer` stays pinned with a top hairline and holds the panel's one primary button and a short note.
- No scrim by default: the page stays usable, so the buyer can keep checking options while writing. `scrim` turns it into a blocking dialog (then use Modal unless the content is tall).
- 440px wide by default, `shadow-xl`, square corners on the docked edge. On mobile use BottomSheet instead.
- Pair it with EdgeTab to reopen it from anywhere; after closing, move focus back to the trigger.
- The footer's primary is the view's one CTA while the panel is open. The page's own "Add to Cart" stays where it is; don't add a second filled button inside the panel.
- `inline` positions it absolutely inside the nearest positioned ancestor (mockups, embedded previews); otherwise it's fixed to the viewport. Escape closes it.
