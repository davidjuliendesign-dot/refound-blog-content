// Usage: node render-tigre-geant.js <outDir> [prefix]
// unlimited(): délais de retour à l'échelle en jours (0-365) + zone « aucune limite » au-delà de l'axe
// (barre en dégradé avec flèche). Réutilisable pour comparer une politique sans date limite à des délais chiffrés.
// cover(): couverture sans texte dépendant de la langue (∞ + reçu qui pâlit + ligne du temps en années qui se prolonge).
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const S = __dirname;
const b64 = p => fs.readFileSync(path.join(S, p)).toString('base64');
const font = (fam, file, w) => `@font-face{font-family:'${fam}';font-weight:${w};src:url(data:font/woff2;base64,${b64(file)}) format('woff2')}`;
const FD = 'fonts/fontsource-funnel-display-5.3.0/files/funnel-display-latin-';
const DM = 'fonts/fontsource-dm-sans-5.3.0/files/dm-sans-latin-';
const CSS = [font('Funnel Display', FD + '700-normal.woff2', 700), font('Funnel Display', FD + '800-normal.woff2', 800),
  font('DM Sans', DM + '400-normal.woff2', 400), font('DM Sans', DM + '500-normal.woff2', 500), font('DM Sans', DM + '700-normal.woff2', 700)].join('') + `
:root{--bg:#14181F;--fg:#F0F2F5;--card:#1D222A;--line:#272C34;--muted:#8491A4;--green:#1EB885;--gold:#F6B828}
*{box-sizing:border-box;margin:0}
body{background:var(--bg);color:var(--fg);font-family:'DM Sans',sans-serif}
.h{font-family:'Funnel Display',sans-serif}`;
const LOGO = `data:image/png;base64,${b64('assets/logo-refound-light.png')}`;

