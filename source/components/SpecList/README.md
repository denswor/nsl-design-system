# SpecList

Hardware spec lines: icon, Mono key or bold cage label in front of the value.

- Props: `items` = `[{icon, label, text, note}]`, `variant` = `icons` (default) | `text` | `labels`, `max` (lines to show).
- `icons`: ph-* icon from the `icon` key (`form`, `cpu`, `ram`, `storage`, `drives`, `raid`, `network`, `fans`) or any icon name.
- `text`: Mono 12 Light key in a 40px column; the key is `label`, or derived from `icon` (Form, CPU, RAM, Drives, RAID, NIC).
- `labels`: bold Mono label with a dash, for cage specs ("12LFF —"). Labels share one column as wide as the longest label ("12LFF —"), right-aligned, so the dashes and values line up without a staircase. Keep labels short (drive-cage codes), since the longest one sets the column.
- `note` renders in `text-disabled` after the value: "(24 x DDR4)".
