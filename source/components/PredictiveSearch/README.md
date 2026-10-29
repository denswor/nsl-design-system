# PredictiveSearch

Suggestion panel under SearchField while the user types: results grouped by category, the typed text highlighted in brand color.

- Props: `query` (the typed text; every match is highlighted), `groups` = `[{title, items: [string | {label, href, active}], more: {label, href}}]`, `allResults` (`{label, href}`; `false` hides the row).
- Place it in `.nsl-search-combo` together with SearchField: the panel then drops below the field at full width (630px max).
- Categories in the order users search: Server models, Chassis, Storages, Articles. 2-4 items per group, then "Show all chassis (13)" as `more`.
- Category labels and meta links are `text-disabled` (#9ca3af, 2.5:1 on white), kept exact from Figma; this is below the 4.5:1 text minimum, consider `text-secondary`.
