# Header

Desktop site header: gradient top bar (nav, online status, email, phone) over the main row (logo, Catalog, search, SAM registered, account, cart).

- One panel open at a time, `open` / `defaultOpen` / `onOpenChange` = `'catalog' | 'search' | 'cart' | null`. Esc or a click outside the header closes it.
  - **Catalog**: the button toggles CatalogMenu under the header (`catalog` for custom data; defaults to the site's server catalog).
  - **Search**: typing shows PredictiveSearch under the field (`searchSuggestions` = groups, or a function of the query; `minQuery`, `allResults`). Enter calls `onSearch` and closes it.
  - **Cart**: "Your Cart" opens CartDropdown under it (`cartItems`, `cartTotal`, `onCheckout`); `cartCount` drives the badge.
- SamRegistered sits after the search, shortening to "SAM" + hat below 1280px (`sam={false}` hides it, an object sets `href` / `label` / `compact`). `badge` still adds any extra node before the actions.
- Cloud in the top bar opens CloudDropdown on hover (`cloudMenu`).
- Other props: `nav`, `active`, `email`, `phone`, `online` (false hides the status entirely), `onCatalog`, `searchValue` / `defaultQuery`, `searchPlaceholder`, `accountHref`.
- 112px tall, full width. Below 1024px render MobileHeader instead.
