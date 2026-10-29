# BottomSheet

A mobile sheet that slides up over a scrim, for short tasks that shouldn't leave the page: a help request, filters, a quick choice.

- Grabber (36×4, `border-strong`), a head with Mono `title` and CloseButton, a scrolling body and a pinned `footer` for the one primary button.
- Top corners `radius-xl`, `shadow-xl`, the page behind under `overlay-scrim`; tapping the scrim or the close button calls `onClose`.
- Keep it to one screen: optional fields go in a Disclosure, choices in ChipGroup with `fullWidth` (two short options side by side).
- `maxHeight` caps it (default: full height minus 24px), `fullHeight` pins it to the top. `inline` positions it inside the nearest positioned ancestor for mockups; otherwise it's fixed.
- On desktop, the same content lives in a Drawer or a Modal.