const MAX = 365, AX = 80; // l'axe 0-365 jours occupe 80 % de la piste ; les 20 % restants = « aucune limite »
function unlimited(lang) {
  const t = lang === 'fr' ? {
    eyebrow: 'Délais de retour comparés · 4 magasins', title: 'Tigre Géant n’a aucune date limite. Les autres, si.',
    none: 'Aucune date limite', noneGen: 'Aucun délai général', d: 'j', axis: 'jours après l’achat', beyond: 'sans limite',
    rows: [
      ['Tigre Géant', 'Tous les articles retournables', null, 'var(--green)'],
      ['Costco', 'La plupart des produits', null, '#5FD3AE'],
      ['Costco', 'Électronique désignée', 90, 'var(--gold)'],
      ['IKEA', 'Article neuf non ouvert', 365, '#5FD3AE'],
      ['IKEA', 'Article ouvert', 90, 'var(--gold)'],
      ['Canadian Tire', 'La plupart des articles', 90, '#5FD3AE'],
      ['Canadian Tire', 'Électronique', 30, 'var(--gold)'],
    ],
    src: 'Sources : pages officielles de Tigre Géant, Costco, IKEA et Canadian Tire · vérifié le 17 novembre 2026 · des exceptions s’appliquent'
  } : {
    eyebrow: 'Return windows compared · 4 retailers', title: 'Giant Tiger has no time limit. The others do.',
    none: 'No time limit', noneGen: 'No general time limit', d: 'd', axis: 'days after purchase', beyond: 'no limit',
    rows: [
      ['Giant Tiger', 'All returnable items', null, 'var(--green)'],
      ['Costco', 'Most products', null, '#5FD3AE'],
      ['Costco', 'Designated electronics', 90, 'var(--gold)'],
      ['IKEA', 'New, unopened item', 365, '#5FD3AE'],
      ['IKEA', 'Opened item', 90, 'var(--gold)'],
      ['Canadian Tire', 'Most items', 90, '#5FD3AE'],
      ['Canadian Tire', 'Electronics', 30, 'var(--gold)'],
    ],
    src: 'Sources: official Giant Tiger, Costco, IKEA and Canadian Tire pages · checked November 17, 2026 · exceptions apply'
  };
  const rows = t.rows.map(([m, a, d, c], i) => {
    const w = d === null ? 100 : d / MAX * AX;
    const label = d === null ? (i === 0 ? t.none : t.noneGen) : `${d} ${t.d}`;
    const bar = d === null
      ? `<div class="bar inf" style="width:100%;background:linear-gradient(90deg,${c} 0%,${c} ${AX}%,transparent 100%)"></div><span class="h val in">${label} →</span>`
      : `<div class="bar" style="width:${w}%;background:${c}"></div><span class="h val" style="left:calc(${w}% + 12px)">${label}</span>`;
    return `<div class="row${i === 0 ? ' first' : ''}"><div class="lab"><span class="m">${m}</span><span class="a">${a}</span></div><div class="track">${bar}</div></div>`;
  }).join('');
  const ticks = [0, 30, 90, 180, 365].map(v => `<span style="left:${v / MAX * AX}%">${v}</span>`).join('');
  return `<style>${CSS}
  .wrap{width:1200px;height:675px;padding:44px 60px 34px;display:flex;flex-direction:column}
  .eyebrow{color:var(--green);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:16px}
  h1{font-size:38px;line-height:1.1;margin-top:10px;font-weight:800}
  .rows{margin-top:26px;display:grid;gap:12px;position:relative}
  .row{display:grid;grid-template-columns:300px 1fr;gap:22px;align-items:center}
  .lab{display:flex;flex-direction:column}.m{font-weight:700;font-size:19px}.a{color:var(--muted);font-size:15px;margin-top:2px}
  .track{height:46px;background:var(--card);border:1px solid var(--line);border-radius:10px;position:relative;overflow:hidden}
  .track::after{content:'';position:absolute;left:${AX}%;top:0;bottom:0;right:0;background:repeating-linear-gradient(135deg,rgba(132,145,164,.10) 0 6px,transparent 6px 12px);border-left:2px dashed #3A414C}
  .bar{height:100%;border-radius:9px}
  .val{position:absolute;top:50%;transform:translateY(-50%);font-weight:800;font-size:20px;white-space:nowrap}
  .val.in{left:18px;color:#0E1217}
  .row.first .track{border-color:var(--green)}
  .axis{display:grid;grid-template-columns:300px 1fr;gap:22px;color:var(--muted);font-size:14px;margin-top:8px}
  .axis .sc{position:relative;height:18px}.axis .sc span{position:absolute;transform:translateX(-50%)}.axis .sc span:first-child{transform:none}
  .axis .sc .b{left:${(AX + 100) / 2}%;color:var(--fg);font-weight:700}
  .axis .cap{grid-column:2;font-size:13px}
  .foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:14px;margin-top:auto}
  .foot p{color:var(--muted);font-size:13.5px;max-width:960px}.foot img{height:20px}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="rows">${rows}</div>
  <div class="axis"><div></div><div class="sc">${ticks}<span class="b">${t.beyond}</span></div><div></div><div class="cap">${t.axis}</div></div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

function cover() {
  const years = ['2026', '2027', '2028', '2029', '2030'];
  return `<style>${CSS}
  .wrap{width:1200px;height:630px;position:relative;overflow:hidden;background:
    radial-gradient(700px 420px at 80% 30%, rgba(30,184,133,.16), transparent 70%), var(--bg)}
  .logo{position:absolute;left:72px;top:64px;height:34px}
  .inf{position:absolute;left:56px;top:96px;font-size:380px;line-height:1;font-weight:800;color:var(--green)}
  .r{position:absolute;right:110px;top:56px;width:360px;height:400px;border-radius:6px;padding:30px 28px;transform:rotate(4deg);
     background:linear-gradient(180deg,#F4F1E8 0%,#F4F1E8 45%,#E9E4D6 75%,#DDD7C7 100%);box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .r .ln{height:12px;border-radius:3px;background:#2A2D33;margin:14px 0}
  .r .ln.f1{opacity:.75}.r .ln.f2{opacity:.45}.r .ln.f3{opacity:.22}.r .ln.f4{opacity:.1}
  .r .bc{position:absolute;left:28px;right:28px;bottom:30px;height:50px;opacity:.12;background:repeating-linear-gradient(90deg,#2A2D33 0 3px,transparent 3px 6px,#2A2D33 6px 7px,transparent 7px 11px)}
  .tl{position:absolute;left:72px;right:72px;bottom:70px;height:6px;border-radius:3px;background:linear-gradient(90deg,var(--green) 0%,var(--green) 70%,rgba(30,184,133,0) 100%)}
  .yr{position:absolute;bottom:92px;transform:translateX(-50%);color:var(--muted);font-weight:700;font-size:20px}
  .tick{position:absolute;bottom:64px;width:3px;height:18px;background:var(--fg);border-radius:2px}
  .arrow{position:absolute;right:48px;bottom:56px;font-size:34px;color:rgba(30,184,133,.5);font-weight:800}
  .three{position:absolute;left:400px;top:210px;display:flex;gap:12px}
  .three span{width:46px;height:46px;border-radius:50%;border:3px dashed var(--gold)}
  </style><div class="wrap">
  <img class="logo" src="${LOGO}">
  <div class="inf h">∞</div>
  <div class="r"><div class="ln" style="width:60%;margin:0 auto 26px"></div>
    <div class="ln" style="width:90%"></div><div class="ln f1" style="width:75%"></div><div class="ln f1" style="width:85%"></div>
    <div class="ln f2" style="width:70%"></div><div class="ln f2" style="width:92%"></div><div class="ln f3" style="width:66%"></div>
    <div class="ln f3" style="width:80%"></div><div class="ln f4" style="width:55%"></div><div class="bc"></div></div>
  <div class="tl"></div>
  ${years.map((y, i) => { const x = 72 + i * 230; return `<div class="tick" style="left:${x}px"></div><div class="yr" style="left:${x}px">${y}</div>`; }).join('')}
  <div class="arrow">→</div>
  </div>`;
}

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const only = process.argv[3];
  let jobs = [['cover.png', cover(), 1200, 630], ['delais-fr.png', unlimited('fr'), 1200, 675], ['delais-en.png', unlimited('en'), 1200, 675]];
  if (only) jobs = jobs.filter(j => j[0].startsWith(only));
  for (const [name, html, w, h] of jobs) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
