# NavModelLink

Model link inside catalog navigation: name, size tag and optional promo chips (Figma: Nav Level Last New). Used by CatalogMenu and MobileNav.

- Name: IBM Plex Sans 14/16, text-primary; hover or `active` = secondary blue with underline.
- `tag` / `tags`: small outlined chips (`1U`, `2U`, `2U AMD`).
- `sale`: red outline chip, "Sale" by default (pass a string for other text).
- `discount`: pink chip; a number renders as `-15%`.
- Optional price group: `oldPrice` (struck through), "from" (`priceLabel`, `false` hides it), `price`. Numbers are formatted as `$1,290`.
- Props: `name` (or children), `href`, `tag`, `tags`, `sale`, `discount`, `price`, `oldPrice`, `priceLabel`, `active`, `onClick`, `className`.
- Data in CatalogMenu / MobileNav accepts the same fields: `{ name, tag, sale: true }` or the short form `['DELL PowerEdge R640', '1U', { sale: true }]`.
