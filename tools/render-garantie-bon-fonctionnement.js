// Visuels de posts/garantie-bon-fonctionnement-quebec. Usage: node render-garantie-bon-fonctionnement.js <outDir> [prefix]
// Gabarits : layers() (repris de render-costco.js : fins de garantie à l échelle en années) et twoDates() (ligne du temps sur de vraies dates avec jalons achat / livraison / fin, et la preuve de chaque date).
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
function twoDates(t) {
  const ms = s => new Date(s + 'T12:00:00Z').getTime();
  const pz = d => (ms(d) - ms(t.zoom.from)) / (ms(t.zoom.to) - ms(t.zoom.from)) * 100;
  const pf = d => (ms(d) - ms(t.full.from)) / (ms(t.full.to) - ms(t.full.from)) * 100;
  const marks = t.zoom.marks.map(([d, a, b, col], i) => `<div class="mk" style="left:${pz(d)}%"><i style="background:${col}"></i>
    <div class="ml ${i ? 'r' : 'l'}"><div class="h md" style="color:${col}">${a}</div><div class="mp">${b}</div></div></div>`).join('');
  const f = t.full;
  return `<style>${CSS}
  .zoom{margin-top:26px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px 28px 18px;position:relative}
  .zt{color:var(--muted);font-size:15px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
  .zl{position:relative;height:130px;margin:8px 10px 0}
  .zl:before{content:'';position:absolute;left:0;right:0;top:20px;height:3px;background:var(--line)}
  .mk{position:absolute;top:10px}.mk i{position:absolute;left:-12px;top:0;width:24px;height:24px;border-radius:50%;border:4px solid var(--card)}
  .ml{position:absolute;top:34px;width:360px}.ml.l{left:-12px}.ml.r{right:-12px;text-align:right}
  .md{font-size:24px;font-weight:800}.mp{color:var(--fg);font-size:17px;margin-top:4px;line-height:1.3}
  .ft{margin-top:22px;color:var(--muted);font-size:15px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
  .track{position:relative;height:56px;margin-top:10px;background:var(--card);border:1px solid var(--line);border-radius:10px}
  .bar{position:absolute;top:0;bottom:0;background:var(--green);border-radius:9px;display:flex;align-items:center;padding-left:16px;color:#0E1217;font-weight:800;font-size:20px}
  .ghost{position:absolute;top:-8px;bottom:-8px;border-left:3px dashed var(--gold)}
  .gl{position:absolute;top:64px;transform:translateX(-100%);color:var(--gold);font-size:15px;font-weight:700;white-space:nowrap;padding-right:8px}
  .yrs{position:relative;height:18px;margin-top:40px;color:var(--muted);font-size:15px}.yrs span{position:absolute;transform:translateX(-50%)}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="zoom"><div class="zt">${t.zoom.title}</div><div class="zl">${marks}</div></div>
  <div class="ft">${f.title}</div>
  <div class="track"><div class="bar" style="left:${pf(f.start)}%;width:${pf(f.end) - pf(f.start)}%">${f.barLabel}</div>
    <div class="ghost" style="left:${pf(f.ghost)}%"></div><div class="gl" style="left:${pf(f.ghost)}%">${f.ghostLabel}</div></div>
  <div class="yrs">${f.years.map(y => `<span style="left:${pf(y + '-01-01')}%">${y}</span>`).join('')}</div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

const G = 'var(--green)', GOLD = 'var(--gold)';
const L = {
  fr: { eyebrow: 'Exemple calculé · achat du Vendredi fou, 27 novembre 2026, livré le jour même', title: 'Garantie de bon fonctionnement : jusqu’à quand?', axis: 'années après la livraison',
    rows: [['Délai de retour', 'Ex. : électronique, 30 jours après l’achat', 30 / 365.25, GOLD, '30 jours', '→ 27 déc. 2026'],
      ['Cellulaire, ordinateur', 'Aussi tablette et console de jeu', 3, '#7FA8FF', '3 ans', '→ 27 nov. 2029'],
      ['Téléviseur', '', 4, '#5FD3AE', '4 ans', '→ 27 nov. 2030'],
      ['Laveuse, sécheuse', 'Aussi lave-vaisselle', 5, '#36C496', '5 ans', '→ 27 nov. 2031'],
      ['Réfrigérateur, cuisinière', 'Aussi congélateur, climatiseur, thermopompe', 6, G, '6 ans', '→ 27 nov. 2032']],
    src: 'Sources : Office de la protection du consommateur · vérifié le 6 novembre 2026 · à l’échelle · biens neufs achetés depuis le 5 oct. 2026' },
  en: { eyebrow: 'Worked example · Black Friday purchase, November 27, 2026, delivered the same day', title: 'Warranty of good working order: until when?', axis: 'years after delivery',
    rows: [['Return window', 'E.g. electronics, 30 days from purchase', 30 / 365.25, GOLD, '30 days', '→ Dec 27, 2026'],
      ['Cell phone, computer', 'Also tablet and game console', 3, '#7FA8FF', '3 years', '→ Nov 27, 2029'],
      ['Television', '', 4, '#5FD3AE', '4 years', '→ Nov 27, 2030'],
      ['Washer, dryer', 'Also dishwasher', 5, '#36C496', '5 years', '→ Nov 27, 2031'],
      ['Refrigerator, stove', 'Also freezer, air conditioner, heat pump', 6, G, '6 years', '→ Nov 27, 2032']],
    src: 'Source: Office de la protection du consommateur · checked November 6, 2026 · to scale · new goods bought since Oct 5, 2026' }
};
const T = {
  fr: { eyebrow: 'Exemple calculé · réfrigérateur acheté en magasin, livré à domicile', title: 'Deux dates, deux preuves',
    zoom: { title: 'Gros plan : 18 jours d’écart', from: '2026-11-24', to: '2026-12-18', marks: [
      ['2026-11-27', 'Achat · 27 nov. 2026', 'Prouve que l’appareil est couvert (acheté après le 5 oct. 2026). Preuve : le reçu.', GOLD],
      ['2026-12-15', 'Livraison · 15 déc. 2026', 'Fait partir les 6 ans de garantie. Preuve : courriel ou bon de livraison.', G]] },
    full: { title: 'À l’échelle, en années', from: '2026-07-01', to: '2033-07-01', start: '2026-12-15', end: '2032-12-15', ghost: '2032-11-27',
      years: [2027, 2028, 2029, 2030, 2031, 2032, 2033], barLabel: 'Garantie de bon fonctionnement · 6 ans → vers le 15 déc. 2032', ghostLabel: 'Avec le reçu seul : 27 nov. 2032' },
    src: 'Sources : OPC et gouvernement du Québec · vérifié le 6 novembre 2026 · date de livraison hypothétique' },
  en: { eyebrow: 'Worked example · refrigerator bought in store, delivered to your home', title: 'Two dates, two proofs',
    zoom: { title: 'Close-up: 18 days apart', from: '2026-11-24', to: '2026-12-18', marks: [
      ['2026-11-27', 'Purchase · Nov 27, 2026', 'Shows the device is covered (bought after Oct 5, 2026). Proof: the receipt.', GOLD],
      ['2026-12-15', 'Delivery · Dec 15, 2026', 'Starts the 6-year warranty. Proof: delivery email or slip.', G]] },
    full: { title: 'To scale, in years', from: '2026-07-01', to: '2033-07-01', start: '2026-12-15', end: '2032-12-15', ghost: '2032-11-27',
      years: [2027, 2028, 2029, 2030, 2031, 2032, 2033], barLabel: 'Warranty of good working order · 6 years → about Dec 15, 2032', ghostLabel: 'Receipt alone: Nov 27, 2032' },
    src: 'Sources: OPC and Government of Quebec · checked November 6, 2026 · hypothetical delivery date' }
};

function cover() {
  const bars = [[3, '#7FA8FF', 2029], [4, '#5FD3AE', 2030], [5, '#36C496', 2031], [6, G, 2032]].map(([y, c, e]) =>
    `<div class="cb"><div class="cf" style="width:${y / 6 * 100}%;background:${c}"><b class="h">${y}</b></div><span class="h">${e}</span></div>`).join('');
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 85% 30%, rgba(30,184,133,.18), transparent 70%), var(--bg)}
  .left{position:absolute;left:72px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:26px;width:440px}
  .left img{height:34px;align-self:flex-start}
  .big{font-size:104px;line-height:.95;font-weight:800;letter-spacing:-.02em}.big em{font-style:normal;color:var(--green)}
  .sub{font-size:30px;font-weight:700;color:var(--muted)}
  .panel{position:absolute;right:72px;top:96px;width:600px;background:var(--card);border:1px solid var(--line);border-radius:20px;padding:34px 34px 30px;display:grid;gap:22px;box-shadow:0 30px 60px rgba(0,0,0,.35)}
  .cb{display:grid;grid-template-columns:1fr 92px;gap:16px;align-items:center}
  .cf{height:66px;border-radius:12px;display:flex;align-items:center;justify-content:flex-end;padding-right:18px}
  .cf b{color:#0E1217;font-size:34px}.cb span{font-size:30px;font-weight:800}
  .start{display:flex;justify-content:space-between;color:var(--muted);font-size:20px;font-weight:700;border-top:1px solid var(--line);padding-top:14px}
  </style><div class="c"><div class="left"><img src="${LOGO}"><div class="big h">2026<br><em>→ 2032</em></div><div class="sub h">QC · 3 · 4 · 5 · 6</div></div>
  <div class="panel">${bars}</div></div>`;
}
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const only = process.argv[3];
  let jobs = [['cover.png', cover(), 630]];
  for (const l of ['fr', 'en']) { jobs.push([`dates-fin-${l}.png`, layers(L[l], 6), 675]); jobs.push([`deux-dates-${l}.png`, twoDates(T[l]), 675]); }
  if (only) jobs = jobs.filter(j => j[0].startsWith(only));
  const b = await chromium.launch();
  for (const [name, html, h] of jobs) {
    const p = await b.newPage({ viewport: { width: 1200, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
