# ModelCard

Horizontal card for a server model in model listings: image | cage specs + "Suitable for" | price and action.

- Props: `title`, `image`, `badges`, `specs` (`[{label,text}]`), `specsTitle` (default "Cage specifications"), `suitableFor` (labels), `price`, `oldPrice`, `available` (`false` shows ON REQUEST and Request for Quote), `onConfigure`, `onQuote`.
- Price column is right-aligned: optional `pricePrefix` (off by default; `true` = "from", or any text such as "Starting at"), the price in Mono Bold, the old price under it in Mono 16, `neutral-400`, struck through.
- `images` (two or more) turns the photo into a mini gallery: arrows and dots appear when the card is hovered or focused (dots stay visible on touch screens). One `image` stays a plain picture.
- "Suitable for" spans the specs and price columns, so the tags wrap less. `suitableTitle` renames it.
- The button is `lg` and keeps its natural width (Configure is narrower than Request for Quote), aligned right under the price; only the `mobile` card stretches it.
- Layout is horizontal: three columns (330px image, specs, price and button sized by their content). It responds to its own width, not the window: under 720px the price column moves under the specs, under 480px everything stacks.
- `mobile` renders the separate mobile card from Figma (stacked, collapsible "Suitable for" with a count). `expanded` opens it.
- 2px `border-brand` bottom rule, `shadow-md`, `radius-xs`.
