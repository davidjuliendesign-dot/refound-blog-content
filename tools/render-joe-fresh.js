// Visuels de posts/politique-retour-joe-fresh. Usage: node render-joe-fresh.js <outDir> [prefix]
// Gabarits : calendar() copié de render-walmart.js (délais des Fêtes sur un axe de dates réelles) et une couverture sans texte dépendant de la langue (cintre + reçu + 24.01).
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
  fr: { eyebrow: 'Joe Fresh · retours des Fêtes 2026', title: 'Date d’achat → dernier jour pour le retour',
    ln: 'Délai normal de 30 jours', le: 'Prolongation des Fêtes (achats du 8 nov. au 25 déc.)',
    rows: [['7 novembre', 'Avant la période des Fêtes', '2026-11-07', '2026-12-07', null, '7 déc.'],
      ['8 novembre', 'Premier jour de la période', '2026-11-08', '2026-12-08', '2027-01-24', '24 janv.'],
      ['27 novembre', 'Vendredi fou', '2026-11-27', '2026-12-27', '2027-01-24', '24 janv.'],
      ['25 décembre', 'Dernier jour de la période', '2026-12-25', '2027-01-24', null, '24 janv.'],
      ['26 décembre', 'Retour aux 30 jours', '2026-12-26', '2027-01-25', null, '25 janv.']],
    axis: ['2026-11-01', '2027-02-15'], marker: ['2027-01-24', '24 janv. 2027'],
    ticks: [['2026-11-01', 'nov.'], ['2026-12-01', 'déc.'], ['2027-01-01', 'janv.'], ['2027-02-01', 'févr.']],
    src: 'Calcul ReFound d’après joefresh.com/ca/returns · vérifié le 21 novembre 2026 · étiquettes d’origine et reçu exigés · à l’échelle' },
  en: { eyebrow: 'Joe Fresh · 2026 holiday returns', title: 'Purchase date → last day to return',
    ln: 'Regular 30-day window', le: 'Holiday extension (purchases Nov 8 to Dec 25)',
    rows: [['November 7', 'Before the holiday period', '2026-11-07', '2026-12-07', null, 'Dec 7'],
      ['November 8', 'First day of the period', '2026-11-08', '2026-12-08', '2027-01-24', 'Jan 24'],
      ['November 27', 'Black Friday', '2026-11-27', '2026-12-27', '2027-01-24', 'Jan 24'],
      ['December 25', 'Last day of the period', '2026-12-25', '2027-01-24', null, 'Jan 24'],
      ['December 26', 'Back to 30 days', '2026-12-26', '2027-01-25', null, 'Jan 25']],
    axis: ['2026-11-01', '2027-02-15'], marker: ['2027-01-24', 'Jan 24, 2027'],
    ticks: [['2026-11-01', 'Nov'], ['2026-12-01', 'Dec'], ['2027-01-01', 'Jan'], ['2027-02-01', 'Feb']],
    src: 'ReFound calculation based on joefresh.com/ca/returns · checked November 21, 2026 · original tags and receipt required · to scale' }
};

function cover() {
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 80% 35%, rgba(30,184,133,.18), transparent 70%), var(--bg)}
  .left{position:absolute;left:72px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:30px;width:520px}
  .left img{height:34px;align-self:flex-start}
  .big{font-size:104px;line-height:.95;font-weight:800;letter-spacing:-.02em}.big em{font-style:normal;color:var(--green)}
  .chips{display:flex;gap:14px}.chip{border:2px solid var(--line);background:var(--card);border-radius:999px;padding:10px 22px;font-weight:800;font-size:28px}
  .hanger{position:absolute;left:600px;top:70px;width:300px}
  .r{position:absolute;right:70px;top:150px;width:330px;background:#F4F1E8;color:#2A2D33;border-radius:6px;padding:26px 24px 30px;transform:rotate(5deg);font-family:ui-monospace,Menlo,monospace;font-size:17px;box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .r .l{display:grid;grid-template-columns:1fr auto;gap:10px;margin:8px 0}.r .g{height:14px;background:#C9C4B8;border-radius:4px}
  .r .hl{background:rgba(246,184,40,.6);outline:3px solid #E0A315;border-radius:4px;padding:2px 6px;margin-left:-6px;margin-right:-6px}
  .r hr{border:0;border-top:2px dashed #B9B5AA;margin:16px 0}
  .stamp{position:absolute;left:640px;bottom:60px;width:170px;height:170px;border-radius:50%;background:var(--green);color:#0E1217;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-10deg);box-shadow:0 18px 40px rgba(0,0,0,.4)}
  .stamp b{font-family:'Funnel Display';font-size:60px;line-height:1}.stamp span{font-weight:700;font-size:16px;letter-spacing:.08em}
  </style><div class="c"><div class="left"><img src="${LOGO}"><div class="big h">Joe <em>Fresh</em></div>
  <div class="chips"><div class="chip h" style="color:var(--gold)">30</div><div class="chip h" style="color:var(--green)">08.11 → 25.12</div></div></div>
  <svg class="hanger" viewBox="0 0 300 200" fill="none" stroke="#F0F2F5" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"><path d="M150 62c0-18 14-28 28-26 16 2 22 22 10 32-8 6-38 22-38 22L22 160c-10 6-6 18 6 18h244c12 0 16-12 6-18L150 90"/></svg>
  <div class="r"><div class="l"><span>BANANES</span><span>1.66</span></div><div class="l"><span>MANDARINE</span><span>6.99</span></div>
  <div class="l hl"><span>SW JOGGER</span><span>29.00</span></div><div class="l hl"><span>SW HOODY</span><span>16.94</span></div>
  <div class="l"><span>PAIN</span><span>4.00</span></div><hr><div class="g"></div><div class="g" style="width:60%;margin-top:10px"></div></div>
  <div class="stamp"><b>24.01</b><span>2027</span></div></div>`;
}
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const only = process.argv[3];
  let jobs = [['cover.png', cover(), 630]];
  for (const l of ['fr', 'en']) jobs.push([`retours-fetes-${l}.png`, calendar(C[l]), 675]);
  if (only) jobs = jobs.filter(j => j[0].startsWith(only));
  const b = await chromium.launch();
  for (const [name, html, h] of jobs) {
    const p = await b.newPage({ viewport: { width: 1200, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
