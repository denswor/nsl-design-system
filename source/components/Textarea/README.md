# Textarea

Multi-line text field for messages and descriptions, the Input box grown to several lines.

- Same anatomy as Input: `label` (label-md), the box, `helper` or `error` under it. `optional` adds "(optional)" to the label; `required` adds the brand asterisk.
- Use it where the buyer explains something in their own words: "Describe what you need" in a help request, notes to a quote. For a single value (name, email, PO number) use Input.
- Start at `rows` 5–6 so the box reads as "write freely"; it grows by the user's resize handle, not automatically.
- Placeholder is an example of tone, not instructions: "In your own words — what are you building, and where are you stuck?". Put the reassurance in `helper`: "Plain language is perfect — no exact specs needed."
- `counter` shows a Mono count bottom-right; with `maxLength` it reads "120 / 2000". Show it only when a limit exists.
- States follow Input: hover `border-strong`, focus `input-border-focus` 1.5px + `shadow-focus`, error border + `helper-error`, disabled `input-bg-disabled`.
- Sizes `lg` (16/24, default), `md`, `sm` (14/20, `radius-sm`).
