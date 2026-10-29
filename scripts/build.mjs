// Builds the static documentation site for the NSL Design System into ./site
// Usage: node scripts/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'source');
const OUT = path.join(ROOT, 'site');
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const VERSION = pkg.version;
const BUILT = new Date().toISOString().slice(0, 10);
const REPO = 'https://github.com/denswor/nsl-design-system';

const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const copy = (a, b) => { fs.mkdirSync(path.dirname(b), { recursive: true }); fs.copyFileSync(a, b); };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

fs.rmSync(OUT, { recursive: true, force: true });

/* ---------------------------------------------------------------- dist (consumable files) */
const stripFontFaces = (css) => css.replace(/@font-face\s*\{[^}]*\}\s*/g, '');
const tokensCss = stripFontFaces(read(path.join(SRC, 'tokens.css')));
const bundleCss = stripFontFaces(read(path.join(SRC, 'components/bundle.css')));
const bundleJs = read(path.join(SRC, 'components/bundle.js'));
write(path.join(OUT, 'dist/tokens.css'), tokensCss);
write(path.join(OUT, 'dist/bundle.css'), bundleCss);
write(path.join(OUT, 'dist/bundle.js'), bundleJs);
copy(path.join(SRC, 'components/index.d.ts'), path.join(OUT, 'dist/index.d.ts'));
copy(path.join(SRC, 'tokens.json'), path.join(OUT, 'dist/tokens.json'));
const pkgDir = (n) => path.dirname(require.resolve(n + '/package.json'));
copy(path.join(pkgDir('react'), 'umd/react.production.min.js'), path.join(OUT, 'dist/vendor/react.production.min.js'));
copy(path.join(pkgDir('react-dom'), 'umd/react-dom.production.min.js'), path.join(OUT, 'dist/vendor/react-dom.production.min.js'));

// Fonts: IBM Plex Mono / Sans (OFL) from @fontsource, latin subset, self-hosted.
const FONTS = [['IBM Plex Mono', '@fontsource/ibm-plex-mono', 'ibm-plex-mono', [300, 400, 500, 600, 700]], ['IBM Plex Sans', '@fontsource/ibm-plex-sans', 'ibm-plex-sans', [400, 500, 600, 700]]];
let fontsCss = '/* IBM Plex Mono and IBM Plex Sans, SIL Open Font License 1.1 */\n';
for (const [family, pkgName, file, weights] of FONTS) {
  const dir = path.dirname(require.resolve(pkgName + '/package.json'));
  for (const w of weights) {
    const f = `${file}-latin-${w}-normal.woff2`;
    copy(path.join(dir, 'files', f), path.join(OUT, 'dist/fonts', f));
    fontsCss += `@font-face { font-family: "${family}"; src: url("fonts/${f}") format("woff2"); font-weight: ${w}; font-style: normal; font-display: swap; }\n`;
  }
}
write(path.join(OUT, 'dist/fonts.css'), fontsCss);
write(path.join(OUT, '.nojekyll'), '');

/* ---------------------------------------------------------------- server-side NSL (logo, icons) */
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sandbox = { window: { React }, React, console };
vm.createContext(sandbox);
vm.runInContext(bundleJs, sandbox);
const NSL = sandbox.window.NSL;
const ssr = (name, props) => ReactDOMServer.renderToStaticMarkup(React.createElement(NSL[name], props));
const ICON_NAMES = NSL.icons.slice();

/* ---------------------------------------------------------------- components */
const GROUP_ORDER = ['Foundations', 'Actions', 'Forms', 'Navigation', 'Layout', 'Display', 'Feedback', 'Media', 'Commerce', 'Content', 'Search', 'Other'];
const compDir = path.join(SRC, 'components');
const components = fs.readdirSync(compDir).filter((d) => fs.existsSync(path.join(compDir, d, 'preview.html')) && NSL[d]).sort();

function parseReadme(md) {
  const lines = (md || '').split('\n');
  const body = lines.filter((l, i) => !(i === 0 && l.startsWith('# '))).join('\n').trim();
  const paras = body.split(/\n\s*\n/);
  const lead = paras[0] && !paras[0].startsWith('-') ? paras.shift().trim() : '';
  return { lead, rest: paras.join('\n\n').trim() };
}

