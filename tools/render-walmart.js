// Visuels de posts/politique-retour-walmart. Usage: node render-walmart.js <outDir> [prefix]
// Gabarits : calendar() (délais sur un axe de dates réelles, avec prolongation, ex. retours des Fêtes) et vsWarranty() (copié de render-rona.js).
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
  fr: { eyebrow: 'Walmart Canada · retours des Fêtes 2026', title: 'Quand faut-il rapporter un article non ouvert?',
    ln: 'Délai normal', le: 'Prolongation des Fêtes (jusqu’au 24 janvier 2027)',
    rows: [['Téléviseur · 1er nov.', 'Électronique, 30 jours', '2026-11-01', '2026-12-01', '2027-01-24', '24 janv.'],
      ['Console · 27 nov.', 'Électronique, 30 jours', '2026-11-27', '2026-12-27', '2027-01-24', '24 janv.'],
      ['Tablette · 24 déc.', 'Électronique, 30 jours', '2026-12-24', '2027-01-23', '2027-01-24', '24 janv.'],
      ['Jouet · 15 déc.', 'Délai général, 90 jours', '2026-12-15', '2027-03-15', null, '15 mars'],
      ['Cellulaire à contrat · 27 nov.', 'Postpayé, 14 jours, exclu', '2026-11-27', '2026-12-11', null, '11 déc.']],
    axis: ['2026-11-01', '2027-03-31'], marker: ['2027-01-24', ''],
    ticks: [['2026-11-01', 'nov.'], ['2026-12-01', 'déc.'], ['2027-01-01', 'janv.'], ['2027-02-01', 'févr.'], ['2027-03-01', 'mars']],
    src: 'Calcul ReFound d’après walmart.ca · vérifié le 4 novembre 2026 · articles non ouverts, à l’échelle' },
  en: { eyebrow: 'Walmart Canada · 2026 holiday returns', title: 'When do you need to bring back an unopened item?',
    ln: 'Regular window', le: 'Holiday extension (until January 24, 2027)',
    rows: [['TV · Nov 1', 'Electronics, 30 days', '2026-11-01', '2026-12-01', '2027-01-24', 'Jan 24'],
      ['Game console · Nov 27', 'Electronics, 30 days', '2026-11-27', '2026-12-27', '2027-01-24', 'Jan 24'],
      ['Tablet · Dec 24', 'Electronics, 30 days', '2026-12-24', '2027-01-23', '2027-01-24', 'Jan 24'],
      ['Toy · Dec 15', 'General window, 90 days', '2026-12-15', '2027-03-15', null, 'Mar 15'],
      ['Contract phone · Nov 27', 'Post-paid, 14 days, excluded', '2026-11-27', '2026-12-11', null, 'Dec 11']],
    axis: ['2026-11-01', '2027-03-31'], marker: ['2027-01-24', ''],
    ticks: [['2026-11-01', 'Nov'], ['2026-12-01', 'Dec'], ['2027-01-01', 'Jan'], ['2027-02-01', 'Feb'], ['2027-03-01', 'Mar']],
    src: 'ReFound calculation based on walmart.ca · checked November 4, 2026 · unopened items, to scale' }
};
const V = {
  fr: { eyebrow: 'Walmart · Québec · achat neuf depuis le 5 octobre 2026', title: 'Retour : 30 jours. Garantie : des années.', yr: 'ans',
    lr: 'Délai de retour Walmart (électronique)', lw: 'Garantie de bon fonctionnement (Québec)', axis: 'années après l’achat ou la livraison',
    rows: [['Téléviseur', 30, 'retour 30 j', 4], ['Ordinateur portable', 30, 'retour 30 j', 3], ['Console de jeu', 30, 'retour 30 j', 3], ['Tablette', 30, 'retour 30 j', 3], ['Cellulaire déverrouillé', 30, 'retour 30 j', 3]],
    src: 'Sources : walmart.ca, Gouvernement du Québec · vérifié le 4 novembre 2026 · à l’échelle' },
  en: { eyebrow: 'Walmart · Quebec · bought new since October 5, 2026', title: 'Returns: 30 days. Warranty: years.', yr: 'yrs',
    lr: 'Walmart return window (electronics)', lw: 'Warranty of good working order (Quebec)', axis: 'years after purchase or delivery',
    rows: [['TV', 30, '30-day return', 4], ['Laptop', 30, '30-day return', 3], ['Game console', 30, '30-day return', 3], ['Tablet', 30, '30-day return', 3], ['Unlocked phone', 30, '30-day return', 3]],
    src: 'Sources: walmart.ca, Government of Quebec · checked November 4, 2026 · to scale' }
};

