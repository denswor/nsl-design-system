# Button

Button for actions; `primary` is the page's one call to action.

- Props: `variant` = `primary` | `secondary` | `ghost` | `primary-subtle` | `secondary-subtle` | `text` | `primary-inverted` | `primary-ghost-inverted` | `secondary-inverted` | `secondary-ghost-inverted`; `size` = `xl` | `lg` (default) | `md` | `sm`; `iconLeft`, `iconRight` (icon names); `fullWidth`; `href` renders a link; `disabled`. Label goes in `children`; no children makes an icon-only square button (give it `aria-label`).
- One `primary` per view. Repeated actions in lists (product card "Add to Cart") are `primary-subtle`; the alternative next to the CTA ("Cancel") is `ghost`; tertiary is `text`.
- `*-inverted` variants are for the brand gradient and dark bands only.
- `secondary` (blue) is not a second CTA color: use it for info flows (e.g. "Request for Quote" on blue themed pages).
- Sizes: xl 80, lg 56, md 40, sm 32 px tall. Use md inside cards, modals, dropdowns; lg on product pages; xl for hero CTAs.