/* index.d.ts -> props per component */
const dts = read(path.join(SRC, 'components/index.d.ts'));
function matchBlock(s, i) { // s[i] === '{' ; returns index after matching '}'
  let d = 0;
  for (let j = i; j < s.length; j++) { if (s[j] === '{') d++; else if (s[j] === '}') { d--; if (!d) return j + 1; } }
  return s.length;
}
function splitMembers(body) {
  const out = []; let d = 0, cur = '', inC = false;
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (!inC && c === '/' && body[i + 1] === '*') inC = true;
    if (inC) { cur += c; if (c === '/' && body[i - 1] === '*') inC = false; continue; }
    if ('{(<['.includes(c)) d++;
    if ('})>]'.includes(c) && !(c === '>' && body[i - 1] === '=')) d--;
    if ((c === ';' || c === '\n') && d === 0) { if (cur.trim()) out.push(cur.trim()); cur = ''; continue; }
    cur += c;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
function parseMembers(body) {
  const res = [];
  for (let m of splitMembers(body)) {
    let doc = '';
    m = m.replace(/\/\*\*?([\s\S]*?)\*\//g, (_, t) => { doc += t.replace(/^\s*\*\s?/gm, '').trim() + ' '; return ''; }).trim();
    if (!m) continue;
    let mm = m.match(/^([A-Za-z_$][\w$]*)(\?)?\s*\(([\s\S]*)\)\s*:\s*([\s\S]+)$/);
    if (mm) { res.push({ name: mm[1], optional: !!mm[2], type: `(${mm[3]}) => ${mm[4]}`, doc: doc.trim() }); continue; }
    mm = m.match(/^([A-Za-z_$'"][\w$'"-]*)(\?)?\s*:\s*([\s\S]+)$/);
    if (mm) res.push({ name: mm[1].replace(/['"]/g, ''), optional: !!mm[2], type: mm[3].trim(), doc: doc.trim() });
  }
  return res;
}
const interfaces = {};
for (const m of dts.matchAll(/export interface (\w+)(?:<[^>]*>)?(?:\s+extends\s+([^{]+))?\s*\{/g)) {
  const start = m.index + m[0].length - 1, end = matchBlock(dts, start);
  interfaces[m[1]] = { ext: (m[2] || '').trim(), members: parseMembers(dts.slice(start + 1, end - 1)) };
}
function propsOf(name) {
  const re = new RegExp(`export declare const ${name}: C<`);
  const m = re.exec(dts); if (!m) return { members: [], ext: '' };
  let i = m.index + m[0].length;
  if (dts[i] === '{') { const end = matchBlock(dts, i); return { members: parseMembers(dts.slice(i + 1, end - 1)), ext: '' }; }
  const t = dts.slice(i).match(/^(\w+)(<[^;]*?>)?>;/);
  if (!t) return { members: [], ext: '' };
  const iface = interfaces[t[1]];
  if (!iface) return { members: [], ext: '' };
  let members = iface.members.slice();
  if (t[2]) { const arg = t[2].slice(1, -1); members = members.map((x) => ({ ...x, type: x.type.replace(/\bV\b/g, arg) })); }
  let ext = iface.ext;
  const base = ext.match(/^(\w+)\b/);
  if (base && interfaces[base[1]]) { members = interfaces[base[1]].members.concat(members); ext = ''; }
  return { members, ext };
}

const comps = components.map((name) => {
  const dir = path.join(compDir, name);
  const preview = read(path.join(dir, 'preview.html'));
  const marker = preview.match(/^<!--\s*@dsCard([^>]*)-->/);
  const group = (marker && (marker[1].match(/group="([^"]+)"/) || [])[1]) || 'Other';
  const readme = fs.existsSync(path.join(dir, 'README.md')) ? read(path.join(dir, 'README.md')) : '';
  const { lead, rest } = parseReadme(readme);
  return { name, slug: slug(name), group, preview, lead, rest, props: propsOf(name) };
});
const groups = GROUP_ORDER.concat([...new Set(comps.map((c) => c.group))].filter((g) => !GROUP_ORDER.includes(g)))
  .map((g) => ({ name: g, items: comps.filter((c) => c.group === g) })).filter((g) => g.items.length);

/* ---------------------------------------------------------------- example frames */
const PREVIEW_HELPER_CSS = '.nsl-v__l{font:400 11px/16px var(--font-mono);color:var(--text-secondary)}';
function exampleDoc(c) {
  const head = `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<link rel="stylesheet" href="../dist/fonts.css"><link rel="stylesheet" href="../dist/tokens.css"><link rel="stylesheet" href="../dist/bundle.css">
<style>html{background:var(--bg-default)}body{margin:0;overflow-x:auto}${PREVIEW_HELPER_CSS}</style>
<script>try{var t=localStorage.getItem('nsl-docs-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>
<script src="../dist/vendor/react.production.min.js"></script><script src="../dist/vendor/react-dom.production.min.js"></script><script src="../dist/bundle.js"></script>`;
  const resize = `<script>(function(){function post(){try{parent.postMessage({nslFrame:${JSON.stringify(c.name)},h:Math.ceil(document.documentElement.scrollHeight)},'*')}catch(e){}}
new ResizeObserver(post).observe(document.documentElement);addEventListener('load',post);setInterval(post,1000);
addEventListener('message',function(e){if(e.data&&e.data.nslTheme)document.documentElement.setAttribute('data-theme',e.data.nslTheme)});})();</script>`;
  let html = c.preview.replace(/^<!--\s*@dsCard[^>]*-->\s*/, '');
  html = html.replace(/<script src="\.\.\/\.\.\/docs\/playground\.js"><\/script>/g, '');
  if (/<!doctype/i.test(html)) {
    html = html.replace(/<head>/i, '<head>' + head).replace(/<\/body>/i, resize + '</body>');
  } else {
    html = `<!doctype html><html lang="en" data-theme="primary"><head>${head}<title>${c.name}</title><style>body{padding:16px}</style></head><body>${html}${resize}</body></html>`;
  }
  return html;
}
function exampleSource(c) {
  const scripts = [...c.preview.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const own = scripts.filter((s) => !s.includes('window.Playground =')).join('\n').trim();
  return own;
}
for (const c of comps) write(path.join(OUT, 'examples', c.name + '.html'), exampleDoc(c));

/* ---------------------------------------------------------------- page shell */
const LOGO = ssr('Logo', { height: 28 });
const LOGO_MARK = ssr('Logo', { height: 28, variant: 'mark' });
const md = (s) => marked.parse(s || '', { mangle: false, headerIds: false });

function nav(prefix, current) {
  const link = (href, label, key) => `<a href="${prefix}${href}"${current === key ? ' aria-current="page"' : ''}>${label}</a>`;
  return `<nav class="side" aria-label="Documentation">
  <div class="side__search"><input type="search" id="navSearch" placeholder="Search components" aria-label="Search components" autocomplete="off"><kbd>/</kbd></div>
  <div class="side__sec"><div class="side__h">Overview</div>${link('index.html', 'Introduction', 'home')}${link('getting-started.html', 'Getting started', 'start')}${link('guidelines.html', 'Guidelines', 'guidelines')}</div>
  <div class="side__sec"><div class="side__h">Foundations</div>${link('foundations/colors.html', 'Color', 'colors')}${link('foundations/typography.html', 'Typography', 'type')}${link('foundations/spacing.html', 'Spacing &amp; elevation', 'spacing')}${link('foundations/icons.html', 'Icons', 'icons')}</div>
  ${groups.map((g) => `<div class="side__sec" data-group><div class="side__h">${esc(g.name)}</div>${g.items.map((c) => link('components/' + c.slug + '.html', esc(c.name), 'c:' + c.name)).join('')}</div>`).join('\n  ')}
</nav>`;
}
function page({ title, prefix = '', current, body, description }) {
  return `<!doctype html>
<html lang="en" data-theme="primary">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · NSL Design System</title>
<meta name="description" content="${esc(description || 'NSL Design System: components, tokens and guidelines for NewServerLife.')}">
<link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${prefix}dist/fonts.css"><link rel="stylesheet" href="${prefix}dist/tokens.css"><link rel="stylesheet" href="${prefix}assets/docs.css">
<script>try{var t=localStorage.getItem('nsl-docs-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="top">
  <button class="top__menu" type="button" aria-label="Menu" aria-expanded="false" aria-controls="sidebar"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>
  <a class="top__brand" href="${prefix}index.html" aria-label="NSL Design System home"><span class="top__logo">${LOGO}</span><span class="top__logo top__logo--mark">${LOGO_MARK}</span><span class="top__name">Design System</span></a>
  <span class="top__ver">v${VERSION}</span>
  <div class="top__right">
    <div class="seg" role="radiogroup" aria-label="Theme"><button type="button" role="radio" data-theme-set="primary">Primary</button><button type="button" role="radio" data-theme-set="secondary">Secondary</button></div>
    <a class="top__gh" href="${REPO}" aria-label="GitHub repository"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg></a>
  </div>
</header>
<div class="layout">
<aside id="sidebar" class="layout__side">${nav(prefix, current)}</aside>
<main id="main" class="layout__main">
${body}
<footer class="foot">NSL Design System v${VERSION} · built ${BUILT} · <a href="${REPO}">GitHub</a></footer>
</main>
</div>
<script src="${prefix}assets/docs.js"></script>
</body>
</html>
`;
}
const codeBlock = (code, lang = '') => `<div class="code"><button type="button" class="code__copy" data-copy>Copy</button><pre><code${lang ? ` class="lang-${lang}"` : ''}>${esc(code)}</code></pre></div>`;

/* ---------------------------------------------------------------- component pages */
function propsTable(c) {
  const { members, ext } = c.props;
  if (!members.length) return '<p class="muted">This component takes no documented props.</p>';
  const rows = members.map((m) => `<tr><td><code>${esc(m.name)}</code>${m.optional ? '' : ' <span class="req">required</span>'}</td><td><code class="type">${esc(m.type)}</code></td><td>${esc(m.doc)}</td></tr>`).join('');
  return `<div class="tablewrap"><table class="props"><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>${rows}</tbody></table></div>${ext ? `<p class="muted">Also accepts the native attributes of <code>${esc(ext)}</code>.</p>` : ''}`;
}
for (const c of comps) {
  const usage = `const { ${c.name} } = window.NSL;\n\n// JSX\n<${c.name}${c.props.members.filter((m) => !m.optional && m.name !== 'children').map((m) => ` ${m.name}={…}`).join('')}${c.props.members.some((m) => m.name === 'children') ? `>…</${c.name}>` : ' />'}`;
  const body = `<article class="doc">
<div class="crumbs"><a href="../index.html">Components</a><span>/</span>${esc(c.group)}</div>
<h1>${esc(c.name)}</h1>
${c.lead ? `<p class="lead">${marked.parseInline(c.lead)}</p>` : ''}
<section class="ex" aria-label="Examples">
  <div class="ex__bar"><span class="ex__title">Examples</span><div class="seg seg--sm" role="radiogroup" aria-label="Preview width"><button type="button" role="radio" data-w="" aria-checked="true">Fluid</button><button type="button" role="radio" data-w="768">768</button><button type="button" role="radio" data-w="375">375</button></div><a class="ex__open" href="../examples/${c.name}.html" target="_blank" rel="noopener">Open in new tab ↗</a></div>
  <div class="ex__stage"><iframe class="ex__frame" title="${esc(c.name)} examples" src="../examples/${c.name}.html" loading="lazy" data-frame="${esc(c.name)}"></iframe></div>
</section>
${c.rest ? `<section><h2 id="guidelines">Guidelines</h2><div class="md">${md(c.rest)}</div></section>` : ''}
<section><h2 id="props">Props</h2>${propsTable(c)}</section>
<section><h2 id="usage">Usage</h2>${codeBlock(usage, 'jsx')}
<details class="src"><summary>Source of the examples above</summary>${codeBlock(exampleSource(c), 'js')}</details></section>
</article>`;
  write(path.join(OUT, 'components', c.slug + '.html'), page({ title: c.name, prefix: '../', current: 'c:' + c.name, body, description: c.lead }));
}

/* ---------------------------------------------------------------- tokens */
const tokens = JSON.parse(read(path.join(SRC, 'tokens.json')));
const themes = tokens.color.themes;
const PRIMITIVE = /^(primary|secondary|neutral|red|green|amber|white-alpha|black-alpha|gradient)-[a-z0-9]+$/;
const colorTokens = tokens.color.tokens;
const prims = colorTokens.filter((t) => PRIMITIVE.test(t.name));
const sems = colorTokens.filter((t) => !PRIMITIVE.test(t.name));
const famOf = (n) => n.replace(/-[a-z0-9]+$/, '');
const semGroup = (n) => {
  const p = n.split('-')[0];
  return ({ text: 'Text', bg: 'Background', border: 'Border', brand: 'Brand', secondary: 'Secondary', icon: 'Icon', input: 'Input', label: 'Input', helper: 'Input', control: 'Controls', slider: 'Controls', tag: 'Tags', status: 'Status', 'on': 'On surface', nav: 'Navigation', overlay: 'Overlay', rating: 'Rating' })[p] || 'Other';
};
const val = (t, th) => (typeof t.value === 'object' ? (t.value[th] || t.value.primary) : t.value);
const swatch = (t) => `<div class="sw" data-copy-text="var(--${t.name})" tabindex="0" role="button" aria-label="Copy var(--${t.name})"><span class="sw__chip" style="background:var(--${t.name})"></span><span class="sw__name">${esc(t.name)}</span><span class="sw__val">${themes.map((th) => `<span title="${esc(th.name)}">${esc(val(t, th.id))}</span>`).filter((v, i, a) => a.indexOf(v) === i).join(' · ')}</span>${t.usage ? `<span class="sw__use">${esc(t.usage)}</span>` : ''}</div>`;
{
  const fams = [...new Set(prims.map((t) => famOf(t.name)))];
  const semGroups = [...new Set(sems.map((t) => semGroup(t.name)))];
  const body = `<article class="doc"><div class="crumbs">Foundations</div><h1>Color</h1>
<p class="lead">Components use <b>semantic</b> tokens only (<code>brand-*</code>, <code>text-*</code>, <code>bg-*</code>, <code>border-*</code>…). Primitives exist so semantic tokens can alias them. Switch the theme in the header to see the secondary (blue) values. Click a swatch to copy its CSS variable.</p>
<h2>Semantic</h2>${semGroups.map((g) => `<h3>${g}</h3><div class="sws">${sems.filter((t) => semGroup(t.name) === g).map(swatch).join('')}</div>`).join('')}
<h2>Primitives</h2>${fams.map((f) => `<h3>${f}</h3><div class="ramp">${prims.filter((t) => famOf(t.name) === f).map((t) => `<div class="ramp__i" data-copy-text="var(--${t.name})" tabindex="0" role="button" aria-label="Copy var(--${t.name})"><span class="ramp__chip" style="background:var(--${t.name})"></span><span class="sw__name">${esc(t.name.replace(f + '-', ''))}</span><span class="sw__val">${esc(val(t, 'primary'))}</span></div>`).join('')}</div>`).join('')}
</article>`;
  write(path.join(OUT, 'foundations/colors.html'), page({ title: 'Color', prefix: '../', current: 'colors', body }));
}
{
  const fams = tokens.type.families;
  const body = `<article class="doc"><div class="crumbs">Foundations</div><h1>Typography</h1>
<p class="lead"><b>IBM Plex Mono</b> for headings and technical labels, <b>IBM Plex Sans</b> for body, buttons and forms. Each style is a CSS class (<code>.heading-lg</code>) and a shorthand variable (<code>font: var(--text-heading-lg)</code>).</p>
<div class="fams"><div><span class="fams__k">mono</span><span class="fams__s" style="font-family:var(--font-mono)">Dell PowerEdge R740xd 12LFF</span><code>${esc(fams.mono)}</code></div><div><span class="fams__k">sans</span><span class="fams__s" style="font-family:var(--font-sans)">Fully tested, ships in 7–10 days</span><code>${esc(fams.sans)}</code></div></div>
${tokens.type.groups.map((g) => `<h2>${esc(g.name)}</h2><div class="types">${g.styles.map((s) => `<div class="ty"><div class="ty__meta"><code>${esc(s.name)}</code><span>${esc(s.fontSize)} / ${esc(s.lineHeight)} · ${esc(s.fontWeight)}${s.letterSpacing && s.letterSpacing !== '0' && s.letterSpacing !== '0px' ? ' · ' + esc(s.letterSpacing) : ''}</span>${s.usage ? `<span class="muted">${esc(s.usage)}</span>` : ''}</div><div class="ty__sample ${esc(s.name)}">${g.name === 'Heading' ? 'Refurbished servers built for value' : g.name === 'Button' ? 'Add to Cart' : g.name === 'Mono label' ? 'HOME / SERVERS / DELL' : 'Enterprise-class performance at a fraction of OEM prices.'}</div></div>`).join('')}</div>`).join('')}
</article>`;
  write(path.join(OUT, 'foundations/typography.html'), page({ title: 'Typography', prefix: '../', current: 'type', body }));
}
{
  const row = (t, vis) => `<tr><td><code>${esc(t.name)}</code></td><td>${esc(typeof t.value === 'object' ? t.value.primary : t.value)}</td><td>${vis}</td><td class="muted">${esc(t.usage || '')}</td></tr>`;
  const tbl = (head, rows) => `<div class="tablewrap"><table class="props tok"><thead><tr><th>Token</th><th>Value</th><th>${head}</th><th>Usage</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  const body = `<article class="doc"><div class="crumbs">Foundations</div><h1>Spacing &amp; elevation</h1>
<p class="lead">Spacing steps of 4. Cards pad <code>space-24</code>, sections sit <code>space-64</code> apart. No borders and shadows together on the same card.</p>
<h2>Spacing</h2>${tbl('Scale', tokens.spacing.tokens.map((t) => row(t, `<span class="bar" style="width:var(--${t.name})"></span>`)).join(''))}
<h2>Radius</h2>${tbl('Shape', tokens.radius.tokens.map((t) => row(t, `<span class="rad" style="border-radius:var(--${t.name})"></span>`)).join(''))}
<h2>Shadow</h2>${tbl('Sample', tokens.shadow.tokens.map((t) => row(t, `<span class="shd" style="box-shadow:var(--${t.name})"></span>`)).join(''))}
<h2>Layout</h2>${tbl('', tokens.layout.tokens.map((t) => row(t, '')).join(''))}
<h2>Icon stroke</h2>${tbl('', tokens.iconStroke.tokens.map((t) => row(t, '')).join(''))}
</article>`;
  write(path.join(OUT, 'foundations/spacing.html'), page({ title: 'Spacing & elevation', prefix: '../', current: 'spacing', body }));
}
{
  const sets = [['Feather (UI)', (n) => !/^(ph-|nsl-|flame$)/.test(n)], ['Hardware specs (ph-*)', (n) => n.startsWith('ph-')], ['Header (nsl-*) and flame', (n) => n.startsWith('nsl-') || n === 'flame']];
  const body = `<article class="doc"><div class="crumbs">Foundations</div><h1>Icons</h1>
<p class="lead">${ICON_NAMES.length} line icons at 1.5px stroke, drawn with <code>currentColor</code>. Use the <a href="../components/icon.html">Icon</a> component: <code>&lt;Icon name="server" size={20} /&gt;</code>. Click an icon to copy its name.</p>
<div class="side__search icons__search"><input type="search" id="iconSearch" placeholder="Filter icons" aria-label="Filter icons"></div>
${sets.map(([title, f]) => `<h2>${title}</h2><div class="icons">${ICON_NAMES.filter(f).map((n) => `<button type="button" class="ico" data-copy-text="${n}" data-name="${n}">${ssr('Icon', { name: n, size: 24 })}<span>${n}</span></button>`).join('')}</div>`).join('')}
</article>`;
  write(path.join(OUT, 'foundations/icons.html'), page({ title: 'Icons', prefix: '../', current: 'icons', body }));
}

/* ---------------------------------------------------------------- overview pages */
const dsReadme = read(path.join(SRC, 'README.md')).split(/\n---\n/)[0];
const [intro, ...guideRest] = dsReadme.split(/\n(?=## )/);
write(path.join(OUT, 'guidelines.html'), page({ title: 'Guidelines', current: 'guidelines', body: `<article class="doc"><div class="crumbs">Overview</div><h1>Guidelines</h1><p class="lead">${marked.parseInline(intro.trim())}</p><div class="md">${md(guideRest.join('\n'))}</div></article>` }));

const PAGES_URL = 'https://denswor.github.io/nsl-design-system';
const startBody = `<article class="doc"><div class="crumbs">Overview</div><h1>Getting started</h1>
<p class="lead">The system ships as one stylesheet pair and one script. Load React 18, the CSS, then <code>bundle.js</code>: every component is on <code>window.NSL</code>.</p>
<h2>Plain HTML</h2>${codeBlock(`<link rel="stylesheet" href="${PAGES_URL}/dist/fonts.css">
<link rel="stylesheet" href="${PAGES_URL}/dist/tokens.css">
<link rel="stylesheet" href="${PAGES_URL}/dist/bundle.css">

<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="${PAGES_URL}/dist/bundle.js"></script>

<div id="app"></div>
<script>
  const { Button, ProductCard } = window.NSL;
  const h = React.createElement;
  ReactDOM.createRoot(document.getElementById('app')).render(
    h(Button, { variant: 'primary', iconRight: 'arrow-right' }, 'Configure a Server')
  );
</script>`, 'html')}
<h2>Files</h2>
<div class="tablewrap"><table class="props"><thead><tr><th>File</th><th>What it is</th></tr></thead><tbody>
<tr><td><a href="dist/tokens.css"><code>dist/tokens.css</code></a></td><td>Every token as a CSS variable, both themes, plus the type classes (<code>.heading-lg</code>, <code>.body-sm</code>…).</td></tr>
<tr><td><a href="dist/bundle.css"><code>dist/bundle.css</code></a></td><td>Component styles. Reads its variables from <code>tokens.css</code>.</td></tr>
<tr><td><a href="dist/bundle.js"><code>dist/bundle.js</code></a></td><td>All ${comps.length} components on <code>window.NSL</code>, plus <code>NSL.icons</code>. Needs <code>window.React</code> and <code>window.ReactDOM</code> 18.</td></tr>
<tr><td><a href="dist/index.d.ts"><code>dist/index.d.ts</code></a></td><td>TypeScript declarations for every component's props.</td></tr>
<tr><td><a href="dist/tokens.json"><code>dist/tokens.json</code></a></td><td>Tokens as data, for tools and design apps.</td></tr>
<tr><td><a href="dist/fonts.css"><code>dist/fonts.css</code></a></td><td>Self-hosted IBM Plex Mono and IBM Plex Sans (latin, woff2).</td></tr>
</tbody></table></div>
<h2>Themes and surfaces</h2>
<p>Set <code>data-theme="secondary"</code> on any wrapper to switch everything inside it to the blue theme. Wrap areas on the brand gradient or a dark band in <code>.nsl-on-dark</code>; components that sit there switch to their on-dark colors automatically.</p>
${codeBlock(`<section data-theme="secondary">…</section>\n<div class="nsl-gradient nsl-on-dark">…</div>`, 'html')}
<h2>Versions</h2>
<p>This site is a frozen snapshot of the system, published from <a href="${REPO}">${REPO.replace('https://', '')}</a>. Each release is a git tag; the files under <code>dist/</code> always match the version in the header.</p>
</article>`;
write(path.join(OUT, 'getting-started.html'), page({ title: 'Getting started', current: 'start', body: startBody }));

const homeBody = `<article class="doc doc--home">
<div class="hero"><div class="hero__eyebrow">NewServerLife · v${VERSION}</div><h1>NSL Design System</h1>
<p class="lead">${marked.parseInline(intro.trim())}</p>
<div class="hero__stats"><div><b>${comps.length}</b><span>components</span></div><div><b>${colorTokens.length}</b><span>color tokens</span></div><div><b>${ICON_NAMES.length}</b><span>icons</span></div><div><b>2</b><span>themes</span></div></div>
<div class="hero__cta"><a class="btn btn--primary" href="getting-started.html">Get started</a><a class="btn btn--ghost" href="guidelines.html">Read the guidelines</a></div></div>
<h2>Foundations</h2>
<div class="cards cards--4"><a class="card" href="foundations/colors.html"><b>Color</b><span>Semantic and primitive tokens, two themes.</span></a><a class="card" href="foundations/typography.html"><b>Typography</b><span>IBM Plex Mono and Sans, ${tokens.type.groups.reduce((n, g) => n + g.styles.length, 0)} styles.</span></a><a class="card" href="foundations/spacing.html"><b>Spacing &amp; elevation</b><span>Spacing, radius, shadow, layout.</span></a><a class="card" href="foundations/icons.html"><b>Icons</b><span>Feather, hardware and header sets.</span></a></div>
<h2>Components</h2>
${groups.map((g) => `<h3>${esc(g.name)}</h3><div class="cards">${g.items.map((c) => `<a class="card" href="components/${c.slug}.html"><b>${esc(c.name)}</b><span>${esc((c.lead || '').replace(/[`*]/g, '').slice(0, 140))}</span></a>`).join('')}</div>`).join('')}
</article>`;
write(path.join(OUT, 'index.html'), page({ title: 'Introduction', current: 'home', body: homeBody }));

/* ---------------------------------------------------------------- static assets */
for (const f of ['docs.css', 'docs.js']) copy(path.join(ROOT, 'scripts/assets', f), path.join(OUT, 'assets', f));
write(path.join(OUT, 'assets/favicon.svg'), ssr('Logo', { height: 56, variant: 'mark' }).replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"'));

console.log(`Built ${comps.length} component pages, ${ICON_NAMES.length} icons, ${colorTokens.length} color tokens -> ${path.relative(ROOT, OUT)}/`);
