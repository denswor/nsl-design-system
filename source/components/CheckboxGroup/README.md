# CheckboxGroup

A labelled set of checkboxes; the value is an array.

- Props: `label` (Mono Bold legend), `options` (strings or `{value,label,disabled}`), `value` / `defaultValue`, `onChange(array)`, `size`, `error` (string shows under the set), `helper`, `disabled`.
- `variant="form"` turns the legend into a field label (label-md, `label-default`) for questions inside a form ("Where are you stuck?"); the default Mono Bold legend stays for filter panels. `hint` adds a short note after the legend ("Select all that apply").
- `columns={2}` lays short options in two equal columns, so eight problem areas fit a 392px panel without a long list. `direction="row"` puts two or three options side by side.
- Prefer ChipGroup when the options are few, short and should feel lightweight; use CheckboxGroup when the form should read as a plain questionnaire or labels are long.
