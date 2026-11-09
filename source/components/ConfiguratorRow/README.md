# ConfiguratorRow

One selectable option in the server configurator: selector, name, info, tag, quantity, prices.

- Props: `label`, `selector` = `checkbox` | `radio`, `name` (radio group), `selected` / `defaultSelected`, `onSelect`, `info` (tooltip text), `tag` ("SALE"), `price`, `oldPrice`, `unit`, `quantity` / `defaultQuantity`, `onQuantityChange`, `stepper` (`false` hides it), `error` (incompatible choice: red tint, warning icon right after the stepper with a tooltip; pass a string for the reason, or `errorText`), `mobile` (phone layout, see below).
- Selected row fills with `brand-default`: this is state, not a second CTA.

- On the selected row the tag turns white with brand text so it doesn't merge with the fill; on an error row it turns red.
- The whole row is the hit area: clicking anywhere on it (empty space, price) selects a radio row or toggles a checkbox row. The stepper, tooltips and links inside keep their own clicks. Hover tints the row with `brand-subtle` (a selected row steps to `brand-hover`), so it's clear before the click what will be picked.
- The price column has a minimum width of 6ch (fits "$9,999") with tabular figures, so steppers line up from row to row whatever the price. Rows with an old price still shift by its width.
- `mobile`: a row without a quantity stays on one line, the name wraps and the price keeps to the right. When the stepper shows (selected, `stepper` not `false`), the stepper and price move to a second line: the stepper lines up under the name, the price stays on the right.
- Option name: 14/20 on desktop, 12/16 in the `mobile` layout.
