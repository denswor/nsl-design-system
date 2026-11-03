# Slider

Single value or range slider on a brand track.

- Props: `min`, `max`, `step`, `value` / `defaultValue` (a number, or `[low, high]` for a range), `onChange`, `steps` (number of equal segments with a dot at each boundary; `true` = 4), `snap` (thumbs jump between those dots instead of moving by `step`), `valueLabel` (min/max under the track), `format(v)` for those labels, `disabled`.
- Pair with inputs (PriceRange) when the exact value matters.
