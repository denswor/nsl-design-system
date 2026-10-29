# ConfiguratorRow

One selectable option in the server configurator: selector, name, info, tag, quantity, prices.

- Props: `label`, `selector` = `checkbox` | `radio`, `name` (radio group), `selected` / `defaultSelected`, `onSelect`, `info` (tooltip text), `tag` ("SALE"), `price`, `oldPrice`, `unit`, `quantity` / `defaultQuantity`, `onQuantityChange`, `stepper` (`false` hides it), `error` (incompatible choice: red tint, warning icon), `mobile` (stacked).
- Selected row fills with `brand-default`: this is state, not a second CTA.
