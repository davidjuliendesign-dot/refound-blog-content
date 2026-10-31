// Usage: node render.js <outDir>
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

function timeline(lang) {
  const t = lang === 'fr' ? {
    eyebrow: 'Canadian Tire · politique de retour', title: 'Combien de temps pour retourner un article?',
    day: 'jours', start: 'Achat',
    rows: [
      [14, 'Électronique pour l’auto', 'Caméras de recul, audio, GPS, démarreurs à distance'],
      [30, 'Électronique et autres', 'Audio-vidéo, appareils photo, trottinettes électriques, climatiseurs portatifs, AirPods'],
      [90, 'La plupart des articles', 'Non ouverts, dans l’emballage d’origine, avec le reçu'],
    ],
    src: 'Source : canadiantire.ca · vérifié le 31 octobre 2026 · des exceptions s’appliquent'
  } : {
    eyebrow: 'Canadian Tire · return policy', title: 'How long do you have to return an item?',
    day: 'days', start: 'Purchase',
    rows: [
      [14, 'Auto electronics', 'Backup cameras, car audio, GPS, remote starters'],
      [30, 'Electronics and more', 'Audio & video, cameras, e-scooters, portable ACs, AirPods'],
      [90, 'Most items', 'Unopened, in original packaging, with the receipt'],
    ],
    src: 'Source: canadiantire.ca · checked October 31, 2026 · exceptions apply'
  };
  const colors = { 14: 'var(--gold)', 30: '#5FD3AE', 90: 'var(--green)' };
  const rows = t.rows.map(([d, a, b]) => `
    <div class="row">
      <div class="lab"><div class="a">${a}</div><div class="b">${b}</div></div>
      <div class="track"><div class="bar" style="width:${d / 90 * 100}%;background:${colors[d]}"></div><span class="h val" style="left:calc(${d / 90 * 100}% + 14px)">${d} ${t.day}</span></div>
    </div>`).join('');
  return `<style>${CSS}
  .wrap{width:1200px;height:675px;padding:56px 64px 44px;display:flex;flex-direction:column}
  .eyebrow{color:var(--green);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:18px}
  h1{font-size:46px;line-height:1.1;margin-top:12px;font-weight:800}
  .rows{margin-top:40px;display:grid;gap:26px;flex:1}
  .row{display:grid;grid-template-columns:330px 1fr;gap:28px;align-items:center}
  .a{font-weight:700;font-size:23px}.b{color:var(--muted);font-size:16px;margin-top:4px;line-height:1.35}
  .track{height:64px;background:var(--card);border:1px solid var(--line);border-radius:12px;position:relative}
  .bar{height:100%;border-radius:11px}
  .val{position:absolute;top:50%;transform:translateY(-50%);font-weight:800;font-size:26px;white-space:nowrap}
  .row:last-child .val{left:auto!important;right:16px;color:#0E1217}
  .axis{display:grid;grid-template-columns:330px 1fr;gap:28px;color:var(--muted);font-size:15px;margin-top:10px}
  .axis div:last-child{position:relative;height:18px}.axis span{position:absolute;transform:translateX(-50%)}.axis span:first-child{transform:none}
  .foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:18px;margin-top:22px}
  .foot p{color:var(--muted);font-size:15px}.foot img{height:22px}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="rows">${rows}</div>
  <div class="axis"><div></div><div><span style="left:0">${t.start}</span><span style="left:${14/90*100}%">14</span><span style="left:${30/90*100}%">30</span><span style="left:${60/90*100}%">60</span><span style="left:calc(100% - 10px)">90</span></div></div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

function after(lang) {
  const t = lang === 'fr' ? {
    eyebrow: 'Canadian Tire · après l’achat', title: 'Le retour se termine vite. Les garanties, non.',
    st: [['1', 'Retour', '14 à 90 jours', 'Remboursement ou échange, article non ouvert, avec reçu', 'var(--gold)'],
         ['2', 'Garantie d’échange', 'Selon le produit', 'Échange en magasin. Ex. lampe de garage : 5 ans', '#5FD3AE'],
         ['3', 'Garantie du fabricant', 'Selon la marque', 'Réparation ou remplacement d’un article défectueux', 'var(--green)']],
    qc: '<b>Au Québec :</b> garantie légale en plus, et depuis le 5 octobre 2026, garantie de bon fonctionnement de 3 à 6 ans pour 14 catégories de biens.',
    src: 'Sources : canadiantire.ca, Gouvernement du Québec · vérifié le 31 octobre 2026', proof: 'Gardez la preuve d’achat pour chaque étape'
  } : {
    eyebrow: 'Canadian Tire · after the purchase', title: 'Returns end fast. Warranties don’t.',
    st: [['1', 'Return', '14 to 90 days', 'Refund or exchange, unopened item, with receipt', 'var(--gold)'],
         ['2', 'Exchange warranty', 'Depends on product', 'In-store exchange. E.g. garage light: 5 years', '#5FD3AE'],
         ['3', 'Manufacturer warranty', 'Depends on brand', 'Repair or replacement of a defective item', 'var(--green)']],
    qc: '<b>In Quebec:</b> a legal warranty on top, and since October 5, 2026, a 3 to 6 year warranty of good working order on 14 categories of goods.',
    src: 'Sources: canadiantire.ca, Government of Quebec · checked October 31, 2026', proof: 'Keep proof of purchase for every stage'
  };
  const cards = t.st.map(([n, a, b, c, col], i) => `
    <div class="st"><div class="num h" style="background:${col}">${n}</div><div class="a h">${a}</div><div class="b" style="color:${col}">${b}</div><div class="c">${c}</div></div>
    ${i < 2 ? '<div class="arr">→</div>' : ''}`).join('');
  return `<style>${CSS}
  .wrap{width:1200px;height:675px;padding:52px 64px 40px;display:flex;flex-direction:column}
  .eyebrow{color:var(--green);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:18px}
  h1{font-size:46px;line-height:1.1;margin-top:12px;font-weight:800}
  .flow{display:flex;align-items:stretch;gap:14px;margin-top:36px}
  .st{flex:1;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:24px 22px;display:flex;flex-direction:column;gap:8px}
  .num{width:38px;height:38px;border-radius:50%;color:#0E1217;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:20px;margin-bottom:6px}
  .a{font-size:26px;font-weight:800}.b{font-weight:700;font-size:21px}.c{color:var(--muted);font-size:17px;line-height:1.4}
  .arr{display:flex;align-items:center;color:var(--muted);font-size:30px}
  .proof{margin-top:16px;color:var(--fg);font-size:17px;font-weight:500}
  .qc{margin-top:16px;border:1px dashed #3A414C;border-radius:12px;padding:16px 20px;color:var(--fg);font-size:18px;line-height:1.4}
  .qc b{color:var(--gold)}
  .foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:16px;margin-top:auto}
  .foot p{color:var(--muted);font-size:15px}.foot img{height:22px}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="flow">${cards}</div><div class="proof">↳ ${t.proof}</div><div class="qc">${t.qc}</div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

function cover() {
  const lines = [['052-2124-0', 'LAMPE DEL GARAG', '1'], ['184-2003-4', 'HLT NEO WK 4LB', '1']];
  return `<style>${CSS}
  .wrap{width:1200px;height:630px;position:relative;overflow:hidden;background:
    radial-gradient(700px 420px at 85% 30%, rgba(30,184,133,.18), transparent 70%), var(--bg)}
  .left{position:absolute;left:72px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:28px;width:540px}
  .left img{height:34px;align-self:flex-start}
  .big{font-size:108px;line-height:.9;font-weight:800;letter-spacing:-.02em}
  .big em{font-style:normal;color:var(--green)}
  .chips{display:flex;gap:14px}
  .chip{border:2px solid var(--line);background:var(--card);border-radius:999px;padding:10px 22px;font-weight:800;font-size:28px}
  .r{position:absolute;right:96px;top:70px;width:430px;background:#F4F1E8;color:#2A2D33;border-radius:6px;padding:34px 32px 40px;transform:rotate(4deg);
     font-family:ui-monospace,Menlo,monospace;font-size:17px;box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .r .t{text-align:center;font-weight:700;letter-spacing:.2em;margin-bottom:22px}
  .r .l{display:grid;grid-template-columns:auto 1fr auto;gap:12px;margin:9px 0}
  .r .code{color:#6B6F78}
  .r hr{border:0;border-top:2px dashed #B9B5AA;margin:20px 0}
  .stamp{position:absolute;right:70px;bottom:62px;width:150px;height:150px;border-radius:50%;background:var(--green);color:#0E1217;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-10deg);box-shadow:0 18px 40px rgba(0,0,0,.4)}
  .stamp b{font-family:'Funnel Display';font-size:64px;line-height:1}.stamp span{font-weight:700;font-size:15px;letter-spacing:.1em}
  .fade{position:absolute;right:96px;top:70px;width:430px;height:120px}
  </style><div class="wrap">
  <div class="left"><img src="${LOGO}"><div class="big h">Canadian<br><em>Tire</em></div>
  <div class="chips"><div class="chip h" style="color:var(--gold)">14</div><div class="chip h" style="color:#5FD3AE">30</div><div class="chip h" style="color:var(--green)">90</div></div></div>
  <div class="r"><div class="t">CANADIAN TIRE</div>${lines.map(l => `<div class="l"><span class="code">${l[0]}</span><span>${l[1]}</span><span>${l[2]}</span></div>`).join('')}
  <hr><div class="l"><span></span><span>RETOUR / RETURN</span><span>90 J</span></div><hr>
  <div style="height:54px;background:repeating-linear-gradient(90deg,#2A2D33 0 3px,transparent 3px 6px,#2A2D33 6px 7px,transparent 7px 11px)"></div></div>
  <div class="stamp"><b>90</b><span>JOURS · DAYS</span></div>
  </div>`;
}

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const only = process.argv[3];
  let jobs = [['cover.png', cover(), 1200, 630], ['delais-retour-fr.png', timeline('fr'), 1200, 675], ['delais-retour-en.png', timeline('en'), 1200, 675], ['apres-retour-fr.png', after('fr'), 1200, 675], ['apres-retour-en.png', after('en'), 1200, 675]];
  if (only) jobs = jobs.filter(j => j[0].startsWith(only));
  for (const [name, html, w, h] of jobs) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
