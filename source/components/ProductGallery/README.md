# ProductGallery

Main product image with a thumbnail strip.

- Props: `images` (URLs; `null` shows a placeholder), `ratio`, `mobile` (smaller thumbs), `alt`.
- Prev / next arrows on the main image and a "2 / 5" counter make it obvious which way the slides go (`arrows={false}`, `counter={false}` hide them). Arrows wrap around.
- Slides without a photo get a different placeholder icon each (`placeholderIcons`, default server, hard-drive, cpu, layers, grid…), so the thumbs are distinguishable. The active thumb has a brand border and tint.
