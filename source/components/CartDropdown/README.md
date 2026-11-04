# CartDropdown

Mini cart under the header cart icon: items, total, Go to Checkout. Empty cart shows an EmptyState.

- Props: `items` (CartLineItem props), `total` (default: sum of numeric prices), `onCheckout`.
- `arrow` adds a notch pointing at the trigger: `true` / `'end'` (right edge), `'start'`, `'center'`; `arrowOffset` sets the tip's distance from that edge (24px default). Header measures it so the arrow points at the cart icon.
- No "Clear cart" action, by design.
