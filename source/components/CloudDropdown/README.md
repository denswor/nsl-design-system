# CloudDropdown

The 3HCloud promo that opens under the Cloud item of the header top bar on hover (Figma: Cloud Dropdown).

- 272px white card (`border-default`, `shadow-md`, `radius-md`): 3HCloud logo, then indented by 40px a semibold title, a body-xs line and a `secondary-subtle` sm "Get started" button.
- Props: `title`, `text`, `cta`, `href`.
- Header renders it under Cloud automatically; `cloudMenu={false}` turns it off, an object overrides the texts. In a custom top bar pass it as `menu` to TopNavItem.
