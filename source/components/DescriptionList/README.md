# DescriptionList

Term / value rows for read-only details: a configuration summary, a request's fields, order data.

- Two columns by default: the term in `text-secondary`, the value in `text-primary`, body-sm. `termWidth` sets the term column (136px default).
- `divided` puts a `border-default` hairline between rows — use it for long lists such as a full configuration. `layout="stacked"` puts the term above the value for narrow columns and mobile.
- Each row can carry a `note` under the value (quantity, totals: "2 ea. / 64 GB") and `muted` for "Not chosen yet" values.
- Spec lines inside product cards stay SpecList; comparisons with columns stay Table.
