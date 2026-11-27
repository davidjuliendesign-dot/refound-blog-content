// Visuels de posts/retour-epicerie-quebec. Usage : node render-epicerie.js ../posts/retour-epicerie-quebec/images
// deadlines() : un même achat comparé sur un axe de vraies dates (barre achat → date limite, étiquette à droite de la barre,
// ligne « repère » pointillée optionnelle). Variante simplifiée de render-cadeaux-noel.js, avec une couleur par ligne
// (utile pour séparer garanties de fraîcheur courtes et estimation générale de l'app).
// cover() : sans texte dépendant de la langue (reçu d'épicerie dessiné, pomme, pastilles 3 et 7).
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
.wrap{width:1200px;height:675px;padding:48px 64px 38px;display:flex;flex-direction:column}
.eyebrow{color:var(--green);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:17px}
h1{font-size:40px;line-height:1.1;margin-top:10px;font-weight:800}
.foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:14px;margin-top:auto}
.foot p{color:var(--muted);font-size:14px;max-width:960px}.foot img{height:22px}`;
const LOGO = `data:image/png;base64,${b64('assets/logo-refound-light.png')}`;

const day = s => Date.parse(s + 'T12:00:00Z') / 864e5;
// t: {eyebrow,title,axis:[from,to],ticks:[[iso,label]],rows:[[label,sub,from,to,endLabel,color]],src}
function deadlines(t) {
  const [a0, a1] = t.axis.map(day); const x = s => (day(s) - a0) / (a1 - a0) * 100;
  const rows = t.rows.map(([lab, sub, f, to, el, c]) => `<div class="row"><div><div class="a">${lab}</div><div class="b">${sub}</div></div>
    <div class="track"><div class="bar" style="left:${x(f)}%;width:${x(to) - x(f)}%;background:${c}"></div>
    <span class="h val" style="${x(to) > 78 ? `left:calc(${x(to)}% - 10px);transform:translate(-100%,-50%)` : `left:calc(${x(to)}% + 10px)`}">${el}</span></div></div>`).join('');
  const ticks = t.ticks.map(([d, l]) => `<span style="left:${x(d)}%">${l}</span>`).join('');
  return `<style>${CSS}
  .rows{margin-top:30px;display:grid;gap:14px}
  .row{display:grid;grid-template-columns:330px 1fr;gap:20px;align-items:center}
  .a{font-weight:700;font-size:20px}.b{color:var(--muted);font-size:14px;margin-top:3px}
  .track{height:46px;background:var(--card);border:1px solid var(--line);border-radius:10px;position:relative}
  .bar{position:absolute;top:7px;bottom:7px;border-radius:6px}
  .val{position:absolute;top:50%;transform:translateY(-50%);font-weight:800;font-size:17px;white-space:nowrap;background:#0E1217;padding:3px 9px;border-radius:6px}
  .axis{display:grid;grid-template-columns:330px 1fr;gap:20px;color:var(--muted);font-size:14px;margin-top:12px}
  .axis div:last-child{position:relative;height:18px}.axis span{position:absolute;transform:translateX(-50%);white-space:nowrap}
  .note{margin-top:18px;color:var(--fg);font-size:16px;background:var(--card);border-left:4px solid var(--gold);border-radius:8px;padding:12px 16px}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="rows">${rows}</div><div class="axis"><div></div><div>${ticks}</div></div>
  <div class="note">${t.note}</div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}
