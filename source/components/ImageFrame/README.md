# ImageFrame

Image in a fixed ratio on `bg-subtle`, with an icon placeholder when there's no image.

- Props: `src`, `alt`, `ratio` = `1:1` | `4:3` (default) | `3:2` | `16:9` | `21:9`, `placeholderIcon`.
- Product photos are `object-fit: contain` on the subtle background, never cropped.
