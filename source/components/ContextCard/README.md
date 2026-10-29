# ContextCard

A quiet card that shows what the system attaches for the buyer: the current build, an order, a quote.

- `bg-subtle`, `radius-md`, no border or shadow. A 20px `icon-default` icon (`server` for a build, `package` for an order, `file-text` for a quote), then `eyebrow` (body-xs `text-secondary`), the Mono `title` and a `meta` line.
- Write the eyebrow as reassurance ("Your current build is attached automatically") and the title as the thing itself ("PowerEdge R760 24SFF · 7 of 11 sections set"). Meta lists what's missing ("Not chosen yet: Storage drives (24 SFF cage)").
- `action` adds a `text` Button or a Link on the right ("View", "Open build"). Keep it optional: the card informs, it isn't a CTA.
- Not for uploads (that's FileAttach) and not for alerts (that's Notification).
