# Tabs

Switches between panels of one page (Overview, Specs, Reviews).

- Props: `items` (strings or `{label, value?, icon?, count?, disabled?}`), `value` / `defaultValue`, `onChange`, `variant` = `underline` (default) | `pill`.
- Labels are Mono Bold 14. Active tab is `brand-default`.
- `underline` for page sections; `pill` for compact switches inside a card.
- `count` shows a number after the label in `text-secondary` (the active tab's count takes the brand colour): search result types "Products 34", review counts.
