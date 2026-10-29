# ChipGroup

A labelled set of selectable pills for picking one or several short options in a form.

- Built on Tag (`outline`, size `lg` 36px or `md` 32px). Unselected: `bg-default`, `border-default`, `text-primary`. Selected: `brand-default` fill with `text-on-brand` — brand marks state here, which the One CTA rule allows.
- `multiple` for "pick any" (selected chips get a check icon, the value is an array); without it one value (or `null`), and `deselectable` lets the buyer clear it.
- Use chips when options are short, few (2–8) and scanning matters more than reading: "Where are you stuck?", preferred channel, "How soon?". Use CheckboxGroup / RadioGroup when labels are long, need descriptions, or the form is printed or dense.
- Use ButtonGroup (segmented) only to switch a view in place; a form answer is a ChipGroup.
- `fullWidth` stretches the chips to share one row: two or three options side by side on mobile.
- The group is a `<fieldset>` with the label as `<legend>`; each chip is a button with `aria-pressed`.
