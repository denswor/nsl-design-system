# MobileHeader

48px mobile header: menu and logo on the left, search and cart cells on the right. Opens one panel at a time below itself.

- `tone` = `dark` (default, brand gradient, white logo) | `light` (white, color logo, hairline dividers). Layout and control positions are the same in both.
- Panels: `defaultOpen` / `open` + `onOpenChange` = `'menu' | 'search' | 'cart' | null`. The active cell shows × and a tinted background; tapping again closes it.
  - `menu`: renders the node you pass in `menu` (normally MobileNav).
  - `search`: white band with SearchField in both tones (`searchPlaceholder`, `onSubmitSearch`, optional `searchSuggestions` node, e.g. PredictiveSearch).
  - `cart`: CartDropdown full width (`cartItems`, `cartTotal`, `onCheckout`).
- `cartCount` shows the CountBadge on the cart icon (hidden while the cart is open). `onMenu`, `onSearch` fire on taps.
- Use under 1024px instead of Header.
