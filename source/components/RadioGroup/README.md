# RadioGroup

A labelled set of radios; the value is one option.

- Props: `label`, `options`, `value` / `defaultValue`, `onChange(value)`, `size` = `md` (default) | `sm` (14px labels, 16px controls, tighter rows), `error`, `helper`, `disabled`.
- An option can carry `aside`: a second text pinned to the right edge in `text-secondary`, e.g. colocation sites with "$ 0".
- In forms use `variant="form"` (label-md legend). Two or three short options go side by side with `direction="row"` ("Today · No rush"); on mobile, two RadioGroups can sit in two columns ("Preferred channel" and "How soon?").
