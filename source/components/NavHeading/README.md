# NavHeading

Generation heading inside catalog navigation ("14th Generation" + `Rackmount`). Used by CatalogMenu columns and MobileNav subgroups (Figma: Column Heading New).

- 40px row, IBM Plex Mono Bold 14/24, hairline under it; small chip on the right (`tag`).
- `href` makes it a link: on hover the title turns brand pink and the hairline turns light pink.
- Props: `title` (or children), `tag`, `href`, `as` (`div` by default; `h3` / `h4` for document outline), `className`.