function cover() {
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 85% 30%, rgba(30,184,133,.18), transparent 70%), var(--bg)}
  .left{position:absolute;left:72px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:28px;width:560px}
  .left img{height:34px;align-self:flex-start}
  .big{font-size:120px;line-height:.92;font-weight:800;letter-spacing:-.02em}.big em{font-style:normal;color:var(--green)}
  .chips{display:flex;gap:14px}.chip{border:2px solid var(--line);background:var(--card);border-radius:999px;padding:10px 22px;font-weight:800;font-size:28px}
  .r{position:absolute;right:96px;top:64px;width:460px;background:#F4F1E8;color:#2A2D33;border-radius:6px;padding:34px 32px 40px;transform:rotate(4deg);font-family:ui-monospace,Menlo,monospace;font-size:18px;box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .r .t{text-align:center;font-weight:700;letter-spacing:.2em;margin-bottom:22px}
  .r .l{display:grid;grid-template-columns:1fr auto;gap:12px;margin:9px 0}
  .r hr{border:0;border-top:2px dashed #B9B5AA;margin:20px 0}
  .stamp{position:absolute;right:66px;bottom:52px;width:164px;height:164px;border-radius:50%;background:var(--green);color:#0E1217;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-10deg);box-shadow:0 18px 40px rgba(0,0,0,.4);text-align:center}
  .stamp b{font-family:'Funnel Display';font-size:58px;line-height:1}.stamp span{font-weight:700;font-size:14px;letter-spacing:.08em}
  </style><div class="c"><div class="left"><img src="${LOGO}"><div class="big h"><em>Walmart</em></div>
  <div class="chips"><div class="chip h" style="color:var(--gold)">14</div><div class="chip h" style="color:#5FD3AE">30</div><div class="chip h" style="color:var(--green)">90</div></div></div>
  <div class="r"><div class="t">REÇU · RECEIPT</div>
  <div class="l"><span>TV 55" 4K</span><span>30 J</span></div>
  <div class="l"><span>CONSOLE</span><span>30 J</span></div>
  <div class="l"><span>JOUET / TOY</span><span>90 J</span></div>
  <hr><div class="l"><span>01/11 → 25/12</span><span>★</span></div><div class="l" style="color:#8A8579"><span>RETOUR / RETURN</span><span>24/01/27</span></div><hr>
  <div style="height:54px;background:repeating-linear-gradient(90deg,#2A2D33 0 3px,transparent 3px 6px,#2A2D33 6px 7px,transparent 7px 11px)"></div></div>
  <div class="stamp"><b>24.01</b><span>2027</span></div></div>`;
}
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const only = process.argv[3];
  let jobs = [['cover.png', cover(), 630]];
  for (const l of ['fr', 'en']) { jobs.push([`retours-fetes-${l}.png`, calendar(C[l]), 675]); jobs.push([`retour-vs-garantie-${l}.png`, vsWarranty(V[l], 4), 675]); }
  if (only) jobs = jobs.filter(j => j[0].startsWith(only));
  const b = await chromium.launch();
  for (const [name, html, h] of jobs) {
    const p = await b.newPage({ viewport: { width: 1200, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
