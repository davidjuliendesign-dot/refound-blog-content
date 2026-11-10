// Visuels de posts/politique-retour-best-buy. Usage: node render-best-buy.js <outDir> [prefix]
// Gabarits repris de render-walmart.js : calendar() (retours des Fêtes, avec cas où le délai normal dépasse la prolongation) et vsWarranty() (axe de 6 ans, gros électroménagers).
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


// rows: [label, returnDays, returnLabel, warrantyYears]; axis in years
function vsWarranty(t, maxY) {
  const D = maxY * 365.25;
  const rows = t.rows.map(([a, rd, rl, y, col]) => `<div class="row"><div class="a">${a}</div>
    <div class="track"><div class="gw" style="width:${y * 365.25 / D * 100}%${col ? ';background:' + col : ''}"><span class="h">${y} ${t.yr}</span></div>
    ${rd ? `<div class="rt" style="width:${rd / D * 100}%"></div>` : ''}
    <span class="rl" style="color:var(--gold)">${rl}</span></div></div>`).join('');
  const ticks = Array.from({ length: maxY + 1 }, (_, i) => `<span style="left:${i / maxY * 100}%">${i}</span>`).join('');
  return `<style>${CSS}
  .legend{display:flex;gap:28px;margin-top:18px;font-size:16px;color:var(--muted)}.legend i{display:inline-block;width:14px;height:14px;border-radius:3px;margin-right:8px;vertical-align:-2px}
  .rows{margin-top:24px;display:grid;gap:16px}
  .row{display:grid;grid-template-columns:250px 1fr;gap:24px;align-items:center}
  .a{font-weight:700;font-size:21px}
  .track{height:50px;background:var(--card);border:1px solid var(--line);border-radius:10px;position:relative;overflow:hidden}
  .gw{position:absolute;left:0;top:0;bottom:0;background:var(--green);border-radius:9px;display:flex;align-items:center;justify-content:flex-end;padding-right:16px}
  .gw span{color:#0E1217;font-weight:800;font-size:22px}
  .rt{position:absolute;left:0;top:0;bottom:0;background:var(--gold);min-width:4px}
  .rl{position:absolute;left:14px;top:50%;transform:translateY(-50%);font-weight:700;font-size:15px;background:#0E1217;padding:3px 9px;border-radius:6px}
  .axis{display:grid;grid-template-columns:250px 1fr;gap:24px;color:var(--muted);font-size:15px;margin-top:8px}
  .axis div:last-child{position:relative;height:18px}.axis span{position:absolute;transform:translateX(-50%)}.axis span:first-child{transform:none}.axis span:last-child{transform:translateX(-100%)}
  .axl{text-align:right;color:var(--muted);font-size:14px;margin-top:2px}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="legend"><span><i style="background:var(--gold)"></i>${t.lr}</span><span><i style="background:var(--green)"></i>${t.lw}</span>${t.lw2 ? `<span><i style="background:#7FA8FF"></i>${t.lw2}</span>` : ''}</div>
  <div class="rows">${rows}</div>
  <div class="axis"><div></div><div>${ticks}</div></div><div class="axl">${t.axis}</div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

// calendar(): rows = [label, sub, startISO, normalEndISO, extendedEndISO|null, endLabel]; axis = [fromISO, toISO]; marker = [ISO, label]
const day = s => Date.parse(s + 'T12:00:00Z') / 864e5;
function calendar(t) {
  const [a0, a1] = t.axis.map(day); const span = a1 - a0; const x = s => (day(s) - a0) / span * 100;
  const rows = t.rows.map(([lab, sub, s, n, e, el]) => {
    const l = x(s), wn = x(n) - l, we = e ? x(e) - x(n) : 0;
    const endX = e ? x(e) : x(n);
    return `<div class="row"><div><div class="a">${lab}</div><div class="b">${sub}</div></div>
    <div class="track"><div class="bn" style="left:${l}%;width:${wn}%"></div>
    ${we > 0 ? `<div class="be" style="left:${x(n)}%;width:${we}%"></div>` : ''}
    <span class="h val" style="${endX > 72 ? `right:${100 - endX}%;margin-right:10px;text-align:right` : `left:calc(${endX}% + 10px)`}">${el}</span></div></div>`;
  }).join('');
  return `<style>${CSS}
  .legend{display:flex;gap:28px;margin-top:16px;font-size:16px;color:var(--muted)}.legend i{display:inline-block;width:14px;height:14px;border-radius:3px;margin-right:8px;vertical-align:-2px}
  .rows{margin-top:22px;display:grid;gap:12px;position:relative}
  .row{display:grid;grid-template-columns:300px 1fr;gap:24px;align-items:center}
  .a{font-weight:700;font-size:20px}.b{color:var(--muted);font-size:14px;margin-top:2px}
  .track{height:44px;background:var(--card);border:1px solid var(--line);border-radius:10px;position:relative}
  .bn{position:absolute;top:6px;bottom:6px;background:var(--gold);border-radius:6px 0 0 6px;min-width:4px}
  .be{position:absolute;top:6px;bottom:6px;background:var(--green);border-radius:0 6px 6px 0}
  .val{position:absolute;top:50%;transform:translateY(-50%);font-weight:800;font-size:18px;white-space:nowrap;background:#0E1217;padding:2px 8px;border-radius:6px}
  .grid{display:grid;grid-template-columns:300px 1fr;gap:24px;position:absolute;inset:0;pointer-events:none}
  .mk{position:absolute;top:-8px;bottom:-8px;border-left:2px dashed var(--green)}
  .axis{display:grid;grid-template-columns:300px 1fr;gap:24px;color:var(--muted);font-size:15px;margin-top:10px}
  .axis div:last-child{position:relative;height:18px}.axis span{position:absolute;transform:translateX(-50%);white-space:nowrap}
  .mkl{color:var(--green);font-weight:700}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="legend"><span><i style="background:var(--gold)"></i>${t.ln}</span><span><i style="background:var(--green)"></i>${t.le}</span></div>
  <div class="rows">${rows}<div class="grid"><div></div><div style="position:relative"><div class="mk" style="left:${x(t.marker[0])}%"></div></div></div></div>
  <div class="axis"><div></div><div>${t.ticks.map(([s, l]) => `<span style="left:${x(s)}%">${l}</span>`).join('')}<span class="mkl" style="left:${x(t.marker[0])}%;top:22px">${t.marker[1]}</span></div></div>
  <div class="foot" style="margin-top:auto"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

const C = {
  fr: { eyebrow: 'Best Buy Canada · retours des Fêtes 2026', title: 'Jusqu’à quand rapporter un achat des Fêtes?',
    ln: 'Délai normal (30 jours, 15 pour un cellulaire avec forfait)', le: 'Prolongation jusqu’au 10 janvier 2027',
    rows: [['Téléviseur · 2 nov.', 'Début de la période des Fêtes', '2026-11-02', '2026-12-02', '2027-01-10', '10 janv.'],
      ['Console · 27 nov.', 'Vendredi fou', '2026-11-27', '2026-12-27', '2027-01-10', '10 janv.'],
      ['Portable · 11 déc.', 'Les deux règles donnent la même date', '2026-12-11', '2027-01-10', null, '10 janv.'],
      ['Écouteurs · 20 déc.', '30 jours, plus tard que le 10 janv.', '2026-12-20', '2027-01-19', null, '19 janv.'],
      ['Cellulaire avec forfait · 27 nov.', '15 jours, exclu de la prolongation', '2026-11-27', '2026-12-12', null, '12 déc.']],
    axis: ['2026-11-01', '2027-01-31'], marker: ['2027-01-10', ''],
    ticks: [['2026-11-01', 'nov.'], ['2026-12-01', 'déc.'], ['2027-01-01', 'janv.']],
    src: 'Calcul ReFound d’après bestbuy.ca · vérifié le 10 novembre 2026 · achats en magasin, à l’échelle' },
  en: { eyebrow: 'Best Buy Canada · 2026 holiday returns', title: 'Holiday purchases: what is the last day?',
    ln: 'Regular window (30 days, 15 for a phone on a carrier plan)', le: 'Extension to January 10, 2027',
    rows: [['TV · Nov 2', 'Start of the holiday period', '2026-11-02', '2026-12-02', '2027-01-10', 'Jan 10'],
      ['Game console · Nov 27', 'Black Friday', '2026-11-27', '2026-12-27', '2027-01-10', 'Jan 10'],
      ['Laptop · Dec 11', 'Both rules give the same date', '2026-12-11', '2027-01-10', null, 'Jan 10'],
      ['Headphones · Dec 20', '30 days, later than Jan 10', '2026-12-20', '2027-01-19', null, 'Jan 19'],
      ['Carrier-plan phone · Nov 27', '15 days, excluded from extension', '2026-11-27', '2026-12-12', null, 'Dec 12']],
    axis: ['2026-11-01', '2027-01-31'], marker: ['2027-01-10', ''],
    ticks: [['2026-11-01', 'Nov'], ['2026-12-01', 'Dec'], ['2027-01-01', 'Jan']],
    src: 'ReFound calculation based on bestbuy.ca · checked November 10, 2026 · in-store purchases, to scale' }
};
const V = {
  fr: { eyebrow: 'Best Buy · Québec · achat neuf depuis le 5 octobre 2026', title: 'Retour : 30 jours. Garantie : jusqu’à 6 ans.', yr: 'ans',
    lr: 'Délai de retour Best Buy', lw: 'Garantie de bon fonctionnement (Québec)', axis: 'années après la livraison',
    rows: [['Réfrigérateur', 30, 'retour 30 j', 6], ['Laveuse', 30, 'retour 30 j', 5], ['Téléviseur', 30, 'retour 30 j', 4], ['Ordinateur portable', 30, 'retour 30 j', 3], ['Cellulaire déverrouillé', 30, 'retour 30 j', 3]],
    src: 'Sources : bestbuy.ca, Gouvernement du Québec · vérifié le 10 novembre 2026 · à l’échelle' },
  en: { eyebrow: 'Best Buy · Quebec · bought new since October 5, 2026', title: 'Returns: 30 days. Warranty: up to 6 years.', yr: 'yrs',
    lr: 'Best Buy return window', lw: 'Warranty of good working order (Quebec)', axis: 'years after delivery',
    rows: [['Refrigerator', 30, '30-day return', 6], ['Washer', 30, '30-day return', 5], ['TV', 30, '30-day return', 4], ['Laptop', 30, '30-day return', 3], ['Unlocked phone', 30, '30-day return', 3]],
    src: 'Sources: bestbuy.ca, Government of Quebec · checked November 10, 2026 · to scale' }
};

function cover() {
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 85% 30%, rgba(30,184,133,.18), transparent 70%), var(--bg)}
  .left{position:absolute;left:72px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:28px;width:560px}
  .left img{height:34px;align-self:flex-start}
  .big{font-size:112px;line-height:.92;font-weight:800;letter-spacing:-.02em}.big em{font-style:normal;color:var(--green)}
  .chips{display:flex;gap:14px}.chip{border:2px solid var(--line);background:var(--card);border-radius:999px;padding:10px 22px;font-weight:800;font-size:28px}
  .r{position:absolute;right:96px;top:64px;width:460px;background:#F4F1E8;color:#2A2D33;border-radius:6px;padding:34px 32px 40px;transform:rotate(4deg);font-family:ui-monospace,Menlo,monospace;font-size:18px;box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .r .t{text-align:center;font-weight:700;letter-spacing:.2em;margin-bottom:22px}
  .r .l{display:grid;grid-template-columns:1fr auto;gap:12px;margin:9px 0}
  .r hr{border:0;border-top:2px dashed #B9B5AA;margin:20px 0}
  .stamp{position:absolute;right:66px;bottom:52px;width:164px;height:164px;border-radius:50%;background:var(--green);color:#0E1217;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-10deg);box-shadow:0 18px 40px rgba(0,0,0,.4);text-align:center}
  .stamp b{font-family:'Funnel Display';font-size:58px;line-height:1}.stamp span{font-weight:700;font-size:14px;letter-spacing:.08em}
  </style><div class="c"><div class="left"><img src="${LOGO}"><div class="big h"><em>Best Buy</em></div>
  <div class="chips"><div class="chip h" style="color:var(--gold)">15</div><div class="chip h" style="color:var(--green)">30</div><div class="chip h" style="color:#5FD3AE">4 ans · yrs</div></div></div>
  <div class="r"><div class="t">REÇU · RECEIPT</div>
  <div class="l"><span>TV 65" 4K</span><span>30 J</span></div>
  <div class="l"><span>CONSOLE</span><span>30 J</span></div>
  <div class="l"><span>CELL + FORFAIT/PLAN</span><span>15 J</span></div>
  <hr><div class="l"><span>02/11 → 31/12</span><span>★</span></div><div class="l" style="color:#8A8579"><span>RETOUR / RETURN</span><span>10/01/27</span></div><hr>
  <div style="height:54px;background:repeating-linear-gradient(90deg,#2A2D33 0 3px,transparent 3px 6px,#2A2D33 6px 7px,transparent 7px 11px)"></div></div>
  <div class="stamp"><b>10.01</b><span>2027</span></div></div>`;
}
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const only = process.argv[3];
  let jobs = [['cover.png', cover(), 630]];
  for (const l of ['fr', 'en']) { jobs.push([`retours-fetes-${l}.png`, calendar(C[l]), 675]); jobs.push([`retour-vs-garantie-${l}.png`, vsWarranty(V[l], 6), 675]); }
  if (only) jobs = jobs.filter(j => j[0].startsWith(only));
  const b = await chromium.launch();
  for (const [name, html, h] of jobs) {
    const p = await b.newPage({ viewport: { width: 1200, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
