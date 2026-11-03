# ButtonGroup

Segmented control: one choice from two to five options that switch a view in place.

- Props: `items` = `[{label, value?, icon?, disabled?}]`, `value` / `defaultValue`, `onChange(value)`, `size` = `lg` | `md` | `sm`, `icons` (default `true`; `false` hides item icons without changing the items array).
- Use for view switches (Grid / List, Monthly / Yearly). For navigation between content panels use Tabs; for filters with many options use CheckboxGroup.