const AX = ['2026-11-28', '2026-12-30'];
const C = {
  fr: { eyebrow: 'Exemple calculé · épicerie achetée le samedi 28 novembre 2026', title: 'Les garanties fraîcheur se comptent en jours, pas en semaines',
    axis: AX, ticks: [['2026-11-28', '28 nov.'], ['2026-12-05', '5 déc.'], ['2026-12-12', '12 déc.'], ['2026-12-19', '19 déc.'], ['2026-12-28', '28 déc.']],
    rows: [['Metro', 'produits frais · 3 jours, avec le reçu', '2026-11-28', '2026-12-01', '1er déc.', 'var(--gold)'],
      ['Maxi', 'viande, poisson, fruits, légumes · 7 jours', '2026-11-28', '2026-12-05', '5 déc.', 'var(--gold)'],
      ['Loblaws', 'fruits et légumes · 7 jours', '2026-11-28', '2026-12-05', '5 déc.', 'var(--gold)'],
      ['Estimation de l’app ReFound', 'retour général Maxi · 30 jours', '2026-11-28', '2026-12-28', '28 déc.', '#3D4654']],
    note: 'La date affichée par l’app est une estimation générale du retour. Pour un aliment frais qui déçoit, c’est la garantie fraîcheur qui compte.',
    src: 'Sources : metro.ca (page en anglais), loblaws.ca, Narcity et Les Maisons (Maxi, 15 oct. 2026) · calcul ReFound, vérifié le 27 novembre 2026 · en cas de doute, rapportez le produit plus tôt' },
  en: { eyebrow: 'Calculated example · groceries bought Saturday, November 28, 2026', title: 'Freshness guarantees are counted in days, not weeks',
    axis: AX, ticks: [['2026-11-28', 'Nov 28'], ['2026-12-05', 'Dec 5'], ['2026-12-12', 'Dec 12'], ['2026-12-19', 'Dec 19'], ['2026-12-28', 'Dec 28']],
    rows: [['Metro', 'fresh products · 3 days, with receipt', '2026-11-28', '2026-12-01', 'Dec 1', 'var(--gold)'],
      ['Maxi', 'meat, fish, fruit, vegetables · 7 days', '2026-11-28', '2026-12-05', 'Dec 5', 'var(--gold)'],
      ['Loblaws', 'fruit and vegetables · 7 days', '2026-11-28', '2026-12-05', 'Dec 5', 'var(--gold)'],
      ['ReFound app estimate', 'general Maxi return · 30 days', '2026-11-28', '2026-12-28', 'Dec 28', '#3D4654']],
    note: 'The date the app shows is a general return estimate. For fresh food that disappoints, the freshness guarantee is what counts.',
    src: 'Sources: metro.ca, loblaws.ca, Narcity and Les Maisons (Maxi, Oct. 15, 2026, in French) · ReFound calculation, checked November 27, 2026 · when in doubt, bring it back sooner' }
};

function cover() {
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 70% 45%, rgba(30,184,133,.18), transparent 70%), var(--bg)}
  .logo{position:absolute;left:72px;top:64px;height:34px}
  .r{position:absolute;left:150px;top:150px;width:330px;background:#F4F1E8;color:#2A2D33;border-radius:6px;padding:26px 24px 30px;transform:rotate(-5deg);font-family:ui-monospace,Menlo,monospace;font-size:18px;box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .r .l{display:grid;grid-template-columns:1fr auto;gap:10px;margin:9px 0}.r .l s{color:#B9B5AA;text-decoration:none}
  .r .hl{background:rgba(30,184,133,.28);border-radius:4px;padding:0 4px;margin:9px -4px}
  .r hr{border:0;border-top:2px dashed #B9B5AA;margin:14px 0}
  .bc{height:44px;background:#D9D5CA;border-radius:4px}
  .apple{position:absolute;left:640px;top:200px;width:250px;height:240px;border-radius:48% 48% 46% 46%;background:radial-gradient(circle at 35% 30%,#4BD8A6,#1EB885 55%,#128a63);box-shadow:0 30px 70px rgba(0,0,0,.5)}
  .apple:before{content:'';position:absolute;left:118px;top:-38px;width:14px;height:56px;background:#7A5A3A;border-radius:7px;transform:rotate(12deg)}
  .apple:after{content:'';position:absolute;left:134px;top:-46px;width:70px;height:36px;background:#5FD3AE;border-radius:0 40px 0 40px;transform:rotate(-14deg)}
  .badge{position:absolute;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Funnel Display';font-weight:800;box-shadow:0 18px 40px rgba(0,0,0,.45)}
  .b7{right:110px;top:90px;width:170px;height:170px;font-size:84px;background:var(--gold);color:#0E1217;transform:rotate(-8deg)}
  .b3{right:200px;top:400px;width:120px;height:120px;font-size:56px;background:var(--card);border:4px solid var(--gold);color:var(--gold)}
  </style><div class="c"><img class="logo" src="${LOGO}">
  <div class="r"><div class="l"><span>██████ ███</span><s>—</s></div><div class="l hl"><span>█████ ██</span><s>—</s></div>
  <div class="l"><span>████ ████</span><s>—</s></div><div class="l hl"><span>███████</span><s>—</s></div><div class="l"><span>█████ █</span><s>—</s></div>
  <hr><div class="l"><span>28/11/26</span><span>★</span></div><hr><div class="bc"></div></div>
  <div class="apple"></div><div class="badge b7">7</div><div class="badge b3">3</div></div>`;
}
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const jobs = [['cover.png', cover(), 630]];
  for (const l of ['fr', 'en']) jobs.push([`delais-fraicheur-${l}.png`, deadlines(C[l]), 675]);
  const b = await chromium.launch();
  for (const [name, html, h] of jobs) {
    const p = await b.newPage({ viewport: { width: 1200, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
