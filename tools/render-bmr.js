// Visuels de l'article politique-retour-bmr. Usage : node render-bmr.js ../posts/politique-retour-bmr/images
// compare() : comparer plusieurs politiques d'une même enseigne (colonnes = propriétaires/canaux, lignes = critères).
// Réutilisable pour toute bannière dont les magasins ont des politiques différentes.
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

function compare(lang) {
  const t = lang === 'fr' ? {
    eyebrow: 'BMR · trois politiques de retour publiées', title: 'Même enseigne, règles différentes',
    cols: [['BMR.ca', 'achats en ligne'], ['Avantis Coopérative', 'ses magasins BMR'], ['BMR Anctil', 'Magog, St-Denis-de-Brompton']],
    rows: [
      ['Délai', ['30 jours', '30 jours', '30 jours']],
      ['À partir de', ['la réception', 'l’achat', 'la réception']],
      ['Preuve', ['nº de commande + nº de facture', 'facture originale', 'facture originale']],
      ['Frais', ['livraison selon le motif', 'jusqu’à <b class="w">15 %</b> du remboursement', 'peuvent s’appliquer']],
      ['À noter', ['défaut : 3 jours pour le signaler', 'autorisation d’un responsable', 'retour au magasin d’achat']],
    ],
    src: 'Sources : bmr.ca (politique en ligne), avantis.coop, bmranctil.com · vérifié le 20 novembre 2026'
  } : {
    eyebrow: 'BMR · three published return policies', title: 'Same banner, different rules',
    cols: [['BMR.ca', 'online purchases'], ['Avantis Coopérative', 'its BMR stores'], ['BMR Anctil', 'Magog, St-Denis-de-Brompton']],
    rows: [
      ['Time limit', ['30 days', '30 days', '30 days']],
      ['Counted from', ['receipt of the product', 'the purchase', 'receipt of the product']],
      ['Proof', ['order no. + invoice no.', 'original invoice', 'original invoice']],
      ['Fees', ['shipping, depending on reason', 'up to <b class="w">15%</b> of the refund', 'may apply']],
      ['Note', ['defect: report within 3 days', 'manager approval', 'back to the store of purchase']],
    ],
    src: 'Sources: bmr.ca (online policy), avantis.coop, bmranctil.com (in French) · checked November 20, 2026'
  };
  const head = `<div></div>` + t.cols.map(c => `<div class="ch"><div class="h a">${c[0]}</div><div class="b">${c[1]}</div></div>`).join('');
  const body = t.rows.map(([k, v], i) => `<div class="k">${k}</div>` + v.map(x => `<div class="c${i === 1 ? ' hl' : ''}"><span>${x}</span></div>`).join('')).join('');
  return `<style>${CSS}
  .wrap{width:1200px;height:675px;padding:46px 60px 34px;display:flex;flex-direction:column}
  .eyebrow{color:var(--green);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:16px}
  h1{font-size:42px;line-height:1.1;margin-top:10px;font-weight:800}
  .g{display:grid;grid-template-columns:150px repeat(3,1fr);gap:8px 10px;margin-top:26px;align-items:stretch}
  .ch{background:var(--card);border:1px solid var(--line);border-top:4px solid var(--green);border-radius:12px;padding:12px 16px}
  .ch .a{font-size:22px;font-weight:800}.ch .b{color:var(--muted);font-size:14px;margin-top:2px}
  .k{color:var(--muted);font-size:16px;font-weight:700;display:flex;align-items:center}
  .c{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px 16px;font-size:18px;font-weight:500;display:flex;align-items:center;min-height:52px}
  .c.hl{color:var(--gold);font-weight:700}
  .w{color:var(--gold)}
  .foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:14px;margin-top:auto}
  .foot p{color:var(--muted);font-size:14px}.foot img{height:20px}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="g">${head}${body}</div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

// Couverture sans texte dépendant de la langue : un reçu « 30 » qui se divise en trois magasins (même toit, chiffres différents).
function cover() {
  const store = (x, y, col, mark) => `<div class="st" style="left:${x}px;top:${y}px;border-color:${col}">
    <svg width="64" height="52" viewBox="0 0 64 52"><path d="M4 22 L32 4 L60 22" stroke="${col}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="12" y="22" width="40" height="26" rx="3" fill="none" stroke="${col}" stroke-width="5"/></svg>
    <b class="h" style="color:${col}">${mark}</b></div>`;
  return `<style>${CSS}
  .wrap{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 80% 40%, rgba(30,184,133,.16), transparent 70%), var(--bg)}
  .left{position:absolute;left:72px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:26px;width:470px}
  .left img{height:34px;align-self:flex-start}
  .big{font-size:150px;line-height:.85;font-weight:800;letter-spacing:-.02em}.big em{font-style:normal;color:var(--green)}
  .r{position:absolute;left:520px;top:150px;width:230px;background:#F4F1E8;color:#2A2D33;border-radius:6px;padding:22px 20px;transform:rotate(-4deg);box-shadow:0 30px 60px rgba(0,0,0,.45);font-family:ui-monospace,Menlo,monospace}
  .r .ln{height:9px;background:#CFCABD;border-radius:4px;margin:10px 0}
  .r .n{font-family:'Funnel Display';font-weight:800;font-size:76px;text-align:center;color:#2A2D33;margin:8px 0 2px}
  .r .bar{height:40px;margin-top:14px;background:#BDB8AC;border-radius:3px}
  .st{position:absolute;width:250px;height:118px;background:var(--card);border:2px solid;border-radius:16px;display:flex;align-items:center;gap:20px;padding:0 24px}
  .st b{font-size:38px;font-weight:800}
  svg.lk{position:absolute;left:0;top:0}
  </style><div class="wrap">
  <svg class="lk" width="1200" height="630"><g stroke="#3A414C" stroke-width="3" fill="none" stroke-dasharray="8 8">
    <path d="M760 300 C 820 300, 830 130, 890 130"/><path d="M770 330 L 890 320"/><path d="M760 360 C 820 360, 830 510, 890 510"/></g></svg>
  <div class="left"><img src="${LOGO}"><div class="big h">BMR</div></div>
  <div class="r"><div class="ln" style="width:70%"></div><div class="ln"></div><div class="ln" style="width:55%"></div><div class="n">30</div><div class="ln" style="width:80%"></div><div class="bar"></div></div>
  ${store(890, 72, '#1EB885', '30')}${store(890, 262, '#F6B828', '−15 %')}${store(890, 452, '#5FD3AE', '?')}
  </div>`;
}

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const jobs = [['cover.png', cover(), 1200, 630], ['politiques-fr.png', compare('fr'), 1200, 675], ['politiques-en.png', compare('en'), 1200, 675]];
  for (const [name, html, w, h] of jobs) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
