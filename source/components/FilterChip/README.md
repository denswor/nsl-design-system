# FilterChip

An applied filter shown above a listing, removable with its x button.

- Props: `label` (the filter name, `text-secondary`: "Model"), `value` or children ("DL380 Gen10"), `onRemove`.
- Show every applied filter as a chip in one row above the results, then a `text` Button "Clear all". Filters taken from the query itself ("dl380 8x nvme" → Model: DL380 Gen10, NVMe bays: 8) are chips too, so the buyer can drop a wrong guess in one click.
- `bg-muted` pill, `label-sm`, 32px tall; the x button is 24px with the `shadow-focus` ring. Not brand-coloured: a chip is state the buyer set, not an action.
- For a toggleable option (on/off), use Tag with `onClick` and `selected` instead.
