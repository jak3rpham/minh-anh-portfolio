import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, cp, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, '_site');
const siteUrl = process.env.SITE_URL;
if (!siteUrl) throw new Error('SITE_URL must be the final GitHub Pages base URL.');
const base = new URL(siteUrl.endsWith('/') ? siteUrl : siteUrl + '/');
if (!['https:', 'http:'].includes(base.protocol)) throw new Error('Invalid SITE_URL.');

let html = await readFile(resolve(root, 'index.html'), 'utf8');
const data = JSON.parse(html.match(/<script[^>]*id="work-data"[^>]*>([\s\S]*?)<\/script>/)[1]);
const assets = [...html.matchAll(/(?:src|href)="(assets\/[^"#]+)"/g)].map(m => m[1]);
for (const project of Object.values(data)) {
  for (const slide of project.slides) assets.push(`assets/img/${slide.src}.webp`);
}
for (const asset of new Set(assets)) await access(resolve(root, asset));
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
if (new Set(ids).size !== ids.length) throw new Error('Duplicate HTML IDs.');
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.includes(match[1])) throw new Error(`Missing anchor: ${match[1]}`);
}

const escapeAttr = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${escapeAttr(base.href)}">`);
html = html.replace(/<meta property="og:image"[^>]*>/,
  `<meta property="og:url" content="${escapeAttr(base.href)}">\n<meta property="og:image" content="${escapeAttr(new URL('assets/img/portrait-hero.webp', base).href)}">`);
// Content hashes prevent stale CSS, JS and images after a Pages deployment (an image
// replaced under the same name otherwise keeps showing the old version from cache).
// Fonts are left alone: they are also requested from CSS, where no hash is added.
for (const asset of new Set(assets.filter(path => /\.(css|js|webp|png|jpe?g|svg)$/.test(path)))) {
  const hash = createHash('sha256').update(await readFile(resolve(root, asset))).digest('hex').slice(0, 12);
  html = html.replaceAll('"' + asset + '"', '"' + asset + '?v=' + hash + '"');
}
await mkdir(output, { recursive: true });
await writeFile(resolve(output, 'index.html'), html);
await writeFile(resolve(output, '.nojekyll'), '');
for (const directory of ['css', 'js', 'fonts', 'img']) {
  await cp(resolve(root, 'assets', directory), resolve(output, 'assets', directory), { recursive: true });
}
console.log(`Validated ${Object.keys(data).length} projects and ${Object.values(data).reduce((sum, project) => sum + project.slides.length, 0)} slides.`);
console.log(`Website packaged for ${base.href}`);
