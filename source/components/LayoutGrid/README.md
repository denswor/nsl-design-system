# LayoutGrid

Overlay of the page grid for checking a layout against its columns; a design aid, never shown in production UI.

| Breakpoint | Width | Columns | Gutter | Side margin |
| --- | --- | --- | --- | --- |
| wide | 1680 and wider | `grid-columns` 12 | `gutter` 30 | `grid-margin-wide` 75, `container-wide` 1530 |
| desktop | 1440–1679 | 12 | 30 | `container-desktop` 1170 centered (margin 135 at 1440) |
| tablet | 1024–1439 | 12 | 30 | at least `grid-margin-tablet` 35, fluid up to 1170 |
| tablet-portrait | 720–1023 | `grid-columns-tablet-portrait` 8 | `gutter-tablet-portrait` 24 | `grid-margin-tablet-portrait` 32 |
| mobile | below 720 | `grid-columns-mobile` 4 | `gutter-mobile` 16 | `grid-margin-mobile` 16 |

- `breakpoint="auto"` (default) reads the grid's own width (container query), so inside a 768px preview frame it shows the tablet-portrait grid. Any other value forces that breakpoint.
- Place it as the last child of a positioned parent (`position: relative`); it fills the parent and ignores the pointer. `fixed` pins it to the viewport for a whole page.
- Wire `visible` to a toggle (a "Grid" switch in a toolbar, or a keyboard shortcut) instead of mounting and unmounting it by hand.
- Colors: `layout-grid-fill` for the columns and `layout-grid-line` for their edges, the same in both themes; pass `color` / `lineColor` to change them on a busy background.
- Pages lay out on the same numbers with `.nsl-container`: centered, `container-desktop` wide, with the margins above at each breakpoint. Blocks align to columns: a two-column hero is 6 + 6 from 1024 and 5 + 3 at tablet-portrait.
- Figma has the same grid: the `Grid/…` layout grid styles, bound to the `layout/<breakpoint>/…` variables in Primitives.
