# Input

Text field with label, helper text and error (Figma: Input Label + Input Field + Helper Text = Form Field).

- Props: `label`, `required` (adds a brand asterisk), `optional`, `helper`, `error` (string or `true`), `size` = `lg` (56, default) | `md` (40) | `sm` (32), `iconLeft`, `iconRight`, plus any native input props (`type`, `placeholder`, `value`, `onChange`, `disabled`). `onValueChange(value)` is a shortcut.
- Label is always visible; never use the placeholder as the label.
- Error text says what to fix: "Enter a valid email address", not "Invalid input".
- Use `md` in dense forms and modals, `sm` in filters and configurator side panels.
