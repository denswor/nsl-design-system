# SearchResult

One row of the site search results list: a product (chassis, model, preconfigured server, part), a blog article or a site page, each with the density it needs.

**Settings (props)**
- `kind` = `product` (default) | `article` | `page`. The row picks its layout from it; the list keeps one order (relevance) and mixed kinds still line up on the same 160px media column.
- Common: `title`, `href`, `query` (each term of the query longer than one character is highlighted in the title), `excerpt`.
- Product: `typeLabel` (CHASSIS, SERVER MODEL, PRECONFIGURED, COMPONENT), `badges` (ProductBadge types), `specs` (SpecItem[], icons, two columns), `maxSpecs` (default 4), `price`, `oldPrice`, `pricePrefix` (default "from"), `availability` (a short line under the price: "Ships tomorrow"), `ctaType` = `cart` | `configure` | `quote`, `ctaVariant` (default `primary-subtle`), `cta`, `ctaIcon`, `onAction`, `image`.
- Article: `typeLabel` (default "Blog"; "Solution" for solution pages), `meta` ("7 min read"), `excerpt`, `image`.
- Page: `breadcrumbs` (strings or `{label, href}`, shown as a quiet path under the excerpt: `body-xs`, `text-secondary`, "/" separators — not the Breadcrumbs component, which is page navigation), `excerpt`, `icon` (default `info`). On mobile the icon sits at the right edge of the 96px media column, against the text, so page text lines up with the other rows. The title is a `text-link` blue link: these rows are information, not products; query terms in it are underlined instead of brand-coloured.
- Titles of every kind share one style: Mono `heading-md` (20/24 SemiBold) on desktop, Mono 14/20 SemiBold on mobile. Kind shows through the type label, media and colour, not the typeface.

**Rules**
- Use it when the search engine returns one mixed list ordered by relevance (Bitrix `search.page`). When results can be split by type, use ProductCard grids, ArticleCard and SearchResult `kind="page"` in separate sections under SectionHeader instead.
- Rows sit in one container on `bg-default`, separated by the row's own `border-default` hairline. No card shadows inside the list.
- The row button is `primary-subtle`: a results list has many rows and none of them is the page's one CTA.
- Product photos are cut-outs on white (front view, the whole chassis): they sit on the row's white ground with no grey well and are fitted whole (`object-fit: contain`), never cropped. Article covers are atmospheric photos: they fill the 3:2 frame (`object-fit: cover`) and may be cropped. Without a picture the `bg-subtle` well with an icon stays.
- Product rows: 3-4 spec lines that tell models apart in this query (form factor, bays, sockets), not the full spec sheet.
- Button only: leave out `price` and `availability` (and `specs` when the search index has none) and the row keeps just the button, a fixed 176px wide (the width of "Choose Chassis", the longest label) and centred vertically, so every row's button lines up.
- Below 720px (mobile) the row steps down one type size, the same step ProductCard `compact` and SearchSummary take: every title is Mono 14/20 SemiBold (`label-md` size, weight 600); excerpt `body-xs`. The media column narrows to 96px and the price and button move under the text, in the text column, never under the image; a button-only row keeps its 176px button there.
