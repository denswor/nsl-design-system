# Modal

Dialog over a scrim. Types: `standard`, `confirmation` (status icon, centered), `promo-message` (gradient art panel), `promo-form`, `sidebar`.

- Props: `open`, `onClose` (Esc and scrim click close), `title`, `children` (body), `actions` (Buttons, right-aligned), `type`, `size` = `sm` (400) | `md` (560) | `lg` (720), `status` = `success` | `warning` | `error` (confirmation), `illustration` (icon name for promo), `inline` (render without overlay, for docs).
- Actions: the confirm button is the modal's one `primary`; Cancel is `ghost`. Order: Cancel, Confirm.
- Title in Mono, body in `text-secondary`.
