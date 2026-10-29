# ModelCard

Horizontal card for a server model in model listings: image | cage specs + "Suitable for" | price and action.

- Props: `title`, `image`, `badges`, `specs` (`[{label,text}]`), `specsTitle` (default "Cage specifications"), `suitableFor` (labels), `price`, `oldPrice`, `available` (`false` shows ON REQUEST and Request for Quote), `onConfigure`, `onQuote`.
- Layout is horizontal: three columns (330px image, specs, 192px price and button). It responds to its own width, not the window: under 720px the price column moves under the specs, under 480px everything stacks.
- `mobile` renders the separate mobile card from Figma (stacked, collapsible "Suitable for" with a count). `expanded` opens it.
- 2px `border-brand` bottom rule, `shadow-md`, `radius-xs`.
