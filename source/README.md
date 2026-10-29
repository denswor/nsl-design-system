NewServerLife sells refurbished and new server hardware: servers, chassis, storage, components, plus cloud, colocation and ITAD services. Buyers are IT managers and engineers who compare specs line by line. The interface is technical, dense and calm; the brand appears in one place on the screen, where the buyer should act.

## One CTA

- Each view has **one** filled `brand-default` action: the thing the page is for. Product page: "Add to Cart" or "Configure". Configurator: "Add to Cart". Cart: "Go to Checkout". Modal: its confirm button.
- Every other action steps down: `primary-subtle` (outlined, `border-brand-subtle`) for repeated actions in lists (each product card's "Add to Cart"), `ghost` for the secondary choice beside the CTA ("Cancel"), `text` for tertiary.
- Never place two filled brand buttons side by side. If a second action seems just as important, the view needs to be split.
- The header's Catalog button is global chrome and does not count toward the page's CTA.
- Brand color elsewhere marks **state**, never decoration: the active tab, the current page, a checked control, the selected configurator row, focus. Don't tint headings, icons or backgrounds with brand color to "add life".
- The blue `secondary-default` is information, not action: prices, links, the info notification. It does not follow the theme.

## Themes

- Two themes, the same components: `primary` (pink `#b91f69`, the default) and `secondary` (blue `#1d6cbe`). Set `data-theme="secondary"` on any wrapper to switch everything inside it. There are no `Secondary` component copies in code. The Figma file's sibling sets (Tabs, Pagination, Dropdown, Form Field, Configurator Row…) collapse into one component each.
- Surface is a separate axis. Components that sit on the brand gradient or a dark band (Breadcrumbs, top nav, Footer, Dialog close button) read `on-surface-*`. Wrap the dark area in `.nsl-on-dark` and they switch to `on-dark-*` automatically. Never add a `dark` prop to a component.
- Components consume **semantic** tokens only (`brand-*`, `text-*`, `bg-*`, `border-*`, `input-*`, `control-*`, `tag-*`, `icon-*`). Primitives (`primary-500`, `neutral-200`…) exist so semantic tokens can alias them. If no semantic token fits, add one; don't reach for a primitive.

## Color

- Text: `text-primary` (navy `#18304c`) on `bg-default`, `bg-subtle`, `bg-muted`. `text-secondary` for meta, placeholders and captions. `text-disabled` only for disabled labels.
- Surfaces: `bg-default` (white) for page and cards, `bg-subtle` for image wells and bands, `bg-muted` for quiet fills. Hairlines and input borders are `border-default`.
- Prices are `secondary-500` (blue): current price bold, old price struck through in the same blue at body size.
- Status: `status-success|warning|error` are loud and only for icons, filled tags and error borders. Messages on a tint use the paired `tag-*-subtle-bg` + `tag-*-text`, all at least 4.8:1. Warning text on a filled warning tag stays `neutral-700`, never white.
- The brand gradient (`gradient-blue` → `gradient-sky` → `gradient-violet` → `gradient-magenta`, 0/25/75/100%) is used in exactly three places: the header top bar, the footer (under a 50% `black-alpha-50` veil) and the logo. Don't put it on buttons, cards or section backgrounds.
- Known exception: white label on `secondary-hover` is 3.6:1. It's kept as in Figma and flagged in its token note.

## Type

- Two families from Google Fonts: **IBM Plex Mono** (`mono`) for headings and technical labels, **IBM Plex Sans** (`sans`) for body, buttons and forms.
- Headings use `heading-*` (Mono SemiBold, tight tracking). Product names are headings, in Mono: "Dell PowerEdge R6525 10SFF NVMe".
- Body copy is `body-md` (16/24). Specs and secondary copy are `body-sm` (14/20). Dates and captions are `body-xs`.
- Field labels are `label-md`. Filter group titles and tab labels are `heading-xs` (Mono Bold 14).
- Top-nav items and breadcrumbs are `mono-2xs` / `mono-xs`, uppercase.
- Mobile (below 720px) has no separate type scale: dense components step down one size (card title `heading-md` → `heading-sm`, page H1 `heading-2xl` → `heading-lg`, list titles `body-md` → `label-md` (in mixed result lists every title — product, article, page — is the same Mono size and weight), excerpts `body-sm` → `body-xs`).
- Prices: `heading` family at 28/32 Bold for the current price (product card), with "from" / "starting at" in `body-lg`-weight Regular 18.

## Copy

- Interface copy is English, sentence case for buttons and labels ("Add to Cart", "Request for Quote", "Go to Checkout" keep the Title Case the site already uses for CTAs).
- Lead with the hardware: model, form factor, drive bays ("12LFF", "2x 7.68TB SFF 2.5\" (Hot Swap)"). Write units the way buyers write them: `1U`, `768GB 2666MHz`, `2x 6140 2.3GHz = 36 Cores`.
- Prices are USD with a thousands comma: `$6,560`. "from" or "starting at" before a configurable price.
- Badges are short and uppercase: IN STOCK, HOT PRICE, NEW, ON REQUEST, PRECONFIGURED, -40%.
- No emoji, no exclamation marks except in confirmations ("Payment successful. Thank you for your order!").

## Spacing, radius, elevation

- Spacing steps of 4: `space-4` … `space-96`. Cards pad `space-24`; inputs pad `space-16` horizontally; sections sit `space-64` apart.
- Radius: `radius-md` (8) for buttons, inputs, menus, notifications; `radius-sm` (4) at size sm; `radius-full` for tags and badges; `radius-xl` (16) for modals; `radius-xs` (2) for product and model cards.
- Elevation: `shadow-md` for cards, `shadow-lg` for hover and menus, `shadow-xl` for modals. No borders and shadows together on the same card.
- Focus: inputs and buttons show `shadow-focus` (3px `brand-focused` ring) plus a `brand-default` border on inputs.

## Layout

- 12-column grid, 30px gutter: `container-wide` 1530 at 1680, `container-desktop` 1170 at 1440, `container-tablet` 954 at 1024. Mobile: 4 columns, 16px gutter and margins.
- Header is 112px (40px gradient top bar + 72px row). The page body starts on `bg-default`.

## Iconography

- Line icons from the **Feather** set at 1.5px stroke (`icon-stroke-1-5`) in 16/20/24px; 14px icons use 1px. Color via `icon-*` tokens; inside a button or tag the icon takes the text color.
- Hardware specs use the custom **ph-*** set (`ph-cpu`, `ph-memory`, `ph-drives`, `ph-hdd`, `ph-network`, `ph-fan`, `ph-size`, `ph-db`). Header actions use **nsl-*** (`nsl-search`, `nsl-shopping-cart`, `nsl-user`, `nsl-gear`). `flame` marks HOT PRICE.
- In code, use the `Icon` component (`<Icon name="server" size={20}/>`): it carries every icon the components use, drawn with `currentColor`. The SVG files under Assets → Icons are the same icons for design tools, drawn in `text-primary`.

## Components

- Load React 18, then `components/bundle.css` and `components/bundle.js`; everything is on `window.NSL`.
- Sizes are `xl | lg | md | sm`, with `lg` as the default for buttons and inputs, matching Figma.
- Variable-length lists (specs, tags, badges) are arrays in props. The Figma "Show Spec 1-6 / Show Tag 1-8" reserve-slot booleans are a Figma workaround and have no equivalent in code.
- Filled `Button variant="primary"`: one per view (see One CTA).



## Search

- The results page title is the query alone: SearchSummary (`heading-2xl` Mono) with the result count and the spellings the search also matched. Breadcrumbs above it end with "Search results for".
- Search result rows may carry no specs or price (the index may not have them): then SearchResult shows only the button, 176px wide on every row.
- When results can be split by type, show sections in this order: Products (ProductCard grid, "View all" to the filtered catalog), Articles and solutions (ArticleCard), Site pages (SearchResult `kind="page"`). Each section opens with SectionHeader and a count.
- When the engine returns one mixed list ordered by relevance, render every row with SearchResult; its `kind` sets the density (product, article, page) on one shared media column.
- Filters read from the query are FilterChips above the results, removable one by one.
- Rows and cards in results use `primary-subtle` buttons. The page's one filled button, if any, is Apply Filters or the configuration request.
- Query terms in result titles are highlighted in `brand-default`, the same as PredictiveSearch.

## Help requests

- A help request ("Ask a specialist", "Configure assistance") starts with the buyer's own words: a Textarea and a FileAttach for a spec or RFQ come first. Structured questions are optional and sit below, folded into one Disclosure ("Add details to speed things up · Optional").
- Attach context automatically and say so: ContextCard with the current build ("Your current build is attached automatically"), never a field asking the buyer to re-type it.
- Optional details stay short: "Where are you stuck?" as a multiple ChipGroup (preselect the section the request was opened from) and a stepped budget Slider (`stepMarks`, `ticks`, `valueText`) with a "No fixed budget" Tag beside it.
- Contact fields are always visible: Name, Work email, Phone (Input). Channel and timing are single ChipGroups: Phone call / Email / WhatsApp and Today / No rush. No time zone or call-time pickers.
- Desktop: a Drawer opened from an EdgeTab (no scrim, the configurator stays usable) or a Modal with StepProgress for up to three steps. Mobile: a BottomSheet on one screen; two short choices side by side with ChipGroup `fullWidth`.
- The panel's footer holds its one filled button, "Send to a specialist", with a one-line note under it. After sending, the body becomes EmptyState `tone="success"` ("Message sent") and the button steps down to "Back to configuring".
- What the manager receives: the request in a Modal-like card, the configuration as a DescriptionList `divided`, optional details as Tags.

---

## Consuming this system (generated — do not edit)

Every path named below is under `project/` in this design system: read `project/api/tokens.md`, not `api/tokens.md`.

`components/bundle.js` defines `window.NSL` (53 components); `components/bundle.css` is its stylesheet; `tokens.css` is every token as a CSS variable plus `@font-face` for the fonts. `components/bundle.css` reads its variables from `tokens.css`. The bundle needs react 18 (not packed in this system: bring your own copy) (`window.React`), react-dom 18 (not packed in this system: bring your own copy) (`window.ReactDOM`), loaded before it. Build any UI by mounting these components; never hand-build a control or draw an icon the system provides.

- **Standalone page:** inline `tokens.css` and `components/bundle.css` in a `<style>`, then the library files and `components/bundle.js` as classic scripts (a file containing `</style`, `</script` or `<!--` breaks an inline element: write the sequence `<\/style`, `<\/script` or `\x3C!--` in your copy, or load that file by URL).
- **Design canvas:** bring `components/bundle.css`, `components/bundle.js` and `components/index.d.ts` (for the editor’s props panel) onto the canvas in full, as the canvas type’s design-system components reference says (a server-side copy first where it offers one); load the stylesheet before the script; skip the library files (the artboard supplies React); mount with `<x-import component-from-global-scope="NSL.<Comp>" …>`.
- **Slides deck, or any surface that cannot run the bundle:** tokens and fonts — the values are on `api/tokens.md`; the deck takes `tokens.json` by file path for its colour pickers, and fonts as “Fonts” below says.

Fonts: one file per family is enough (below: the upright face nearest regular weight; bold and italic synthesize). Fetch it as the fetch column says (Artifact tool `read`, that id or path as `path`), upload it as an asset (`publish`, `file_path`, `asset:true`) and declare it with an `@font-face { font-family: "<family>"; src: url(<uploaded>) }` rule.

- **Slides deck:** for each family you use in the deck (`faces` holds at most the number of typefaces Slides’ `deck-files.md` gives), install its file with the system and name the path it lands on as that family’s `src` in `project/deck.json` `faces`, under the key in the Slides column. A deck takes a font as a file only under the rule in Slides’ `fonts.md` (no space or leading underscore in its path, for two): any other font, or one kept by id, is uploaded as `fonts.md` says.

| family | file | fetch | CSS | Slides `faces` key |
| --- | --- | --- | --- | --- |
| IBMPlex Mono | `fonts/IBMPlexMono-Regular.ttf` (weight 400) | `read 088f4807c498f78fe0a4736369741f47` |  | `ibmplex-mono` |
| IBMPlex Mono Bold Italic | `fonts/IBMPlexMono-BoldItalic.ttf` (weight 700, italic) | `read 1faec2aebbce4a52c10a112390b041d7` |  | `ibmplex-mono-bold-italic` |
| IBMPlex Mono Extra Light Italic | `fonts/IBMPlexMono-ExtraLightItalic.ttf` (weight 200, italic) | `read f71a30b320f7bad8bdf7340450f09921` |  | `ibmplex-mono-extra-light-italic` |
| IBMPlex Mono Light Italic | `fonts/IBMPlexMono-LightItalic.ttf` (weight 300, italic) | `read 4f8299ef01f15486c2ad99be012e8e3e` |  | `ibmplex-mono-light-italic` |
| IBMPlex Mono Medium Italic | `fonts/IBMPlexMono-MediumItalic.ttf` (weight 500, italic) | `read 19d502991db69cc46446d6928f742420` |  | `ibmplex-mono-medium-italic` |
| IBMPlex Mono Semi Bold Italic | `fonts/IBMPlexMono-SemiBoldItalic.ttf` (weight 600, italic) | `read 545d7b930cae2cfe938add306b50192d` |  | `ibmplex-mono-semi-bold-italic` |
| IBMPlex Mono Thin Italic | `fonts/IBMPlexMono-ThinItalic.ttf` (weight 100, italic) | `read c27cf6c9b361f36d9951b1da19cae8d1` |  | `ibmplex-mono-thin-italic` |
| IBMPlex Sans Condensed | `fonts/IBMPlexSans_Condensed-Regular.ttf` (weight 400) | `read 035110da869e745c9d3d1e55360b23d5` |  | `ibmplex-sans-condensed` |
| IBMPlex Sans | `fonts/IBMPlexSans-Regular.ttf` (weight 400) | `read 4564132fe0fe85bbe176233e47a0d791` |  | `ibmplex-sans` |
| IBMPlex Sans Bold Italic | `fonts/IBMPlexSans-BoldItalic.ttf` (weight 700, italic) | `read f87fa1a3b78cdd6faf3873168216d7f6` |  | `ibmplex-sans-bold-italic` |
| IBMPlex Sans Extra Light Italic | `fonts/IBMPlexSans-ExtraLightItalic.ttf` (weight 200, italic) | `read 229dfaabbdf85b9bc83c7ba0b4498710` |  | `ibmplex-sans-extra-light-italic` |
| IBMPlex Sans Light Italic | `fonts/IBMPlexSans-LightItalic.ttf` (weight 300, italic) | `read a3671b62003c03542c0b56de5458adf0` |  | `ibmplex-sans-light-italic` |
| IBMPlex Sans Medium Italic | `fonts/IBMPlexSans-MediumItalic.ttf` (weight 500, italic) | `read fd3ffbd8531c8b739bd087533a99e46d` |  | `ibmplex-sans-medium-italic` |
| IBMPlex Sans Semi Bold Italic | `fonts/IBMPlexSans-SemiBoldItalic.ttf` (weight 600, italic) | `read f013b7e812f108bf3d2f9ebfb8cb8f0f` |  | `ibmplex-sans-semi-bold-italic` |
| IBMPlex Sans Thin Italic | `fonts/IBMPlexSans-ThinItalic.ttf` (weight 100, italic) | `read 6c349bdda12a4910d297c566d93934a6` |  | `ibmplex-sans-thin-italic` |

**Read, per thing:** a component’s props, parts and examples: `api/components/<Comp>.md`; token values: `api/tokens.md`; stored assets and their paths: `api/assets/<Group>.md`. After this README, fetch the cards and fonts you need in ONE message as parallel calls — none depends on another.

**Two rules.** Before you use a thing — a component, a token group, an icon, an asset — read its card from the index below; a value you did not read from a card is a guess. `tokens.json`, `manifest.json`, `components/index.d.ts` and `design-system.json` are sources for tools: hand them over. `components/<Comp>/README.md` and `assets/<Group>/README.md` are the long-form second read a card links to; `SKILL.md` and `artifact-type/` beside them are authoring guidance, not needed to consume the system.

## Index (generated — do not edit)

**Tokens**

- `api/tokens.md` — Every token: text, fill, border, palette, type, spacing, radius, shadow, layout, icon-stroke. (28.5k)

**Icons and assets**

- `api/assets/Logos.md` — 4 files, by asset id. (1.5k)
- `api/assets/Icons.md` — 68 files, by asset id. (6.3k)
- `api/assets/Social.md` — 4 files, by asset id. (1.1k)

**Components** (`api/components/<Comp>.md`, 53)

- **Foundations**: `Icon` — Line icon from the NSL set, drawn with currentColor · `Logo` — The NewServerLife logotype: gradient mark plus wordmark, or the mark alone
- **Actions**: `Button` — Button for actions; primary is the page's one call to action · `ButtonGroup` — Segmented control: one choice from two to five options that switch a view in place · `CatalogButton` — The header's catalog trigger: gear icon, CATALOG, "Build your server" · `Link` — Inline text link in brand color, solid or dashed underline · `CloseButton` — 32px icon button with an x, used in Modal, Notification and drawers
- **Forms**: `Input` — Text field with label, helper text and error (Figma: Input Label + Input Field + Helper Text = Form Field) · `SearchField` — Site search box: placeholder "Search here...", search icon as the submit button · `Select` — Dropdown select, single or multiple (Figma: Dropdown Trigger + Option Item = Dropdown) · `Checkbox` — Checkbox with label · `Radio` — Radio button with label for one choice in a set · `Toggle` — On/off switch that applies immediately (no Save button) · `CheckboxGroup` — A labelled set of checkboxes; the value is an array · `RadioGroup` — A labelled set of radios; the value is one option · `NumberStepper` — Quantity input with minus / plus buttons · `Slider` — Single value or range slider on a brand track · `PriceRange` — Price filter: from / to inputs joined above a range slider (Figma: Slider Compact Input)
- **Navigation**: `Tabs` — Switches between panels of one page (Overview, Specs, Reviews) · `Pagination` — Page navigation for catalog listings · `Breadcrumbs` — Path to the current page in uppercase Mono, arrow separators · `StatusIndicator` — Live-chat availability dot with label, shown in the header top bar · `HeaderCart` — Header cart link with item count badge · `TopNavItem` — One item of the header's gradient top bar: Mono 12 uppercase, bold with underline when active · `HeaderAccount` — Header account link (user icon, optional label)
- **Layout**: `Header` — Desktop site header: gradient top bar (nav, online status, email, phone) over the main row (logo, Catalog, search, optional badge, account, cart) · `MobileHeader` — 48px mobile header: menu, logo, search, cart · `Footer` — Site footer on the brand gradient under a 50% black veil: top nav, three link columns, the 3HCloud promo, legal row; contacts, logo and socials on the right
- **Display**: `Tag` — Compact label for categories, filters and "suitable for" lists · `ProductBadge` — Availability and promotion badge on product and model cards · `CountBadge` — Small number badge: cart count, "Suitable for (6)" · `Avatar` — Initials or photo in a circle, used in reviews and account · `StarRating` — Read-only star rating in rating-star amber · `Price` — Price block in secondary-500 blue: prefix, current price in Mono Bold, struck old price, unit · `SpecList` — Hardware spec lines with an icon (product card) or a Mono label (cage specs) · `Accordion` — Expandable sections for FAQ, warranty terms and long specs · `Table` — Data table for full specs and comparisons
- **Feedback**: `Notification` — Inline message banner on a tinted background (not a toast) · `Toast` — Floating confirmation after an action ("Added to cart"), white with a status icon · `Tooltip` — Short explanation on hover or focus · `EmptyState` — Shown when a list, search or cart has nothing to show · `Modal` — Dialog over a scrim · `Skeleton` — Loading placeholder with a shimmer (static when reduced motion is on)
- **Media**: `ImageFrame` — Image in a fixed ratio on bg-subtle, with an icon placeholder when there's no image · `ProductGallery` — Main product image with a thumbnail strip
- **Commerce**: `ProductCard` — Catalog card for a server: badges, image, Mono title, spec list, price and a subtle Add to Cart · `ModelCard` — Horizontal card for a server model (chassis) in model listings: image, cage specs, "Suitable for" tags, price and Configure / Request for Quote · `ConfiguratorRow` — One selectable option in the server configurator: selector, name, info, tag, quantity, prices · `CartDropdown` — Mini cart under the header cart icon: items, total, Go to Checkout · `FilterPanel` — Catalog filter sidebar: checkbox groups, price range, Apply Filters · `CartLineItem` — One line in the cart: name, meta, price, remove
- **Content**: `ReviewCard` — Customer review: avatar, name, date, stars, four-line excerpt, Read more · `ArticleCard` — Blog article teaser, with or without an image
