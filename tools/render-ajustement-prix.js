// Visuels de posts/ajustement-de-prix. Usage: node render-ajustement-prix.js <outDir> [prefix]
// calendar() de render-walmart.js réutilisé pour des fenêtres d'ajustement de prix (achat le même jour, fins différentes, repère Vendredi fou).
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
  const rows = t.rows.map(([lab, sub, s, n, e, el, inside]) => {
    const l = x(s), wn = x(n) - l, we = e ? x(e) - x(n) : 0;
    const endX = e ? x(e) : x(n);
    return `<div class="row"><div><div class="a">${lab}</div><div class="b">${sub}</div></div>
    <div class="track"><div class="bn" style="left:${l}%;width:${wn}%"></div>
    ${we > 0 ? `<div class="be" style="left:${x(n)}%;width:${we}%"></div>` : ''}
    <span class="h val" style="${endX > 72 || inside ? `right:${100 - endX}%;margin-right:10px;text-align:right` : `left:calc(${endX}% + 10px)`}">${el}</span></div></div>`;
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
  <div class="legend"><span><i style="background:var(--gold)"></i>${t.ln}</span>${t.le ? `<span><i style="background:var(--green)"></i>${t.le}</span>` : ""}</div>
  <div class="rows">${rows}<div class="grid"><div></div><div style="position:relative"><div class="mk" style="left:${x(t.marker[0])}%"></div></div></div></div>
  <div class="axis"><div></div><div>${t.ticks.map(([s, l]) => `<span style="left:${x(s)}%">${l}</span>`).join('')}<span class="mkl" style="left:${x(t.marker[0])}%;top:22px">${t.marker[1]}</span></div></div>
  <div class="foot" style="margin-top:auto"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

const C = {
  fr: { eyebrow: 'Achat le 11 novembre 2026', title: 'Jusqu’à quand une baisse de prix compte-t-elle?',
    ln: 'Fenêtre d’ajustement de prix', le: '',
    rows: [['Walmart', 'Achat en magasin, 30 jours, avec reçu', '2026-11-11', '2026-12-11', null, '11 déc.'],
      ['Best Buy', 'Son propre prix réduit, 30 jours', '2026-11-11', '2026-12-11', null, '11 déc.'],
      ['IKEA', '30 jours, demande pendant la promotion', '2026-11-11', '2026-12-11', null, '11 déc.'],
      ['Home Depot', 'Gros électroménagers seulement, 30 jours', '2026-11-11', '2026-12-11', null, '11 déc.'],
      ['Decathlon', '14 jours, prix réduit encore en vigueur', '2026-11-11', '2026-11-25', null, '25 nov.', 1]],
    axis: ['2026-11-01', '2026-12-31'], marker: ['2026-11-27', 'Vendredi fou · 27 nov.'],
    ticks: [['2026-11-01', '1er nov.'], ['2026-11-15', '15 nov.'], ['2026-12-01', '1er déc.'], ['2026-12-15', '15 déc.'], ['2026-12-31', '31 déc.']],
    src: 'Calcul ReFound d’après les politiques officielles · vérifié le 11 novembre 2026 · à l’échelle' },
  en: { eyebrow: 'Bought on November 11, 2026', title: 'Until when does a price drop count?',
    ln: 'Price adjustment window', le: '',
    rows: [['Walmart', 'In-store purchase, 30 days, with receipt', '2026-11-11', '2026-12-11', null, 'Dec 11'],
      ['Best Buy', 'Its own price reduced, 30 days', '2026-11-11', '2026-12-11', null, 'Dec 11'],
      ['IKEA', '30 days, ask during the promotion', '2026-11-11', '2026-12-11', null, 'Dec 11'],
      ['Home Depot', 'Major appliances only, 30 days', '2026-11-11', '2026-12-11', null, 'Dec 11'],
      ['Decathlon', '14 days, lower price still in effect', '2026-11-11', '2026-11-25', null, 'Nov 25', 1]],
    axis: ['2026-11-01', '2026-12-31'], marker: ['2026-11-27', 'Black Friday · Nov 27'],
    ticks: [['2026-11-01', 'Nov 1'], ['2026-11-15', 'Nov 15'], ['2026-12-01', 'Dec 1'], ['2026-12-15', 'Dec 15'], ['2026-12-31', 'Dec 31']],
    src: 'ReFound calculation based on official policies · checked November 11, 2026 · to scale' }
};

function cover() {
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 85% 30%, rgba(30,184,133,.18), transparent 70%), var(--bg)}
  .left{position:absolute;left:72px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:28px;width:520px}
  .left img{height:34px;align-self:flex-start}
  .big{font-size:150px;line-height:.9;font-weight:800;letter-spacing:-.02em}.big em{font-style:normal;color:var(--green)}
  .chips{display:flex;gap:14px}.chip{border:2px solid var(--line);background:var(--card);border-radius:999px;padding:10px 22px;font-weight:800;font-size:28px}
  .r{position:absolute;right:96px;top:70px;width:460px;background:#F4F1E8;color:#2A2D33;border-radius:6px;padding:34px 32px 40px;transform:rotate(4deg);font-family:ui-monospace,Menlo,monospace;font-size:19px;box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .r .t{text-align:center;font-weight:700;letter-spacing:.2em;margin-bottom:22px}
  .r .l{display:grid;grid-template-columns:1fr auto;gap:12px;margin:10px 0}
  .r hr{border:0;border-top:2px dashed #B9B5AA;margin:20px 0}
  .r s{color:#8A8579}.r .n{color:#0F8A62;font-weight:700}
  .stamp{position:absolute;right:66px;bottom:52px;width:164px;height:164px;border-radius:50%;background:var(--green);color:#0E1217;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-10deg);box-shadow:0 18px 40px rgba(0,0,0,.4);text-align:center}
  .stamp b{font-family:'Funnel Display';font-size:52px;line-height:1}.stamp span{font-weight:700;font-size:16px;letter-spacing:.08em}
  </style><div class="c"><div class="left"><img src="${LOGO}"><div class="big h"><em>$</em>&#8202;↓</div>
  <div class="chips"><div class="chip h" style="color:var(--gold)">14</div><div class="chip h" style="color:var(--green)">30</div></div></div>
  <div class="r"><div class="t">REÇU · RECEIPT</div>
  <div class="l"><span>11/11/2026</span><span></span></div>
  <div class="l"><span>ASPIRATEUR / VACUUM</span><span>349,99</span></div>
  <hr><div class="l"><span>27/11/2026</span><span>★</span></div>
  <div class="l"><span><s>349,99</s></span><span class="n">279,99</span></div>
  <div class="l"><span>Δ</span><span class="n">−70,00</span></div><hr>
  <div style="height:54px;background:repeating-linear-gradient(90deg,#2A2D33 0 3px,transparent 3px 6px,#2A2D33 6px 7px,transparent 7px 11px)"></div></div>
  <div class="stamp"><b>+30</b><span>J · DAYS</span></div></div>`;
}
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const only = process.argv[3];
  let jobs = [['cover.png', cover(), 630]];
  for (const l of ['fr', 'en']) jobs.push([`fenetres-ajustement-${l}.png`, calendar(C[l]), 675]);
  if (only) jobs = jobs.filter(j => j[0].startsWith(only));
  const b = await chromium.launch();
  for (const [name, html, h] of jobs) {
    const p = await b.newPage({ viewport: { width: 1200, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
