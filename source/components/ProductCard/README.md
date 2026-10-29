# ProductCard

Catalog card for a server or part: badges, image, Mono title, specs, price and one action button.

**Settings (props)**
- Badges: `badges` = any of `in-stock` | `new` | `hot` | `on-request` | `prebuild` (empty array or omitted hides the row); `discount` = text for the right pill ("-40%").
- Specs: `specs` = `[{icon, label?, text, note?}]`; `maxSpecs` = how many lines to show (default 6, `0` hides specs); `specVariant` = `icons` (default, ph-* icon per line) | `text` (Mono key on the left: Form, CPU, RAM, Drives, RAID, NIC; or your own `label`).
- Button: `ctaType` = `cart` (Add to Cart, default) | `configure` (Configure, gear) | `quote` (Request for Quote, mail); `ctaVariant` = `primary-subtle` (default) | `primary` | `ghost` | `secondary`; `cta` / `ctaIcon` override text and icon; `onAction` click handler.
- Price: `price`, `oldPrice`, `pricePrefix` (default "from"; `""` hides it). A string price ("On request") is shown as is.
- Layout: `image`, `showImage={false}` (parts without photos), `compact` (md button, tighter gaps, for parts and accessories), `title`, `href`.

**Rules**
- Default button is `primary-subtle`: outlined at rest, fills with `brand-default` on hover. A grid of cards stays calm and the card under the cursor gets the CTA. Card hover also turns the button border to `brand-default`.
- Use `ctaVariant="primary"` only when the card is alone on the screen (a featured product), never in a grid.
- `specVariant="text"` for parts and listings where icons don't help (NICs, drives, RAID cards); `icons` for servers.
- Keep 3-6 spec lines; long values wrap.
