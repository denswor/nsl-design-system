# FilterPanel

Catalog filter sidebar: checkbox groups, price range, Apply Filters.

- Props: `groups` = `[{title, options, selected}]`, `price` (`[min, max]`), `onApply`, `size` (`md` default; `sm` for the dense variant).
- 270px wide. Apply Filters is filled because on mobile the panel is its own view; on desktop with live filtering, drop the button.
