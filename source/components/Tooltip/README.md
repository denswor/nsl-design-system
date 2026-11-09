# Tooltip

Short hint on hover or keyboard focus (tap on the default info icon). Text only, no actions.

- `content` (one or two sentences), optional `title` (bold first line).
- `placement` = `top` (default) | `bottom` | `left` | `right`; `align` = `start` | `center` | `end` for top/bottom, so the bubble stays inside the page near an edge.
- `tone` = `dark` (default, neutral-700) | `light` (white with a hairline border, for busy areas).
- `arrow` (default true), `maxWidth` (default 260px), `delay` (hover delay, default 120ms), `open` to force it.
- `children` is the trigger; without it an info icon button is rendered (`icon`, `label` override it). Esc closes it.
- Never put essential information or anything clickable in a tooltip. Use Popover for that.
- The bubble never leaves the screen: near an edge it shifts sideways (at most 260px wide, narrower on small screens) and the arrow keeps pointing at the trigger.
