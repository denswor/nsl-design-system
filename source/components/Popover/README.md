# Popover

Small panel that opens on click next to its trigger. Can hold a title, rich text, links, a short form or a confirmation.

- `children` is the trigger (usually a Button); it gets `aria-expanded` and toggles the panel.
- `title`, `icon`, `content`, `actions`. `content` and `actions` can be functions that receive `close()` (for Cancel / Send buttons).
- `closable` shows the × button; on by default when there is a title.
- `placement` = `top` | `bottom` | `left` | `right`, `align` = `start` | `center` | `end`, `arrow` (default true), `width` (default 320).
- `open` / `defaultOpen` / `onOpenChange` for controlled or uncontrolled use.
- Closes on Esc (focus goes back to the trigger), on outside click and on ×. Focus moves into the panel on open (`autoFocus={false}` turns it off).
- Tooltip vs Popover: Tooltip is a short hint on hover with no interaction; Popover is opened on purpose and can contain links, buttons and inputs.
- One CTA: actions inside a popover use `secondary` or `text` buttons, never the filled primary.
