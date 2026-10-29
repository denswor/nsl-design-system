# Header

Desktop site header: gradient top bar (nav, online status, email, phone) over the main row (logo, Catalog, search, optional badge, account, cart).

- Props: `nav` (labels), `active`, `cartCount`, `email`, `phone`, `online`, `catalogOpen`, `onCatalog`, `onSearch`, `searchValue` (the current query, shown in the search field on the search results page), `badge` (a node placed before the actions, e.g. the "SAM approved" badge).
- 112px tall, full width. Below 1024px render MobileHeader instead.
