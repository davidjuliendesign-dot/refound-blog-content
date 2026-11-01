// Visuels de posts/politique-retour-home-depot. Usage: node render-home-depot.js <outDir> [prefix]
// Gabarits réutilisables : windows() (délais de retour, barres à l'échelle) et vsWarranty() (retour vs garantie, à l'échelle en années).
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

// rows: [days|0, label, sub, color, valueLabel]; max = axis max in days
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
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="rows">${rows}</div>
  <div class="axis"><div></div><div>${ticks.map(([v, l]) => `<span style="left:${v / max * 100}%">${l}</span>`).join('')}</div></div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

// rows: [label, returnDays, returnLabel, warrantyYears]; axis in years
function vsWarranty(t, maxY) {
  const D = maxY * 365.25;
  const rows = t.rows.map(([a, rd, rl, y]) => `<div class="row"><div class="a">${a}</div>
    <div class="track"><div class="gw" style="width:${y * 365.25 / D * 100}%"><span class="h">${y} ${t.yr}</span></div>
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
  <div class="legend"><span><i style="background:var(--gold)"></i>${t.lr}</span><span><i style="background:var(--green)"></i>${t.lw}</span></div>
  <div class="rows">${rows}</div>
  <div class="axis"><div></div><div>${ticks}</div></div><div class="axl">${t.axis}</div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

const W = {
  fr: { eyebrow: 'Home Depot Canada · politique de retour', title: 'Combien de temps pour retourner un article?',
    rows: [[0, 'Électroménagers', 'Dommages à signaler dans les 48 h suivant la livraison', 'var(--gold)', 'Aucun retour'],
      [30, 'Télé, ordi, climatiseur, meubles…', 'Aussi : génératrices, équipement à essence, à batterie et à fil', '#5FD3AE', '30 jours'],
      [90, 'La plupart des articles', 'Avec reçu, inutilisés, dans un état comme neuf', 'var(--green)', '90 jours'],
      [365, 'Payé avec une carte de crédit Home Depot', 'Selon la politique de la carte', '#7FA8FF', '365 jours']],
    src: 'Source : homedepot.ca · vérifié le 1er novembre 2026 · des exceptions s’appliquent' },
  en: { eyebrow: 'Home Depot Canada · return policy', title: 'How long do you have to return an item?',
    rows: [[0, 'Major appliances', 'Damage must be reported within 48 h of delivery', 'var(--gold)', 'No returns'],
      [30, 'TVs, computers, ACs, furniture…', 'Also: generators, gas-powered, battery and corded equipment', '#5FD3AE', '30 days'],
      [90, 'Most items', 'With receipt, unused, in like-new condition', 'var(--green)', '90 days'],
      [365, 'Paid with a Home Depot credit card', 'Per the card terms in the policy', '#7FA8FF', '365 days']],
    src: 'Source: homedepot.ca · checked November 1, 2026 · exceptions apply' }
};
const TK = l => [[0, l === 'fr' ? 'Achat' : 'Purchase'], [90, '90'], [180, '180'], [365, '365']];
const V = {
  fr: { eyebrow: 'Home Depot · Québec · achat neuf depuis le 5 octobre 2026', title: 'Retour : quelques jours. Garantie : des années.', yr: 'ans',
    lr: 'Délai de retour Home Depot', lw: 'Garantie de bon fonctionnement (Québec)', axis: 'années après la livraison',
    rows: [['Réfrigérateur', 0, 'aucun retour', 6], ['Laveuse', 0, 'aucun retour', 5], ['Climatiseur', 30, 'retour 30 j', 6], ['Téléviseur', 30, 'retour 30 j', 4], ['Ordinateur', 30, 'retour 30 j', 3]],
    src: 'Sources : homedepot.ca, Gouvernement du Québec · vérifié le 1er novembre 2026 · à l’échelle' },
  en: { eyebrow: 'Home Depot · Quebec · bought new since October 5, 2026', title: 'Returns last days. The warranty lasts years.', yr: 'yrs',
    lr: 'Home Depot return window', lw: 'Warranty of good working order (Quebec)', axis: 'years after delivery',
    rows: [['Refrigerator', 0, 'no returns', 6], ['Washer', 0, 'no returns', 5], ['Air conditioner', 30, '30-day return', 6], ['Television', 30, '30-day return', 4], ['Computer', 30, '30-day return', 3]],
    src: 'Sources: homedepot.ca, Government of Quebec · checked November 1, 2026 · to scale' }
};

function cover() {
  const lines = [['XL VT BOT <A>', '1'], ['1 4" BLK <A> chithe', '1']];
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 85% 30%, rgba(30,184,133,.18), transparent 70%), var(--bg)}
  .left{position:absolute;left:72px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:28px;width:560px}
  .left img{height:34px;align-self:flex-start}
  .big{font-size:104px;line-height:.92;font-weight:800;letter-spacing:-.02em}.big em{font-style:normal;color:var(--green)}
  .chips{display:flex;gap:14px}.chip{border:2px solid var(--line);background:var(--card);border-radius:999px;padding:10px 22px;font-weight:800;font-size:28px}
  .r{position:absolute;right:96px;top:70px;width:430px;background:#F4F1E8;color:#2A2D33;border-radius:6px;padding:34px 32px 40px;transform:rotate(4deg);font-family:ui-monospace,Menlo,monospace;font-size:18px;box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .r .t{text-align:center;font-weight:700;letter-spacing:.2em;margin-bottom:22px}
  .r .l{display:grid;grid-template-columns:1fr auto;gap:12px;margin:9px 0}
  .r hr{border:0;border-top:2px dashed #B9B5AA;margin:20px 0}
  .stamp{position:absolute;right:70px;bottom:62px;width:150px;height:150px;border-radius:50%;background:var(--green);color:#0E1217;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-10deg);box-shadow:0 18px 40px rgba(0,0,0,.4)}
  .stamp b{font-family:'Funnel Display';font-size:64px;line-height:1}.stamp span{font-weight:700;font-size:15px;letter-spacing:.1em}
  </style><div class="c"><div class="left"><img src="${LOGO}"><div class="big h">Home<br><em>Depot</em></div>
  <div class="chips"><div class="chip h" style="color:#5FD3AE">30</div><div class="chip h" style="color:var(--green)">90</div><div class="chip h" style="color:#7FA8FF">365</div></div></div>
  <div class="r"><div class="t">REÇU · RECEIPT</div>${lines.map(l => `<div class="l"><span>${l[0].replace(/</g, '&lt;')}</span><span>${l[1]}</span></div>`).join('')}
  <hr><div class="l"><span>RETOUR / RETURN</span><span>90 J</span></div><hr>
  <div style="height:54px;background:repeating-linear-gradient(90deg,#2A2D33 0 3px,transparent 3px 6px,#2A2D33 6px 7px,transparent 7px 11px)"></div></div>
  <div class="stamp"><b>90</b><span>JOURS · DAYS</span></div></div>`;
}

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const only = process.argv[3];
  let jobs = [['cover.png', cover(), 630]];
  for (const l of ['fr', 'en']) { jobs.push([`delais-retour-${l}.png`, windows(W[l], 365, TK(l)), 675]); jobs.push([`retour-vs-garantie-${l}.png`, vsWarranty(V[l], 6), 675]); }
  if (only) jobs = jobs.filter(j => j[0].startsWith(only));
  const b = await chromium.launch();
  for (const [name, html, h] of jobs) {
    const p = await b.newPage({ viewport: { width: 1200, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
