# Toast

Floating confirmation after an action ("Added to cart"), white with a status icon. Intentional addition from the Figma roadmap (Toast).

- Props: `type` = `success` | `info` | `warning` | `error` | `default`, `title`, `children`, `action` (a text Button), `onClose`.
- Place bottom-right on desktop, bottom full-width on mobile; auto-hide after 5s unless it has an action.
