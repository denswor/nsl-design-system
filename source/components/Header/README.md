# Header

Desktop site header: gradient top bar (nav, online status, email, phone) over the main row (logo, Catalog, search, SAM registered, account, cart).

- One panel open at a time, `open` / `defaultOpen` / `onOpenChange` = `'catalog' | 'search' | 'cart' | null`. Esc or a click outside the header closes it.
  - **Catalog**: the button toggles CatalogMenu under the header (`catalog` for custom data; defaults to the site's server catalog). `catalogBestsellers={false}` hides the bestsellers strip.
  - **Search**: typing shows PredictiveSearch under the field (`searchSuggestions` = groups, or a function of the query; `minQuery`, `allResults`). Enter calls `onSearch` and closes it.
  - **Cart**: "Your Cart" opens CartDropdown under it (`cartItems`, `cartTotal`, `onCheckout`); `cartCount` drives the badge.
- SamRegistered sits after the search, shortening to "SAM" + hat when the header itself is narrower than 1280px (container query) (`sam={false}` hides it, an object sets `href` / `label` / `compact`). `badge` still adds any extra node before the actions.
- Top bar nav (TopNav): items that don't fit next to the contacts collapse, from the end, into a "…" item with a dropdown; it re-measures on resize. If the active page is hidden there, "…" is marked active.
- Cloud in the top bar opens CloudDropdown on hover (`cloudMenu`).
- Search suggestions are not tied to the input width: at least 640px (up to 760px), and shifted left if they would leave the viewport.
- Other props: `nav`, `active`, `email`, `phone`, `online` (false hides the status entirely), `onCatalog`, `searchValue` / `defaultQuery`, `searchPlaceholder`, `accountHref`.
- 112px tall, full width. Below 1024px render MobileHeader instead.
