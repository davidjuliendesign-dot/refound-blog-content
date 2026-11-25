// Visuels de posts/retour-article-en-solde. Usage: node render-article-en-solde.js <outDir>
// deadlines() copié de render-cadeaux-noel.js (dates limites à l'échelle sur un axe de vraies dates). Couverture sans texte dépendant de la langue :
// étiquette de prix barrée reliée à un reçu et à un calendrier, avec un tampon « ✕ » pour la vente finale.
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


// deadlines(): rows = [label, sub, fromISO, toISO, endLabel, blockedRanges[[fromISO,toISO]]]; marker = [ISO, label]
const day = s => Date.parse(s + 'T12:00:00Z') / 864e5;
function deadlines(t) {
  const [a0, a1] = t.axis.map(day); const span = a1 - a0; const x = s => (day(s) - a0) / span * 100;
  const rows = t.rows.map(([lab, sub, f, to, el, bl]) => `<div class="row"><div><div class="a">${lab}</div><div class="b">${sub}</div></div>
    <div class="track"><div class="bar" style="left:${x(f)}%;width:${x(to) - x(f)}%"></div>
    ${(bl || []).map(([bf, bt]) => `<div class="blk" style="left:${x(bf)}%;width:${x(bt) - x(bf)}%"></div>`).join('')}
    <span class="h val" style="left:calc(${x(to)}% + 10px)">${el}</span></div></div>`).join('');
  return `<style>${CSS}
  h1{font-size:40px}
  .legend{display:flex;gap:26px;margin-top:14px;font-size:15px;color:var(--muted);flex-wrap:wrap}.legend i{display:inline-block;width:14px;height:14px;border-radius:3px;margin-right:8px;vertical-align:-2px}
  .rows{margin-top:22px;display:grid;gap:11px;position:relative}
  .row{display:grid;grid-template-columns:300px 1fr;gap:20px;align-items:center;position:relative;z-index:1}
  .a{font-weight:700;font-size:19px}.b{color:var(--muted);font-size:14px;margin-top:2px}
  .track{height:42px;background:rgba(29,34,42,.75);border:1px solid var(--line);border-radius:10px;position:relative}
  .bar{position:absolute;top:6px;bottom:6px;background:var(--gold);border-radius:6px}
  .blk{position:absolute;top:2px;bottom:2px;background:repeating-linear-gradient(135deg,#F05F5F 0 3px,#14181F 3px 6px);border:1px solid #F05F5F;min-width:6px}
  .val{position:absolute;top:50%;transform:translateY(-50%);font-weight:800;font-size:16px;white-space:nowrap;background:#0E1217;padding:2px 8px;border-radius:6px;z-index:2}
  .grid{display:grid;grid-template-columns:300px 1fr;gap:20px;position:absolute;inset:-10px 0;pointer-events:none;z-index:2}
  .mk{position:absolute;top:0;bottom:0;border-left:2px dashed var(--green)}
  .mk span{position:absolute;top:-24px;left:6px;color:var(--green);font-weight:700;font-size:14px;white-space:nowrap}
  .axis{display:grid;grid-template-columns:300px 1fr;gap:20px;color:var(--muted);font-size:14px;margin-top:12px}
  .axis div:last-child{position:relative;height:18px}.axis span{position:absolute;transform:translateX(-50%);white-space:nowrap}
  .hatch{background:repeating-linear-gradient(135deg,#F05F5F 0 3px,transparent 3px 6px);border:1px solid #F05F5F}
  .dash{border-left:2px dashed var(--green);border-radius:0;width:2px!important}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="legend"><span><i style="background:var(--gold)"></i>${t.lr}</span><span><i class="hatch"></i>${t.lb}</span><span><i class="dash"></i>${t.lm}</span></div>
  <div class="rows"><div class="grid"><div></div><div style="position:relative"><div class="mk" style="left:${x(t.marker[0])}%"><span>${t.marker[1]}</span></div></div></div>${rows}</div>
  <div class="axis"><div></div><div>${t.ticks.map(([s, l]) => `<span style="left:${x(s)}%">${l}</span>`).join('')}</div></div>
  <div class="foot" style="margin-top:auto"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

const AX = ['2026-11-20', '2027-03-10'];
const C = {
  fr: { eyebrow: 'Article payé le vendredi 27 novembre 2026', title: 'Jusqu’à quand peut-on le retourner?',
    lr: 'Retour possible', lb: 'Aucun retour', lm: 'Noël',
    rows: [['Canadian Tire', 'Électronique pour l’auto · 14 jours', '2026-11-27', '2026-12-11', '11 déc.'],
      ['Canadian Tire', 'Électronique · 30 jours', '2026-11-27', '2026-12-27', '27 déc.'],
      ['Home Depot', 'Téléviseur, ordinateur · 30 jours', '2026-11-27', '2026-12-27', '27 déc.'],
      ['Canadian Tire, Home Depot', 'La plupart des articles · 90 jours', '2026-11-27', '2027-02-25', '25 févr.'],
      ['Canadian Tire', 'Liquidation, vente finale, tel quel', '2026-11-27', '2026-11-27', 'Aucun retour', [['2026-11-27', '2027-03-10']]]],
    axis: AX, marker: ['2026-12-25', '25 déc.'],
    ticks: [['2026-12-01', '1er déc.'], ['2027-01-01', '1er janv.'], ['2027-02-01', '1er févr.'], ['2027-03-01', '1er mars']],
    src: 'Calcul ReFound d’après canadiantire.ca et homedepot.ca · vérifié le 25 novembre 2026 · à l’échelle' },
  en: { eyebrow: 'Item paid on Friday, November 27, 2026', title: 'How long do you have to return it?',
    lr: 'Return accepted', lb: 'No return', lm: 'Christmas',
    rows: [['Canadian Tire', 'Auto electronics · 14 days', '2026-11-27', '2026-12-11', 'Dec 11'],
      ['Canadian Tire', 'Electronics · 30 days', '2026-11-27', '2026-12-27', 'Dec 27'],
      ['Home Depot', 'TV, computer · 30 days', '2026-11-27', '2026-12-27', 'Dec 27'],
      ['Canadian Tire, Home Depot', 'Most items · 90 days', '2026-11-27', '2027-02-25', 'Feb 25'],
      ['Canadian Tire', 'Clearance, final sale, as-is', '2026-11-27', '2026-11-27', 'No return', [['2026-11-27', '2027-03-10']]]],
    axis: AX, marker: ['2026-12-25', 'Dec 25'],
    ticks: [['2026-12-01', 'Dec 1'], ['2027-01-01', 'Jan 1'], ['2027-02-01', 'Feb 1'], ['2027-03-01', 'Mar 1']],
    src: 'ReFound calculation based on canadiantire.ca and homedepot.ca · checked November 25, 2026 · to scale' }
};

function cover() {
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 75% 40%, rgba(30,184,133,.18), transparent 70%), var(--bg)}
  .left{position:absolute;left:72px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:34px;width:470px}
  .left img{height:34px;align-self:flex-start}
  .tag{position:relative;width:360px;height:180px;background:var(--gold);border-radius:18px 60px 60px 18px;color:#14181F;display:flex;flex-direction:column;justify-content:center;padding-left:46px;transform:rotate(-5deg);box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .tag:after{content:'';position:absolute;right:36px;top:50%;width:30px;height:30px;margin-top:-15px;border-radius:50%;background:var(--bg)}
  .tag s{font-family:'Funnel Display';font-weight:700;font-size:40px;opacity:.55}
  .tag b{font-family:'Funnel Display';font-weight:800;font-size:92px;line-height:.95}
  .r{position:absolute;right:120px;top:84px;width:300px;background:#F4F1E8;color:#2A2D33;border-radius:6px;padding:24px 24px 28px;transform:rotate(5deg);font-family:ui-monospace,Menlo,monospace;font-size:18px;box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .r .l{display:grid;grid-template-columns:1fr auto;gap:10px;margin:9px 0;padding:4px 6px;border-radius:4px}
  .r .l i{display:block;height:14px;width:120px;background:#C9C4B8;border-radius:4px;align-self:center}
  .r .l.hl{background:rgba(246,184,40,.55);outline:3px solid #E0A315}
  .r .l.x{position:relative}.r .l.x:after{content:'✕';position:absolute;right:-48px;top:-8px;width:40px;height:40px;border-radius:50%;background:#F05F5F;color:#fff;font-family:'DM Sans';font-weight:700;display:flex;align-items:center;justify-content:center;font-size:22px}
  .r hr{border:0;border-top:2px dashed #B9B5AA;margin:14px 0}
  .bars{position:absolute;right:90px;bottom:70px;width:470px;display:grid;gap:12px}
  .bar{height:26px;border-radius:8px;background:var(--card);border:1px solid var(--line);position:relative}
  .bar i{position:absolute;left:0;top:0;bottom:0;border-radius:8px}
  </style><div class="c"><div class="left"><img src="${LOGO}">
  <div class="tag"><s>89,99</s><b>59,99</b></div></div>
  <div class="r"><div class="l"><i></i><span>24,99</span></div><div class="l hl"><i></i><span>59,99</span></div><div class="l x"><i></i><span>14,99</span></div><div class="l"><i style="width:90px"></i><span>3,49</span></div>
  <hr><div class="l"><span>27/11/26</span><span>★</span></div><hr>
  <div style="height:44px;background:repeating-linear-gradient(90deg,#C9C4B8 0 3px,transparent 3px 6px,#C9C4B8 6px 7px,transparent 7px 11px)"></div></div>
  <div class="bars"><div class="bar"><i style="width:16%;background:var(--gold)"></i></div><div class="bar"><i style="width:33%;background:var(--gold)"></i></div><div class="bar"><i style="width:100%;background:var(--green)"></i></div></div></div>`;
}
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  let jobs = [['cover.png', cover(), 630]];
  for (const l of ['fr', 'en']) jobs.push([`dates-vendredi-fou-${l}.png`, deadlines(C[l]), 675]);
  const b = await chromium.launch();
  for (const [name, html, h] of jobs) {
    const p = await b.newPage({ viewport: { width: 1200, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
