# SearchSummary

Title block of the search results page: the query as the H1, the result count, and the spellings the search also matched.

- Props: `query`, `count`, `label` (optional eyebrow above the query; off by default — "Search results for" lives in Breadcrumbs as the last item), `variants` (spellings the engine normalized, shown as Mono chips: "8х NVMe", "8nvme"), `variantsLabel` (default "Also matched"), `correctedFrom` + `correctedHref` ("Showing results for X. Search instead for Y"), `children` (right side: sort Select, In stock Toggle).
- The query is `heading-2xl` Mono in quotes: it is the page title. The count is `heading-md` in `text-secondary`.
- Show `variants` only when normalization changed something (Cyrillic look-alike letters, joined tokens): it tells the buyer why a result without their exact spelling is there.
- One per page, at the top of the content, under Breadcrumbs. The H1 is the query alone; the breadcrumb trail ends with "Search results for" (Home → Search results for).
