// Usage: node render-reclamation-garantie.js <outDir>
// Gabarits : contacts() — protections d'un même achat sur un axe de vraies dates, avec « à qui s'adresser » par ligne
// (barre pleine, barre pointillée « durée selon la marque », barre en fondu « durée raisonnable ») ;
// cover() — couverture sans texte : un reçu relié à trois destinations (magasin, fabricant, loi).
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

const D = s => new Date(s + 'T00:00:00Z').getTime();
const AX0 = D('2026-11-27'), AX1 = D('2031-06-01');
const pct = s => (D(s) - AX0) / (AX1 - AX0) * 100;

function contacts(lang) {
  const fr = lang === 'fr';
  const t = fr ? {
    eyebrow: 'Exemple · téléviseur acheté le Vendredi fou au Québec',
    title: 'Qui contacter, et jusqu’à quand?',
    rows: [
      { kind: 'solid', a: 'Retour (électronique)', who: '→ Le magasin', from: '2026-11-27', to: '2026-12-27', col: 'var(--gold)', end: '27 déc. 2026' },
      { kind: 'dash', a: 'Garantie du fabricant', who: '→ Le fabricant', from: '2026-11-27', to: '2028-11-27', col: '#5FD3AE', end: 'Durée selon la marque' },
      { kind: 'solid', a: 'Garantie de bon fonctionnement', who: '→ Commerçant, fabricant ou les deux', from: '2026-12-03', to: '2030-12-03', col: 'var(--green)', end: '3 déc. 2030' },
      { kind: 'fade', a: 'Garantie légale', who: '→ Commerçant (et fabricant)', from: '2026-11-27', to: '2031-06-01', col: 'var(--green)', end: 'Durée raisonnable' },
    ],
    marks: [['Achat 27 nov. 2026', '2026-11-27'], ['Livraison 3 déc.', '2026-12-03']],
    src: 'Sources : canadiantire.ca (30 jours, électronique), Office de la protection du consommateur (4 ans dès la livraison) · vérifié le 16 novembre 2026'
  } : {
    eyebrow: 'Example · TV bought on Black Friday in Quebec',
    title: 'Who to contact, and until when?',
    rows: [
      { kind: 'solid', a: 'Return (electronics)', who: '→ The store', from: '2026-11-27', to: '2026-12-27', col: 'var(--gold)', end: 'Dec 27, 2026' },
      { kind: 'dash', a: 'Manufacturer warranty', who: '→ The manufacturer', from: '2026-11-27', to: '2028-11-27', col: '#5FD3AE', end: 'Length depends on brand' },
      { kind: 'solid', a: 'Warranty of good working order', who: '→ Merchant, manufacturer or both', from: '2026-12-03', to: '2030-12-03', col: 'var(--green)', end: 'Dec 3, 2030' },
      { kind: 'fade', a: 'Legal warranty', who: '→ Merchant (and manufacturer)', from: '2026-11-27', to: '2031-06-01', col: 'var(--green)', end: 'Reasonable time' },
    ],
    marks: [['Bought Nov 27, 2026', '2026-11-27'], ['Delivered Dec 3', '2026-12-03']],
    src: 'Sources: canadiantire.ca (30 days, electronics), Office de la protection du consommateur (4 years from delivery) · checked November 16, 2026'
  };
  const rows = t.rows.map(r => {
    const l = pct(r.from), w = pct(r.to) - pct(r.from);
    let bar, lab;
    if (r.kind === 'solid') bar = `<div class="bar" style="left:${l}%;width:${w}%;background:${r.col}"></div>`;
    if (r.kind === 'dash') bar = `<div class="bar dash" style="left:${l}%;width:${w}%;border-color:${r.col}"></div>`;
    if (r.kind === 'fade') bar = `<div class="bar" style="left:${l}%;width:${w}%;background:linear-gradient(90deg,${r.col} 0%,rgba(30,184,133,.55) 55%,rgba(30,184,133,0) 100%)"></div>`;
    const right = l + w;
    if (r.kind === 'fade' || r.kind === 'dash') lab = `<span class="val in" style="left:16px">${r.end}</span>`;
    else if (right > 75) lab = `<span class="val in dark" style="right:calc(${100 - right}% + 14px)">${r.end}</span>`;
    else lab = `<span class="val" style="left:calc(${right}% + 14px)">${r.end}</span>`;
    return `<div class="row"><div class="lab"><div class="a">${r.a}</div><div class="b">${r.who}</div></div>
      <div class="track">${bar}${lab}</div></div>`;
  }).join('');
  const years = ['2027', '2028', '2029', '2030', '2031'].map(y => `<span style="left:${pct(y + '-01-01')}%">${y}</span>`).join('');
  const grid = ['2027', '2028', '2029', '2030', '2031'].map(y => `<i style="left:${pct(y + '-01-01')}%"></i>`).join('');
  return `<style>${CSS}
  .wrap{width:1200px;height:675px;padding:50px 64px 40px;display:flex;flex-direction:column}
  .eyebrow{color:var(--green);font-weight:700;letter-spacing:.1em;text-transform:uppercase;font-size:17px}
  h1{font-size:44px;line-height:1.1;margin-top:10px;font-weight:800}
  .mk{display:grid;grid-template-columns:340px 1fr;gap:24px;margin-top:26px;color:var(--muted);font-size:15px}
  .mk div:last-child{position:relative;height:20px}.mk span{position:absolute;white-space:nowrap}
  .body{position:relative;display:grid;gap:18px;margin-top:8px}
  .gridl{position:absolute;left:364px;right:0;top:0;bottom:0;pointer-events:none}.gridl i{position:absolute;top:0;bottom:0;border-left:1px dashed #2E3540}
  .row{display:grid;grid-template-columns:340px 1fr;gap:24px;align-items:center}
  .a{font-weight:700;font-size:21px}.b{color:var(--muted);font-size:16px;margin-top:3px}
  .track{height:62px;background:var(--card);border:1px solid var(--line);border-radius:12px;position:relative;overflow:hidden}
  .bar{position:absolute;top:0;bottom:0;border-radius:10px;min-width:4px}
  .dash{border:2px dashed;border-right:none;background:rgba(95,211,174,.10);-webkit-mask-image:linear-gradient(90deg,#000 40%,transparent 100%)}
  .val{position:absolute;top:50%;transform:translateY(-50%);font-weight:700;font-size:19px;white-space:nowrap}
  .val.dark{color:#0E1217}.val.in{font-weight:800}
  .axis{display:grid;grid-template-columns:340px 1fr;gap:24px;color:var(--muted);font-size:15px;margin-top:10px}
  .axis div:last-child{position:relative;height:18px}.axis span{position:absolute;transform:translateX(-50%)}
  .foot{display:flex;justify-content:space-between;align-items:center;gap:24px;border-top:1px solid var(--line);padding-top:16px;margin-top:auto}
  .foot p{color:var(--muted);font-size:14px;line-height:1.4;max-width:900px}.foot img{height:22px}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="mk"><div></div><div><span style="left:0">▼ ${t.marks[0][0]} · ${t.marks[1][0]}</span></div></div>
  <div class="body"><div class="gridl">${grid}</div>${rows}</div>
  <div class="axis"><div></div><div>${years}</div></div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

function cover() {
  const icon = {
    store: `<svg viewBox="0 0 64 64" width="72" height="72" fill="none" stroke="#F6B828" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"><path d="M8 26 L12 12 H52 L56 26"/><path d="M8 26 q6 7 12 0 q6 7 12 0 q6 7 12 0 q6 7 12 0"/><path d="M12 30 V54 H52 V30"/><path d="M26 54 V40 H38 V54"/></svg>`,
    factory: `<svg viewBox="0 0 64 64" width="72" height="72" fill="none" stroke="#5FD3AE" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"><path d="M8 54 V30 L22 38 V30 L36 38 V14 H46 V54 Z"/><path d="M8 54 H56"/><path d="M15 46 h4 M27 46 h4 M39 46 h4"/></svg>`,
    law: `<svg viewBox="0 0 64 64" width="72" height="72" fill="none" stroke="#1EB885" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"><path d="M32 10 V54 M20 54 H44 M14 18 H50"/><path d="M14 18 L6 36 h16 Z"/><path d="M50 18 L42 36 h16 Z"/></svg>`
  };
  const lines = Array.from({ length: 7 }, (_, i) => `<div class="ln" style="width:${[78, 62, 84, 55, 70, 64, 80][i]}%"></div>`).join('');
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(900px 500px at 15% 20%,#1B2A26 0%,var(--bg) 60%)}
  .rcpt{position:absolute;left:150px;top:70px;width:300px;height:470px;background:#F0F2F5;border-radius:6px;padding:36px 30px;
    -webkit-mask:radial-gradient(10px at 50% 100%,#0000 98%,#000) 0 0/20px 100%;transform:rotate(-4deg);box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .ln{height:12px;background:#C9CED6;border-radius:6px;margin:14px 0}
  .ln.hl{background:#1EB885}
  .bc{margin-top:34px;height:60px;background:repeating-linear-gradient(90deg,#14181F 0 3px,transparent 3px 7px,#14181F 7px 9px,transparent 9px 13px)}
  svg.links{position:absolute;inset:0}
  .dest{position:absolute;left:800px;width:250px;height:132px;background:var(--card);border:1px solid var(--line);border-radius:22px;display:flex;align-items:center;justify-content:center}
  .logo{position:absolute;right:48px;bottom:36px;height:26px}
  </style><div class="c">
  <svg class="links" width="1200" height="630"><g fill="none" stroke-width="4" stroke-linecap="round">
    <path d="M452 300 C620 300 640 136 800 136" stroke="#F6B828"/>
    <path d="M452 300 C620 300 640 315 800 315" stroke="#5FD3AE"/>
    <path d="M452 300 C620 300 640 494 800 494" stroke="#1EB885"/></g>
    <circle cx="452" cy="300" r="10" fill="#F0F2F5"/></svg>
  <div class="rcpt">${lines.replace('<div class="ln" style="width:84%">', '<div class="ln hl" style="width:84%">')}<div class="bc"></div></div>
  <div class="dest" style="top:70px">${icon.store}</div>
  <div class="dest" style="top:249px">${icon.factory}</div>
  <div class="dest" style="top:428px">${icon.law}</div>
  <img class="logo" src="${LOGO}"></div>`;
}

(async () => {
  const out = process.argv[2] || '.'; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const pg = await b.newPage({ deviceScaleFactor: 1 });
  const shot = async (html, w, h, f) => { await pg.setViewportSize({ width: w, height: h }); await pg.setContent(html); await pg.waitForTimeout(300); await pg.screenshot({ path: path.join(out, f) }); };
  await shot(cover(), 1200, 630, 'cover.png');
  await shot(contacts('fr'), 1200, 675, 'ligne-temps-fr.png');
  await shot(contacts('en'), 1200, 675, 'ligne-temps-en.png');
  await b.close();
})();
