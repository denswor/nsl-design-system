# MobileNav

Mobile menu that opens under MobileHeader (pass it as `menu`). White surface, taps open and close each block.

- `brands`: level 1 accordion (DELL EMC, HPE, Other). Mono 18 semibold with a chevron; open = pink title and pink divider. One brand open at a time (`defaultBrand`).
- Inside a brand, `groups`: `kind: 'bestsellers'` (uppercase Sans, product rows with thumbnail, Mono name and small `1U` / `Gen14` tags) or a category such as "Rackmount servers" (Mono with +, opens `subgroups` like "13th Generation" + `Rack` tag with model links). Open group = pink with × and pink divider. Several groups can be open at once.
- `links`: plain Mono links under the accordion (Colocation, Solutions, Warranty… by default).
- `showTabs` (off by default, coming later): Servers / Components switch on top. The Components tab shows `categories` in a 2-column grid with icons.
- `teaser`: `'light'` (default, white between hairlines, secondary-subtle button) | `'dark'` (navy neutral-700, ghost-inverted button) | `false`. 3HCloud promo, shown on the Servers tab only.
- `contacts`: help block with email and phone; `false` hides it.
- No primary button inside the menu, so the page's single CTA rule is not affected.
