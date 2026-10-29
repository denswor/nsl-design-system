# FileAttach

Attach files to a form: a dashed drop zone that becomes a list of attached files, each removable.

- The zone is a `<label>` for a hidden file input: click, keyboard (Tab + Enter/Space) and drag-and-drop all work. Focus shows the solid `input-border-focus` border and `shadow-focus`.
- `title` says what to attach in the buyer's words ("Attach a spec, RFQ or screenshot"); `hint` lists formats and that it's optional ("PDF, Excel, Word or images · optional").
- One file by default: once attached, the zone is replaced by the file row. `multiple` keeps the zone under the list.
- A file row shows the paperclip, the name (label-sm semibold, truncated), meta (`PDF · 240 KB`, filled in from the file) plus `readyLabel` ("ready to send"), and a CloseButton labelled "Remove <name>".
- Controlled with `files` + `onChange(files)`; each item is `{ name, meta?, file? }`. Uncontrolled with `defaultFiles`.
- The zone is `bg-subtle` with a `control-border-default` dashed border; hover and drag-over turn the border `brand-default` (state). No brand fill, no filled button inside: the form's one CTA stays the submit.
