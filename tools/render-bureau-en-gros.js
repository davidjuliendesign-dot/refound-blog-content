// Visuels de posts/politique-retour-bureau-en-gros. Usage: node render-bureau-en-gros.js <outDir> [prefix]
// Gabarits : windows() (copié de render-costco.js : un même délai comparé entre marchands)
// et deadlines() (échéances d'un même achat sur un axe de vraies dates, avec une ligne « hors axe »
// pour une garantie de plusieurs années qui continue au-delà du graphique).
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

// windows(): rows = [days, label, sub, color, valueLabel]; axis 0..max days
function windows(t, max, ticks) {
  const rows = t.rows.map(([d, a, b, col, v]) => {
    const w = d / max * 100;
    const inside = w > 60;
    return `<div class="row"><div class="lab"><div class="a">${a}</div><div class="b">${b}</div></div>
    <div class="track">${d ? `<div class="bar" style="width:${w}%;background:${col}"></div>` : ''}
    <span class="h val" style="${inside ? `right:16px;color:#0E1217` : `left:calc(${w}% + 14px)`};${d ? '' : 'color:' + col}">${v}</span></div></div>`;
  }).join('');
  return `<style>${CSS}
  .rows{margin-top:34px;display:grid;gap:20px}
  .row{display:grid;grid-template-columns:340px 1fr;gap:28px;align-items:center}
  .a{font-weight:700;font-size:22px}.b{color:var(--muted);font-size:15px;margin-top:4px;line-height:1.35}
  .track{height:58px;background:var(--card);border:1px solid var(--line);border-radius:12px;position:relative}
  .bar{height:100%;border-radius:11px}
  .val{position:absolute;top:50%;transform:translateY(-50%);font-weight:800;font-size:24px;white-space:nowrap}
  .axis{display:grid;grid-template-columns:340px 1fr;gap:28px;color:var(--muted);font-size:15px;margin-top:10px}
  .axis div:last-child{position:relative;height:18px}.axis span{position:absolute;transform:translateX(-50%)}.axis span:first-child{transform:none}.axis span:last-child{transform:translateX(-100%)}
  .axl{text-align:right;color:var(--muted);font-size:14px;margin-top:4px}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="rows">${rows}</div>
  <div class="axis"><div></div><div>${ticks.map(([v, l]) => `<span style="left:${v / max * 100}%">${l}</span>`).join('')}</div></div>
  ${t.axl ? `<div class="axl">${t.axl}</div>` : ''}
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

// deadlines(): rows = [label, sub, startISO, endISO|null, endLabel, color]; endISO null = continues beyond the axis (fade + arrow)
const day = s => Date.parse(s + 'T12:00:00Z') / 864e5;
function deadlines(t) {
  const [a0, a1] = t.axis.map(day); const span = a1 - a0; const x = s => (day(s) - a0) / span * 100;
  const rows = t.rows.map(([lab, sub, s, e, el, col]) => {
    const l = x(s);
    if (!e) return `<div class="row"><div><div class="a">${lab}</div><div class="b">${sub}</div></div>
      <div class="track"><div class="bar" style="left:${l}%;right:0;background:linear-gradient(90deg,${col} 70%,rgba(30,184,133,.15));border-radius:6px 0 0 6px"></div>
      <span class="h val" style="right:12px;text-align:right">${el} →</span></div></div>`;
    const endX = x(e);
    return `<div class="row"><div><div class="a">${lab}</div><div class="b">${sub}</div></div>
    <div class="track"><div class="bar" style="left:${l}%;width:${endX - l}%;background:${col}"></div>
    <span class="h val" style="${endX > 72 ? `right:${100 - endX}%;margin-right:10px` : `left:calc(${endX}% + 10px)`}">${el}</span></div></div>`;
  }).join('');
  return `<style>${CSS}
  .rows{margin-top:36px;display:grid;gap:22px}
  .row{display:grid;grid-template-columns:330px 1fr;gap:24px;align-items:center}
  .a{font-weight:700;font-size:21px}.b{color:var(--muted);font-size:15px;margin-top:3px}
  .track{height:58px;background:var(--card);border:1px solid var(--line);border-radius:10px;position:relative}
  .bar{position:absolute;top:9px;bottom:9px;border-radius:6px;min-width:4px}
  .val{position:absolute;top:50%;transform:translateY(-50%);font-weight:800;font-size:18px;white-space:nowrap;background:#0E1217;padding:2px 8px;border-radius:6px}
  .axis{display:grid;grid-template-columns:330px 1fr;gap:24px;color:var(--muted);font-size:15px;margin-top:10px}
  .axis div:last-child{position:relative;height:18px}.axis span{position:absolute;transform:translateX(-50%);white-space:nowrap}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="rows">${rows}</div>
  <div class="axis"><div></div><div>${t.ticks.map(([s, l]) => `<span style="left:${x(s)}%">${l}</span>`).join('')}</div></div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

const G = 'var(--gold)', E = 'var(--green)', B = '#7FA8FF', M = '#5FD3AE';
const W = {
  fr: { eyebrow: 'Ordinateur portable · délai de retour', title: 'Le délai le plus court des quatre magasins',
    rows: [[14, 'Bureau en Gros', 'Articles technologiques, depuis l’achat en magasin ou la livraison', G, '14 jours'],
      [30, 'Walmart', 'Électronique grand public', M, '30 jours'],
      [30, 'Home Depot', 'Ordinateurs, avec reçu', M, '30 jours'],
      [90, 'Costco', 'Ordinateurs, depuis la date d’achat', E, '90 jours']],
    axl: 'jours',
    src: 'Sources : staples.ca, walmart.ca, homedepot.ca, costco.ca · vérifié le 8 novembre 2026 · à l’échelle' },
  en: { eyebrow: 'Laptop · return window', title: 'The shortest window of the four stores',
    rows: [[14, 'Staples', 'Tech items, from in-store purchase or delivery', G, '14 days'],
      [30, 'Walmart', 'Consumer electronics', M, '30 days'],
      [30, 'Home Depot', 'Computers, with a receipt', M, '30 days'],
      [90, 'Costco', 'Computers, from the purchase date', E, '90 days']],
    axl: 'days',
    src: 'Sources: staples.ca, walmart.ca, homedepot.ca, costco.ca · checked November 8, 2026 · to scale' }
};
const D = {
  fr: { eyebrow: 'Portable acheté en magasin au Québec · Vendredi fou, 27 novembre 2026', title: 'Quatre échéances, quatre dates différentes',
    rows: [['Annuler un plan de protection', 'Garantie supplémentaire, 10 jours*', '2026-11-27', '2026-12-07', '7 déc.', B],
      ['Retourner le portable', 'Article technologique, 14 jours', '2026-11-27', '2026-12-11', '11 déc.', G],
      ['Retourner une chaise de bureau', 'Délai général, 30 jours', '2026-11-27', '2026-12-27', '27 déc.', M],
      ['Faire réparer le portable', 'Garantie de bon fonctionnement, 3 ans', '2026-11-27', null, '27 nov. 2029', E]],
    axis: ['2026-11-20', '2027-01-10'],
    ticks: [['2026-11-27', '27 nov.'], ['2026-12-07', '7 déc.'], ['2026-12-14', '14 déc.'], ['2026-12-21', '21 déc.'], ['2026-12-28', '28 déc.'], ['2027-01-04', '4 janv.']],
    src: 'Calcul ReFound d’après staples.ca et opc.gouv.qc.ca · vérifié le 8 novembre 2026 · *sauf contrat avec un assureur' },
  en: { eyebrow: 'Laptop bought in store in Quebec · Black Friday, November 27, 2026', title: 'Four deadlines, four different dates',
    rows: [['Cancel a protection plan', 'Extended warranty, 10 days*', '2026-11-27', '2026-12-07', 'Dec 7', B],
      ['Return the laptop', 'Tech item, 14 days', '2026-11-27', '2026-12-11', 'Dec 11', G],
      ['Return an office chair', 'General window, 30 days', '2026-11-27', '2026-12-27', 'Dec 27', M],
      ['Get the laptop repaired', 'Warranty of good working order, 3 years', '2026-11-27', null, 'Nov 27, 2029', E]],
    axis: ['2026-11-20', '2027-01-10'],
    ticks: [['2026-11-27', 'Nov 27'], ['2026-12-07', 'Dec 7'], ['2026-12-14', 'Dec 14'], ['2026-12-21', 'Dec 21'], ['2026-12-28', 'Dec 28'], ['2027-01-04', 'Jan 4']],
    src: 'ReFound calculation based on staples.ca and opc.gouv.qc.ca · checked November 8, 2026 · *unless the contract is with an insurer' }
};

function cover() {
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 80% 35%, rgba(30,184,133,.18), transparent 70%), var(--bg)}
  .left{position:absolute;left:72px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:30px;width:520px}
  .left img{height:34px;align-self:flex-start}
  .big{font-size:150px;line-height:.9;font-weight:800;letter-spacing:-.03em}.big em{font-style:normal;color:var(--gold)}
  .chips{display:flex;gap:14px}.chip{border:2px solid var(--line);background:var(--card);border-radius:999px;padding:10px 22px;font-weight:800;font-size:28px}
  .lap{position:absolute;right:120px;top:120px;width:470px}
  .scr{height:290px;background:var(--card);border:10px solid #2F3540;border-radius:18px 18px 4px 4px;position:relative;overflow:hidden}
  .scr .g{position:absolute;inset:0;display:grid;grid-template-columns:repeat(7,1fr);gap:8px;padding:22px}
  .scr .g i{background:#262C35;border-radius:6px}
  .scr .g i.on{background:var(--gold)}.scr .g i.end{background:var(--gold);outline:4px solid #F0F2F5}
  .base{height:22px;background:#3A414D;border-radius:0 0 22px 22px;margin:0 -34px}
  .tag{position:absolute;right:70px;bottom:70px;width:170px;height:170px;border-radius:50%;background:var(--green);color:#0E1217;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-10deg);box-shadow:0 18px 40px rgba(0,0,0,.4)}
  .tag b{font-family:'Funnel Display';font-size:64px;line-height:1}.tag span{font-weight:800;font-size:22px}
  </style><div class="c"><div class="left"><img src="${LOGO}"><div class="big h"><em>14</em><br>30</div>
  <div class="chips"><div class="chip h" style="color:var(--gold)">TECH</div><div class="chip h" style="color:#5FD3AE">+</div></div></div>
  <div class="lap"><div class="scr"><div class="g">${Array.from({ length: 21 }, (_, i) => `<i class="${i < 13 ? 'on' : i === 13 ? 'end' : ''}"></i>`).join('')}</div></div><div class="base"></div></div>
  <div class="tag"><b>3</b><span>QC · 2029</span></div></div>`;
}

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const only = process.argv[3];
  let jobs = [['cover.png', cover(), 630]];
  for (const l of ['fr', 'en']) {
    jobs.push([`portable-delais-${l}.png`, windows(W[l], 90, [[0, '0'], [14, '14'], [30, '30'], [60, '60'], [90, '90']]), 675]);
    jobs.push([`echeances-vendredi-fou-${l}.png`, deadlines(D[l]), 675]);
  }
  if (only) jobs = jobs.filter(j => j[0].startsWith(only));
  const b = await chromium.launch();
  for (const [name, html, h] of jobs) {
    const p = await b.newPage({ viewport: { width: 1200, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
