# EdgeTab

A vertical tab pinned to the edge of the viewport that opens a Drawer, for help that should be one click away on every screen.

- White tab (`bg-default`, `border-default`, `shadow-lg`) with a vertical label in label-md semibold and a brand icon. It's not filled with brand: the page's one CTA stays "Add to Cart".
- `tone="brand"` fills the tab with `brand-default` (white label and icon) so it stands out on the right edge; `tone="secondary"` fills it with the blue. A filled brand tab competes with the page's one CTA: use it on pages without a filled primary button (content, solutions, catalog listings), keep the white tab on product and configurator pages.
- Closed, the icon is `help-circle` (or `icon`); open, it turns into a chevron pointing at the panel and the tab sits flush against the Drawer's edge.
- Keep the label short and in the buyer's words: "Ask a specialist".
- Desktop only. On mobile, open the same flow from a contextual button or the sticky bar into a BottomSheet.
- `aria-expanded` follows `open`; pass `controls` with the Drawer's `id`.
