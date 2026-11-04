# FilterPanel

Catalog filter sidebar: checkbox groups, price range, Apply Filters.

- Props: `groups` = `[{title, options, selected}]`, `price` (`[min, max]`), `onApply`, `size` = `md` (default) | `sm` (dense: 14px options, 32px price inputs, sm Apply button, 240px wide), `applyLabel`, `onApply={false}` hides the button for live filtering.
- 270px wide. Apply Filters is filled because on mobile the panel is its own view; on desktop with live filtering, drop the button.
