# DescriptionList

Term / value rows for read-only details: a configuration summary, a request's fields, order data.

- `layout`: `inline` puts the term and value in a row (term in `text-secondary`, value in `text-primary`, body-sm; `termWidth` sets the term column, 136px default); `stacked` puts the term above the value; `auto` (default) is inline on desktop and stacked below 720px. `columns` still works as an alias of `inline`.
- `divided` puts a `border-default` hairline between rows — use it for long lists such as a full configuration. Force `stacked` in narrow columns on desktop too.
- Each row can carry a `note` under the value (quantity, totals: "2 ea. / 64 GB") and `muted` for "Not chosen yet" values.
- Spec lines inside product cards stay SpecList; comparisons with columns stay Table.
