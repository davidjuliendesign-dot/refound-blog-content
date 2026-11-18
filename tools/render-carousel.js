// Carrousels médias sociaux (social/README.md). Usage: node render-carousel.js <slug> <outDir>
// 1080×1350, fr-01.png… et en-01.png…. Types de diapos : hook (accroche), text (titre + texte),
// stat (gros chiffre), receipt (lignes de kit/receipts.json : ligne imprimée → produit → garantie/date), cta (fin).
// Contenu tiré de l'article (mêmes sources) ; titre ≤ 8 mots, texte ≤ 25 mots ; aucun faux bouton App Store.
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const S = __dirname; const ROOT = path.join(S, '..');
const b64 = p => fs.readFileSync(path.join(S, p)).toString('base64');
const font = (fam, file, w) => `@font-face{font-family:'${fam}';font-weight:${w};src:url(data:font/woff2;base64,${b64(file)}) format('woff2')}`;
const FD = 'fonts/fontsource-funnel-display-5.3.0/files/funnel-display-latin-';
const DM = 'fonts/fontsource-dm-sans-5.3.0/files/dm-sans-latin-';
const LOGO = `data:image/png;base64,${b64('assets/logo-refound-light.png')}`;
const KIT = JSON.parse(fs.readFileSync(path.join(ROOT, 'kit/receipts.json'), 'utf8')).receipts;
function photo(it) {
  if (!it.imageFile) return null; // nom exact du fichier dans kit/images/
  const f = path.join(ROOT, 'kit/images', it.imageFile);
  if (!fs.existsSync(f)) return null;
  const ext = path.extname(f).slice(1).replace('jpg', 'jpeg');
  return `data:image/${ext};base64,${fs.readFileSync(f).toString('base64')}`;
}
const esc = s => String(s).replace(/&#039;/g, '’').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/ /g, ' ');
const CSS = [font('Funnel Display', FD + '700-normal.woff2', 700), font('Funnel Display', FD + '800-normal.woff2', 800),
  font('DM Sans', DM + '400-normal.woff2', 400), font('DM Sans', DM + '500-normal.woff2', 500), font('DM Sans', DM + '700-normal.woff2', 700)].join('') + `
:root{--bg:#14181F;--fg:#F0F2F5;--card:#1D222A;--line:#272C34;--muted:#8491A4;--green:#1EB885;--gold:#F6B828}
*{box-sizing:border-box;margin:0}body{background:var(--bg);color:var(--fg);font-family:'DM Sans',sans-serif}
.h{font-family:'Funnel Display',sans-serif}
.s{width:1080px;height:1350px;padding:84px 80px 70px;display:flex;flex-direction:column;position:relative;overflow:hidden;
 background:radial-gradient(700px 520px at 90% 8%, rgba(30,184,133,.16), transparent 70%), var(--bg)}
.top{display:flex;justify-content:space-between;align-items:center;color:var(--muted);font-size:24px;font-weight:700}
.top img{height:34px}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:60px}
.eyebrow{color:var(--green);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:26px}
.t{font-size:92px;line-height:1.02;font-weight:800;margin-top:22px;letter-spacing:-.01em}
.t em{font-style:normal;color:var(--green)}
.b{font-size:40px;line-height:1.32;color:#C9CFD8;margin-top:40px;max-width:900px}
.b b{color:var(--fg)}
.foot{display:flex;justify-content:space-between;align-items:center;color:var(--muted);font-size:22px;border-top:1px solid var(--line);padding-top:24px}
.big{font-size:250px;line-height:.9;font-weight:800;color:var(--gold);margin-top:30px;letter-spacing:-.03em}
.rows{display:grid;gap:22px;margin-top:46px}
.r{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:24px 26px;display:grid;gap:12px}
.pr{font-family:ui-monospace,Menlo,monospace;font-weight:700;font-size:28px;background:#F4F1E8;color:#2A2D33;border-radius:8px;padding:10px 14px;justify-self:start}
.nm{font-weight:700;font-size:30px;line-height:1.25}.nm:before{content:'→ ';color:var(--green)}
.r.wp{grid-template-columns:150px 1fr;column-gap:24px}.r.wp>*:not(.ph){grid-column:2}.ph{grid-row:1/4;width:150px;height:150px;background:#fff;border-radius:14px;display:flex;align-items:center;justify-content:center;overflow:hidden;align-self:center}.ph img{max-width:100%;max-height:100%}
.bd{justify-self:start;border:3px solid;border-radius:12px;padding:6px 16px;font-family:'Funnel Display';font-weight:800;font-size:32px}
.cta .t{font-size:84px}.url{margin-top:44px;font-family:'Funnel Display';font-weight:800;font-size:56px;color:var(--green)}`;

function slide(d, i, n, src) {
  const top = `<div class="top"><img src="${LOGO}"><span>${i}/${n}</span></div>`;
  const foot = `<div class="foot"><span>${src}</span><span>${i < n ? '→' : ''}</span></div>`;
  let body = '';
  if (d.type === 'hook' || d.type === 'text') body = `<div class="eyebrow">${d.eyebrow || ''}</div><div class="t h">${d.title}</div><div class="b">${d.text}</div>`;
  if (d.type === 'stat') body = `<div class="eyebrow">${d.eyebrow}</div><div class="big h" style="${d.size ? `font-size:${d.size}px` : ""}">${d.stat}</div><div class="t h" style="font-size:68px">${d.title}</div><div class="b">${d.text}</div>`;
  if (d.type === 'receipt') {
    const r = KIT.find(x => x.slug === d.kit);
    body = `<div class="eyebrow">${d.eyebrow}</div><div class="t h" style="font-size:70px">${d.title}</div><div class="rows">${d.rows.map(([ix, badge, col]) => {
      const it = r.items[ix]; const ph = photo(it); return `<div class="r${ph ? ' wp' : ''}">${ph ? `<div class="ph"><img src="${ph}"></div>` : ''}<div class="pr">${esc(it.printed)}</div><div class="nm">${esc(d.names && d.names[ix] || it.name)}</div><div class="bd" style="border-color:${col};color:${col}">${esc(badge)}</div></div>`; }).join('')}</div>`;
  }
  if (d.type === 'cta') body = `<div class="cta"><div class="eyebrow">${d.eyebrow}</div><div class="t h">${d.title}</div><div class="b">${d.text}</div><div class="url">refoundapp.ca</div></div>`;
  return `<style>${CSS}</style><div class="s">${top}<div class="mid">${body}</div>${foot}</div>`;
}

const C = require(path.join(ROOT, 'social', process.argv[2], 'slides.js'));
(async () => {
  const out = process.argv[3]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  for (const l of ['fr', 'en']) {
    const list = C[l].slides;
    for (let i = 0; i < list.length; i++) {
      const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
      await p.setContent(slide(list[i], i + 1, list.length, C[l].src)); await p.evaluate(() => document.fonts.ready);
      await p.screenshot({ path: path.join(out, `${l}-${String(i + 1).padStart(2, '0')}.png`) }); await p.close();
    }
  }
  await b.close();
})();
