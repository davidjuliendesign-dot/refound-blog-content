// Visuels de posts/retourner-cadeau-noel. Usage: node render-cadeaux-noel.js <outDir>
// Gabarit : deadlines() — un même achat comparé entre marchands sur un axe de dates réelles : barre de la date d'achat à la date limite,
// jours sans retour hachurés PAR LIGNE, et une ligne verticale repère (ex. Noël). Réutilisable pour toute comparaison de dates limites entre magasins.
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

const AX = ['2026-11-24', '2027-03-28'];
const BB = [['2026-12-26', '2026-12-27']], SE = [['2026-12-26', '2026-12-28']];
const C = {
  fr: { eyebrow: 'Cadeau acheté le 1er décembre 2026', title: 'Jusqu’à quand peut-on le retourner?',
    lr: 'Retour possible', lb: 'Aucun retour en magasin', lm: 'Noël',
    rows: [['Canadian Tire', 'Électronique · 30 jours', '2026-12-01', '2026-12-31', '31 déc.'],
      ['Home Depot', 'Téléviseur, ordinateur · 30 jours', '2026-12-01', '2026-12-31', '31 déc.'],
      ['Decathlon', 'Sans compte membre · 30 jours', '2026-12-01', '2026-12-31', '31 déc.'],
      ['Best Buy', 'Prolongation des Fêtes', '2026-12-01', '2027-01-10', '10 janv.', BB],
      ['Sports Experts', 'Prolongation des Fêtes', '2026-12-01', '2027-01-10', '10 janv.', SE],
      ['Canadian Tire, Home Depot', 'La plupart des articles · 90 jours', '2026-12-01', '2027-03-01', '1er mars']],
    axis: AX, marker: ['2026-12-25', '25 déc.'],
    ticks: [['2026-12-01', '1er déc.'], ['2027-01-01', '1er janv.'], ['2027-02-01', '1er févr.'], ['2027-03-01', '1er mars']],
    src: 'Calcul ReFound d’après les politiques officielles · vérifié le 12 novembre 2026 · à l’échelle' },
  en: { eyebrow: 'Gift bought December 1, 2026', title: 'How long do you have to return it?',
    lr: 'Return accepted', lb: 'No in-store returns', lm: 'Christmas',
    rows: [['Canadian Tire', 'Electronics · 30 days', '2026-12-01', '2026-12-31', 'Dec 31'],
      ['Home Depot', 'TV, computer · 30 days', '2026-12-01', '2026-12-31', 'Dec 31'],
      ['Decathlon', 'No membership · 30 days', '2026-12-01', '2026-12-31', 'Dec 31'],
      ['Best Buy', 'Holiday extension', '2026-12-01', '2027-01-10', 'Jan 10', BB],
      ['Sports Experts', 'Holiday extension', '2026-12-01', '2027-01-10', 'Jan 10', SE],
      ['Canadian Tire, Home Depot', 'Most items · 90 days', '2026-12-01', '2027-03-01', 'Mar 1']],
    axis: AX, marker: ['2026-12-25', 'Dec 25'],
    ticks: [['2026-12-01', 'Dec 1'], ['2027-01-01', 'Jan 1'], ['2027-02-01', 'Feb 1'], ['2027-03-01', 'Mar 1']],
    src: 'ReFound calculation based on official policies · checked November 12, 2026 · to scale' }
};

// Couverture sans texte dépendant de la langue : boîte-cadeau, reçu-cadeau sans prix, mini-calendrier 25.12 → 10.01
function cover() {
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 80% 35%, rgba(30,184,133,.18), transparent 70%), var(--bg)}
  .left{position:absolute;left:72px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:30px;width:520px}
  .left img{height:34px;align-self:flex-start}
  .dates{display:flex;align-items:center;gap:18px}
  .d{background:var(--card);border:2px solid var(--line);border-radius:18px;padding:16px 22px;text-align:center}
  .d b{display:block;font-family:'Funnel Display';font-size:64px;line-height:1;font-weight:800}.d span{color:var(--muted);font-size:18px;font-weight:700;letter-spacing:.1em}
  .arrow{font-size:44px;color:var(--gold);font-weight:800}
  .chips{display:flex;gap:12px}.chip{border:2px solid var(--line);background:var(--card);border-radius:999px;padding:8px 20px;font-weight:800;font-size:26px}
  .box{position:absolute;right:300px;top:150px;width:250px;height:230px;background:var(--green);border-radius:14px;transform:rotate(-6deg);box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .box:before{content:'';position:absolute;left:50%;top:0;bottom:0;width:38px;margin-left:-19px;background:var(--gold)}
  .box:after{content:'';position:absolute;left:-12px;right:-12px;top:-46px;height:56px;background:#17A673;border-radius:10px;box-shadow:inset 0 -6px 0 rgba(0,0,0,.12)}
  .bow{position:absolute;right:372px;top:66px;width:110px;height:70px;transform:rotate(-6deg)}
  .bow i{position:absolute;top:10px;width:56px;height:46px;border:12px solid var(--gold);border-radius:50% 50% 50% 50%}
  .bow i:first-child{left:-4px;transform:rotate(-20deg)}.bow i:last-child{right:-4px;transform:rotate(20deg)}
  .r{position:absolute;right:70px;top:170px;width:290px;background:#F4F1E8;color:#2A2D33;border-radius:6px;padding:26px 24px 30px;transform:rotate(7deg);font-family:ui-monospace,Menlo,monospace;font-size:17px;box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .r .t{text-align:center;font-size:40px;margin-bottom:14px}
  .r .l{display:grid;grid-template-columns:1fr auto;gap:10px;margin:8px 0}
  .r .l s{color:#B9B5AA;text-decoration:none;letter-spacing:.1em}
  .r hr{border:0;border-top:2px dashed #B9B5AA;margin:16px 0}
  </style><div class="c"><div class="left"><img src="${LOGO}">
  <div class="dates"><div class="d"><b>25</b><span>12 · 2026</span></div><div class="arrow">→</div><div class="d" style="border-color:var(--gold)"><b style="color:var(--gold)">10</b><span>01 · 2027</span></div></div>
  <div class="chips"><div class="chip h" style="color:var(--gold)">30</div><div class="chip h" style="color:var(--green)">90</div><div class="chip h">365</div></div></div>
  <div class="bow"><i></i><i></i></div><div class="box"></div>
  <div class="r"><div class="t">🎁</div>
  <div class="l"><span>052-2124-0</span><s>— — —</s></div>
  <div class="l"><span>184-2003-4</span><s>— — —</s></div>
  <hr><div class="l"><span>01/12/26</span><span>★</span></div><hr>
  <div style="height:48px;background:repeating-linear-gradient(90deg,#2A2D33 0 3px,transparent 3px 6px,#2A2D33 6px 7px,transparent 7px 11px)"></div></div></div>`;
}
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  let jobs = [['cover.png', cover(), 630]];
  for (const l of ['fr', 'en']) jobs.push([`dates-limites-${l}.png`, deadlines(C[l]), 675]);
  const b = await chromium.launch();
  for (const [name, html, h] of jobs) {
    const p = await b.newPage({ viewport: { width: 1200, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
