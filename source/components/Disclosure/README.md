# Disclosure

One collapsible section of a form for optional extras, closed by default, with a one-line summary of what's inside.

- The head is a full-width button: Mono title ("Add details to speed things up"), a `body-xs` description, an optional `badge` ("Optional", Mono xs `text-secondary`) and a chevron that turns when open.
- Closed, the head sits on `bg-subtle` inside a `border-default` card; open, the panel below holds the fields, `space-24` apart.
- Rewrite `description` to reflect what's already filled ("Already noted: Storage & RAID · tap to add budget"), so a closed section still tells the buyer where things stand.
- For FAQ-like lists of several sections use Accordion. Disclosure is for one optional block inside a form.
- `open` / `onToggle` to control it, `defaultOpen` otherwise. The button carries `aria-expanded` and `aria-controls`.
