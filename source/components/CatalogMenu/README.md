# CatalogMenu

Desktop mega menu that opens under the header when Catalog is clicked (Figma: Navigation Update / Dropdown Frame v3).

- Brand tabs on top: logo (DELL EMC, HPE) over a Mono label; the active brand is pink with a 2px underline.
- Category chips (Rackmount, NVMe, AMD based, Tower, Blade): the active one is filled brand, the rest outlined. Hidden when the brand has one category.
- Four columns of blocks: Mono heading with a tag on the right over a hairline, then model links with small tags (`1U`, `2U AMD`).
- "All DELL Rackmount Servers" link with a circled arrow, then the contacts row (help icon, "Have any questions? Get in touch.", email, phone) over a blue hairline.
- Props: `brands` (defaults to the site's server catalog), `brand` / `defaultBrand` / `onBrandChange`, `contacts={false}`, `email`, `phone`. Data: `{ title, logo?: 'dell' | 'hpe', categories: [{ title, all?: {label, href}, columns: [[{ title, tag, items: [[name, tag] | {name, tag, href}] }]] }] }`.
- Header renders it; use it directly only for a custom header.
