# Icon

Line icon from the NSL set, drawn with `currentColor`. Feather at 1.5px stroke plus the hardware `ph-*` set and header `nsl-*` set.

- Props: `name` (see `NSL.icons` for the list), `size` (default 20; 16/20/24 in UI), `strokeWidth` (default 1.5, 1 at 14px and below), `title` (only when the icon carries meaning alone).
- Color comes from the parent's `color`; use `icon-default`, `icon-brand`, `icon-pale` tokens via CSS.
- Inside Button, Tag, Input, use their `iconLeft` / `iconRight` props instead of placing an Icon yourself.
