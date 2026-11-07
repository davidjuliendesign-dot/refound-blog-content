// Visuels de posts/retour-sans-recu. Usage: node render-retour-sans-recu.js <outDir> [prefix]
// Gabarits : layers() (repris de render-garantie-bon-fonctionnement.js, option t.compact pour 5 lignes) et cover() (reçu « manquant » en pointillé + carte de paiement).
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
.h{font-family:'Funnel Display',sans-serif}
.wrap{width:1200px;height:675px;padding:52px 64px 40px;display:flex;flex-direction:column}
.eyebrow{color:var(--green);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:18px}
h1{font-size:44px;line-height:1.1;margin-top:12px;font-weight:800}
.foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:16px;margin-top:auto}
.foot p{color:var(--muted);font-size:15px}.foot img{height:22px}`;
const LOGO = `data:image/png;base64,${b64('assets/logo-refound-light.png')}`;

// layers(): rows [label, sub, years, color, valueLabel, endLabel]; axis in years (0..maxY)
function layers(t, maxY) {
  const rows = t.rows.map(([a, b, y, col, v, end]) => {
    const w = y / maxY * 100;
    return `<div class="row"><div class="lab"><div class="a">${a}</div><div class="b">${b}</div></div>
    <div class="track"><div class="bar" style="width:${w}%;background:${col}"></div>
    <span class="val${w > 75 ? ' in' : ''}" style="${w > 75 ? `right:calc(${100 - w}% + 16px)` : `left:calc(${Math.max(w, 0.6)}% + 12px)`}"><b class="h">${v}</b> <i>${end}</i></span></div></div>`;
  }).join('');
  const ticks = Array.from({ length: maxY + 1 }, (_, i) => `<span style="left:${i / maxY * 100}%">${i}</span>`).join('');
  return `<style>${CSS}
  .rows{margin-top:30px;display:grid;gap:16px}
  .row{display:grid;grid-template-columns:300px 1fr;gap:24px;align-items:center}
  .a{font-weight:700;font-size:21px}.b{color:var(--muted);font-size:14px;margin-top:3px;line-height:1.3}
  .track{height:54px;background:var(--card);border:1px solid var(--line);border-radius:10px;position:relative}
  .bar{position:absolute;left:0;top:0;bottom:0;border-radius:9px;min-width:5px}
  .val{position:absolute;top:50%;transform:translateY(-50%);white-space:nowrap;font-size:16px;color:var(--muted)}
  .val b{font-size:22px;color:var(--fg);margin-right:6px}.val i{font-style:normal}.val.in,.val.in b{color:#0E1217}
  .axis{display:grid;grid-template-columns:300px 1fr;gap:24px;color:var(--muted);font-size:15px;margin-top:8px}
  .axis div:last-child{position:relative;height:18px}.axis span{position:absolute;transform:translateX(-50%)}.axis span:first-child{transform:none}.axis span:last-child{transform:translateX(-100%)}
  .axl{text-align:right;color:var(--muted);font-size:14px;margin-top:2px}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="rows">${rows}</div>
  <div class="axis"><div></div><div>${ticks}</div></div><div class="axl">${t.axis}</div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

// twoDates(): zoom (quelques semaines, jalons achat / livraison avec la preuve de chaque date) + ligne du temps complète
// à l'échelle en années (barre de garantie à partir de la livraison, fin fantôme si on comptait depuis l'achat).
// t.zoom = {from, to, marks:[[date, label, proof, color]]}; t.full = {from, to, start, end, ghost, years:[...], barLabel, ghostLabel}

const G = 'var(--green)', GOLD = 'var(--gold)', BLUE = '#7FA8FF', MINT = '#5FD3AE';
const L = {
  fr: { eyebrow: 'Sans reçu · recherche par carte vs durée des garanties', title: 'Retrouver l’achat : 90 jours. La garantie : des années.', axis: 'années après l’achat (garanties du Québec : à partir de la livraison)',
    rows: [['Recherche · Canadian Tire', 'Recherche de reçu : achats par carte de crédit ou de débit', 90 / 365.25, GOLD, '90 jours', ''],
      ['Recherche · Home Depot', 'Recherche de reçu : crédit, débit ou chèque', 90 / 365.25, GOLD, '90 jours', ''],
      ['Ordinateur portable (Québec)', 'Garantie de bon fonctionnement', 3, BLUE, '3 ans', ''],
      ['Téléviseur (Québec)', 'Garantie de bon fonctionnement', 4, MINT, '4 ans', ''],
      ['Lampe de garage NOMA', 'Garantie d’échange Canadian Tire (reçu démo ReFound)', 5, G, '5 ans', '']],
    src: 'Sources : canadiantire.ca, homedepot.ca, Office de la protection du consommateur · vérifié le 7 novembre 2026 · à l’échelle' },
  en: { eyebrow: 'No receipt · card look-up vs warranty length', title: 'Finding the purchase: 90 days. The warranty: years.', axis: 'years after purchase (Quebec warranties: from delivery)',
    rows: [['Look-up · Canadian Tire', 'Receipt look-up: credit or debit card purchases', 90 / 365.25, GOLD, '90 days', ''],
      ['Look-up · Home Depot', 'Receipt look-up: credit, debit or cheque', 90 / 365.25, GOLD, '90 days', ''],
      ['Laptop (Quebec)', 'Warranty of good working order', 3, BLUE, '3 years', ''],
      ['TV (Quebec)', 'Warranty of good working order', 4, MINT, '4 years', ''],
      ['NOMA garage light', 'Canadian Tire exchange warranty (ReFound demo receipt)', 5, G, '5 years', '']],
    src: 'Sources: canadiantire.ca, homedepot.ca, Office de la protection du consommateur · checked November 7, 2026 · to scale' }
};
const COMPACT = `<style>.rows{margin-top:24px!important;gap:12px!important}.track{height:48px!important}h1{font-size:38px!important}.row{grid-template-columns:330px 1fr!important}.axis{grid-template-columns:330px 1fr!important}</style>`;

function cover() {
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 85% 30%, rgba(30,184,133,.18), transparent 70%), var(--bg)}
  .left{position:absolute;left:72px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:30px;width:520px}
  .left img{height:34px;align-self:flex-start}
  .big{font-size:240px;line-height:.9;font-weight:800;letter-spacing:-.02em;color:var(--gold)}
  .chips{display:flex;gap:14px}.chip{border:2px solid var(--line);background:var(--card);border-radius:999px;padding:10px 22px;font-weight:800;font-size:28px}
  .ghost{position:absolute;right:430px;top:60px;width:340px;height:500px;border:4px dashed #4A5260;border-radius:8px;transform:rotate(-5deg);display:flex;align-items:center;justify-content:center}
  .ghost span{font-family:ui-monospace,Menlo,monospace;font-weight:700;font-size:24px;letter-spacing:.2em;color:#4A5260;position:absolute;top:34px}.ghost i{font-style:normal;font-family:'Funnel Display';font-weight:800;font-size:160px;color:#3A414D}
  .card{position:absolute;right:70px;bottom:110px;width:420px;height:260px;border-radius:22px;background:linear-gradient(135deg,#1EB885,#128A63);transform:rotate(6deg);box-shadow:0 30px 60px rgba(0,0,0,.5);padding:30px;color:#0E1217}
  .chipc{width:62px;height:46px;border-radius:9px;background:#F6B828;margin-top:30px}
  .num{white-space:nowrap;font-family:ui-monospace,Menlo,monospace;font-size:26px;letter-spacing:.1em;margin-top:30px;font-weight:700}
  </style><div class="c"><div class="left"><img src="${LOGO}"><div class="big h">?</div>
</div>
  <div class="ghost"><span>REÇU · RECEIPT</span><i>?</i></div>
  <div class="card"><div class="chipc"></div><div class="num">•••• •••• •••• 1234</div></div></div>`;
}
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const only = process.argv[3];
  let jobs = [['cover.png', cover(), 630]];
  for (const l of ['fr', 'en']) jobs.push([`recherche-vs-garantie-${l}.png`, COMPACT + layers(L[l], 5), 675]);
  if (only) jobs = jobs.filter(j => j[0].startsWith(only));
  const b = await chromium.launch();
  for (const [name, html, h] of jobs) {
    const p = await b.newPage({ viewport: { width: 1200, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
