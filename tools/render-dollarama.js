// Usage: node render-dollarama.js <outDir> [prefix]
// unlimited(): copie de render-tigre-geant.js avec une barre de longueur nulle (« Aucun retour ») pour une politique
// sans retour, et un délai qui ne vaut que pour les articles défectueux. cover(): reçu court, flèche de retour barrée, « 30 ».
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
.h{font-family:'Funnel Display',sans-serif}`;
const LOGO = `data:image/png;base64,${b64('assets/logo-refound-light.png')}`;

const MAX = 365, AX = 80;
// unlimited() de Tigre Géant + barre de longueur nulle (« Aucun retour ») pour une politique sans retour.
function unlimited(lang) {
  const t = lang === 'fr' ? {
    eyebrow: 'Délais comparés · 3 magasins à petits prix', title: 'Chez Dollarama, les 30 jours servent aux articles défectueux.',
    none: 'Aucune date limite', zero: 'Aucun retour ni échange', d: 'j', axis: 'jours après l’achat', beyond: 'sans limite',
    rows: [
      ['Dollarama', 'Article non défectueux', 0, 'var(--muted)'],
      ['Dollarama', 'Défectueux ou endommagé (à signaler)', 30, 'var(--gold)'],
      ['Walmart', 'La plupart des articles', 90, '#5FD3AE'],
      ['Tigre Géant', 'Avec le reçu', null, 'var(--green)'],
    ],
    src: 'Sources : dollarama.com (Nous joindre, Termes et conditions), walmart.ca, gianttiger.com · vérifié le 19 novembre 2026 · des exceptions s’appliquent'
  } : {
    eyebrow: 'Windows compared · 3 discount retailers', title: 'At Dollarama, the 30 days are for defective items.',
    none: 'No time limit', zero: 'No returns or exchanges', d: 'd', axis: 'days after purchase', beyond: 'no limit',
    rows: [
      ['Dollarama', 'Item that isn’t defective', 0, 'var(--muted)'],
      ['Dollarama', 'Defective or damaged (to report)', 30, 'var(--gold)'],
      ['Walmart', 'Most items', 90, '#5FD3AE'],
      ['Giant Tiger', 'With the receipt', null, 'var(--green)'],
    ],
    src: 'Sources: dollarama.com (Contact us, Terms and Conditions), walmart.ca, gianttiger.com · checked November 19, 2026 · exceptions apply'
  };
  const rows = t.rows.map(([m, a, d, c], i) => {
    const w = d === null ? 100 : d / MAX * AX;
    let bar;
    if (d === null) bar = `<div class="bar inf" style="width:100%;background:linear-gradient(90deg,${c} 0%,${c} ${AX}%,transparent 100%)"></div><span class="h val in">${t.none} →</span>`;
    else if (d === 0) bar = `<div class="bar" style="width:6px;background:${c}"></div><span class="h val" style="left:22px;color:var(--muted)">${t.zero}</span>`;
    else bar = `<div class="bar" style="width:${w}%;background:${c}"></div><span class="h val" style="left:calc(${w}% + 12px)">${d} ${t.d}</span>`;
    return `<div class="row${i < 2 ? ' first' : ''}"><div class="lab"><span class="m">${m}</span><span class="a">${a}</span></div><div class="track">${bar}</div></div>`;
  }).join('');
  const ticks = [0, 30, 90, 180, 365].map(v => `<span style="left:${v / MAX * AX}%">${v}</span>`).join('');
  return `<style>${CSS}
  .wrap{width:1200px;height:675px;padding:44px 60px 34px;display:flex;flex-direction:column}
  .eyebrow{color:var(--green);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:16px}
  h1{font-size:38px;line-height:1.1;margin-top:10px;font-weight:800}
  .rows{margin-top:34px;display:grid;gap:18px;position:relative}
  .row{display:grid;grid-template-columns:330px 1fr;gap:22px;align-items:center}
  .lab{display:flex;flex-direction:column}.m{font-weight:700;font-size:20px}.a{color:var(--muted);font-size:15.5px;margin-top:2px}
  .track{height:56px;background:var(--card);border:1px solid var(--line);border-radius:10px;position:relative;overflow:hidden}
  .track::after{content:'';position:absolute;left:${AX}%;top:0;bottom:0;right:0;background:repeating-linear-gradient(135deg,rgba(132,145,164,.10) 0 6px,transparent 6px 12px);border-left:2px dashed #3A414C}
  .bar{height:100%;border-radius:9px}
  .val{position:absolute;top:50%;transform:translateY(-50%);font-weight:800;font-size:21px;white-space:nowrap}
  .val.in{left:18px;color:#0E1217}
  .row.first .track{border-color:#4A5260}
  .axis{display:grid;grid-template-columns:330px 1fr;gap:22px;color:var(--muted);font-size:14px;margin-top:10px}
  .axis .sc{position:relative;height:18px}.axis .sc span{position:absolute;transform:translateX(-50%)}.axis .sc span:first-child{transform:none}
  .axis .sc .b{left:${(AX + 100) / 2}%;color:var(--fg);font-weight:700;white-space:nowrap}
  .axis .cap{grid-column:2;font-size:13px}
  .foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:14px;margin-top:auto}
  .foot p{color:var(--muted);font-size:13.5px;max-width:960px}.foot img{height:20px}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="rows">${rows}</div>
  <div class="axis"><div></div><div class="sc">${ticks}<span class="b">${t.beyond}</span></div><div></div><div class="cap">${t.axis}</div></div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

// Couverture sans texte dépendant de la langue : reçu court de magasin à petits prix, flèche de retour barrée, calendrier « 30 ».
function cover() {
  const lines = [[62,'1,25'],[48,'3,00'],[70,'1,50'],[55,'1,75'],[66,'4,50'],[44,'2,00'],[58,'5,00']];
  return `<style>${CSS}
  .wrap{width:1200px;height:630px;position:relative;overflow:hidden;background:
    radial-gradient(640px 420px at 22% 60%, rgba(246,184,40,.13), transparent 70%), radial-gradient(600px 400px at 85% 25%, rgba(30,184,133,.14), transparent 70%), var(--bg)}
  .logo{position:absolute;right:72px;bottom:56px;height:32px}
  .r{position:absolute;left:120px;top:44px;width:330px;height:540px;border-radius:6px;padding:34px 30px;transform:rotate(-4deg);
     background:linear-gradient(180deg,#F4F1E8 0%,#F4F1E8 60%,#E6E0D0 100%);box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .r .top{height:16px;width:55%;margin:0 auto 28px;border-radius:3px;background:#2A2D33}
  .r .l{display:flex;justify-content:space-between;align-items:center;margin:16px 0}
  .r .l i{display:block;height:11px;border-radius:3px;background:#2A2D33;opacity:.8}
  .r .l b{font-family:ui-monospace,Menlo,monospace;color:#2A2D33;font-size:19px}
  .r .gr{position:absolute;left:30px;right:30px;bottom:34px;height:46px;border-radius:4px;background:#C9C3B4}
  .ret{position:absolute;left:560px;top:140px;width:250px;height:250px}
  .cal{position:absolute;right:120px;top:150px;width:220px;height:230px;border-radius:22px;background:var(--card);border:2px solid var(--line);overflow:hidden}
  .cal .bar{height:52px;background:var(--gold)}
  .cal .n{font-size:128px;font-weight:800;text-align:center;line-height:170px;color:var(--fg)}
  .cal .rings{position:absolute;top:-12px;left:0;right:0;display:flex;justify-content:space-around;padding:0 44px}
  .cal .rings span{width:14px;height:36px;border-radius:7px;background:#3A414C}
  </style><div class="wrap">
  <div class="r"><div class="top"></div>${lines.map(([w,p]) => `<div class="l"><i style="width:${w}%"></i><b>${p}</b></div>`).join('')}<div class="gr"></div></div>
  <svg class="ret" viewBox="0 0 100 100"><path d="M74 30 A30 30 0 1 0 80 55" fill="none" stroke="#1EB885" stroke-width="8" stroke-linecap="round"/>
    <path d="M62 18 L78 30 L62 42" fill="none" stroke="#1EB885" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="18" y1="84" x2="84" y2="16" stroke="#F6B828" stroke-width="9" stroke-linecap="round"/></svg>
  <div class="cal"><div class="rings"><span></span><span></span></div><div class="bar"></div><div class="n h">30</div></div>
  <img class="logo" src="${LOGO}">
  </div>`;
}

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const only = process.argv[3];
  let jobs = [['cover.png', cover(), 1200, 630], ['delais-fr.png', unlimited('fr'), 1200, 675], ['delais-en.png', unlimited('en'), 1200, 675]];
  if (only) jobs = jobs.filter(j => j[0].startsWith(only));
  for (const [name, html, w, h] of jobs) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
