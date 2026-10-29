# NSL Design System

Components, tokens and guidelines for [NewServerLife](https://newserverlife.com).

**Docs:** https://denswor.github.io/nsl-design-system/

## What's here

| Path | Contents |
| --- | --- |
| `source/` | Snapshot of the design system: `components/bundle.js` and `bundle.css` (all components on `window.NSL`), `index.d.ts`, `tokens.css`, `tokens.json`, guidelines (`README.md`) and each component's `README.md` and `preview.html`. |
| `scripts/build.mjs` | Generates the docs site from `source/` into `site/`. |
| `scripts/assets/` | Styles and script of the docs site itself. |
| `.github/workflows/pages.yml` | Builds and deploys the site on every push to `main`. |

The working copy of the system lives in the NSL Design System artifact on claude.ai. When it changes enough to publish, `source/` is refreshed from it, the version in `package.json` is bumped and a tag is created (`v1.1.0`, …).

## Use the components

```html
<link rel="stylesheet" href="https://denswor.github.io/nsl-design-system/dist/fonts.css">
<link rel="stylesheet" href="https://denswor.github.io/nsl-design-system/dist/tokens.css">
<link rel="stylesheet" href="https://denswor.github.io/nsl-design-system/dist/bundle.css">
<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="https://denswor.github.io/nsl-design-system/dist/bundle.js"></script>
```

## Build locally

```sh
npm install
npm run build   # -> site/
npm run serve   # http://localhost:8080
```

Fonts: IBM Plex Mono and IBM Plex Sans, SIL Open Font License 1.1 (self-hosted from @fontsource).
