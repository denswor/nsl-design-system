# LayoutGrid

Overlay of the page grid for checking a layout against its columns; a design aid, never shown in production UI.

- Columns by width: 12 columns, `gutter` 30 at 1024 and wider (`container-desktop` 1170, at least `grid-margin-desktop` 35 at the sides; `container-wide` 1530 with `grid-margin-wide` 75 from 1680); 8 columns, `gutter-tablet` 24, `grid-margin-tablet` 32 at 720–1023; 4 columns, `gutter-mobile` 16, `grid-margin-mobile` 16 below 720.
- The breakpoint comes from the grid's own width (container query), so inside a 768px preview frame it shows the tablet grid. `breakpoint="desktop" | "tablet" | "mobile"` forces one.
- Place it as the last child of a positioned parent (`position: relative`); it fills the parent and ignores the pointer. `fixed` pins it to the viewport for a whole page.
- Wire `visible` to a toggle (a "Grid" switch in a toolbar, or a keyboard shortcut) instead of mounting and unmounting it by hand.
- Colors: `layout-grid-fill` for the columns and `layout-grid-line` for their edges, the same in both themes; pass `color` / `lineColor` to change them on a busy background.
- Pages lay out on the same numbers with `.nsl-container`: centered, `container-desktop` wide, with the margins above at each breakpoint. Blocks align to columns: a two-column hero is 6 + 6 on desktop and 5 + 3 on tablet.
