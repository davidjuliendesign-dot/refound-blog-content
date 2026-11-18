// Visuels de posts/rappel-produit-recu. Usage: node render-rappel-produit.js <outDir> [prefix]
// Gabarits réutilisables :
//  - gap() : délai entre l'achat et un événement (ex. avis de rappel), à l'échelle en mois, avec une
//    fenêtre courte superposée en doré (ex. délai de retour de 90 jours) ; une barre par produit.
//  - where() : deux colonnes « ce qui est sur le reçu » / « ce qui est sur le produit », reliées par
//    une bande centrale (l'identifiant commun). Utile pour tout article « quoi garder, où trouver quoi ».
//  - cover() : sans texte dépendant de la langue (reçu, ligne surlignée, loupe, triangle d'alerte).
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
.wrap{width:1200px;height:675px;padding:48px 64px 36px;display:flex;flex-direction:column}
.eyebrow{color:var(--green);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:17px}
h1{font-size:40px;line-height:1.12;margin-top:10px;font-weight:800}
.foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:14px;margin-top:auto}
.foot p{color:var(--muted);font-size:14px}.foot img{height:22px}`;
const LOGO = `data:image/png;base64,${b64('assets/logo-refound-light.png')}`;

// rows: [label, sub, months, valueLabel]; short = mois de la fenêtre dorée (ex. 3 pour 90 jours)
function gap(t, max, short) {
  const rows = t.rows.map(([a, b, m, v]) => {
    const w = m / max * 100;
    const inside = w > 55;
    return `<div class="row"><div class="lab"><div class="a">${a}</div><div class="b">${b}</div></div>
    <div class="track"><div class="bar" style="width:${w}%"></div><div class="rt" style="width:${short / max * 100}%"></div>
    <span class="h val" style="${inside ? 'right:calc(' + (100 - w) + '% + 16px);color:#0E1217' : 'left:calc(' + w + '% + 14px)'}">${v}</span></div></div>`;
  }).join('');
  const ticks = [];
  for (let m = 0; m <= max; m += 12) ticks.push(`<span style="left:${m / max * 100}%">${m === 0 ? t.t0 : (m / 12) + ' ' + (m === 12 ? t.yr1 : t.yr)}</span>`);
  return `<style>${CSS}
  .legend{display:flex;gap:28px;margin-top:16px;font-size:16px;color:var(--muted)}.legend i{display:inline-block;width:14px;height:14px;border-radius:3px;margin-right:8px;vertical-align:-2px}
  .rows{margin-top:22px;display:grid;gap:16px}
  .row{display:grid;grid-template-columns:330px 1fr;gap:26px;align-items:center}
  .a{font-weight:700;font-size:20px}.b{color:var(--muted);font-size:14px;margin-top:3px;line-height:1.3}
  .track{height:54px;background:var(--card);border:1px solid var(--line);border-radius:10px;position:relative;overflow:hidden}
  .bar{position:absolute;left:0;top:0;bottom:0;background:var(--green);border-radius:9px}
  .rt{position:absolute;left:0;top:0;bottom:0;background:var(--gold)}
  .val{position:absolute;top:50%;transform:translateY(-50%);font-weight:800;font-size:22px;white-space:nowrap}
  .axis{display:grid;grid-template-columns:330px 1fr;gap:26px;color:var(--muted);font-size:14px;margin-top:8px}
  .axis div:last-child{position:relative;height:18px}.axis span{position:absolute;transform:translateX(-50%);white-space:nowrap}.axis span:first-child{transform:none}.axis span:last-child{transform:translateX(-100%)}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="legend"><span><i style="background:var(--gold)"></i>${t.lr}</span><span><i style="background:var(--green)"></i>${t.lw}</span></div>
  <div class="rows">${rows}</div>
  <div class="axis"><div></div><div>${ticks.join('')}</div></div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

// t.left / t.right : {title, items:[[k, v]]}; t.mid : {title, text}
function where(t) {
  const col = (c, cls) => `<div class="col ${cls}"><div class="ct h">${c.title}</div>${c.items.map(([k, v]) => `<div class="it"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('')}</div>`;
  return `<style>${CSS}
  .grid{margin-top:24px;display:grid;grid-template-columns:1fr 250px 1fr;gap:18px;align-items:stretch;flex:1;margin-bottom:18px}
  .col{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:26px 26px;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px}
  .col.r{border-top:4px solid var(--gold)}.col.l{border-top:4px solid var(--green)}
  .ct{font-size:26px;font-weight:800;margin-bottom:4px}
  .it{display:grid;grid-template-columns:160px 1fr;gap:12px;font-size:17px;line-height:1.3}.k{color:var(--muted)}.v{font-weight:700}
  .mono{font-family:ui-monospace,Menlo,monospace;font-weight:700}
  .mid{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;padding:0 6px}
  .mid .code{font-family:ui-monospace,Menlo,monospace;font-size:26px;font-weight:800;color:var(--fg);background:#0E1217;border:2px solid var(--green);border-radius:10px;padding:10px 14px}
  .mid .arrow{color:var(--green);font-size:30px;line-height:1}
  .mid p{color:var(--muted);font-size:14px;line-height:1.35}
  .mid b{color:var(--fg);font-size:16px}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="grid">${col(t.left, 'l')}<div class="mid"><b>${t.mid.title}</b><div class="arrow">⟷</div><div class="code">${t.mid.code}</div><div class="arrow">⟷</div><p>${t.mid.text}</p></div>${col(t.right, 'r')}</div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

function cover() {
  // Lignes fictives (aucun vrai produit) : un numéro au format ###-####-# et une description floutée.
  const lines = [['0XX-XXXX-X', 210], ['1XX-XXXX-X', 170], ['0XX-XXXX-X', 230], ['1XX-XXXX-X', 150]];
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(640px 420px at 78% 40%, rgba(30,184,133,.16), transparent 70%), radial-gradient(420px 300px at 20% 80%, rgba(246,184,40,.10), transparent 70%), var(--bg)}
  .logo{position:absolute;left:64px;top:56px;height:34px}
  .r{position:absolute;left:150px;top:118px;width:560px;background:#F4F1E8;color:#2A2D33;border-radius:6px;padding:34px 34px 40px;transform:rotate(-3deg);font-family:ui-monospace,Menlo,monospace;font-size:21px;box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .r .l{display:grid;grid-template-columns:150px 1fr;gap:16px;margin:12px 0;padding:6px 10px;border-radius:4px}
  .r .hl{background:rgba(246,184,40,.55);outline:3px solid #E0A315}
  .r .blur{display:block;height:16px;margin-top:5px;background:#BDB8AC;border-radius:4px}
  .r hr{border:0;border-top:2px dashed #B9B5AA;margin:18px 0}
  .bars{height:46px;background:repeating-linear-gradient(90deg,#2A2D33 0 3px,transparent 3px 6px,#2A2D33 6px 7px,transparent 7px 11px)}
  .lens{position:absolute;left:520px;top:150px;width:230px;height:230px;border-radius:50%;border:16px solid var(--green);background:rgba(30,184,133,.10);box-shadow:0 20px 50px rgba(0,0,0,.35)}
  .lens:after{content:'';position:absolute;width:34px;height:150px;background:var(--green);border-radius:16px;right:-62px;bottom:-128px;transform:rotate(-45deg)}
  .tri{position:absolute;right:120px;top:300px;width:0;height:0;border-left:120px solid transparent;border-right:120px solid transparent;border-bottom:208px solid var(--gold);filter:drop-shadow(0 18px 40px rgba(0,0,0,.4))}
  .tri b{position:absolute;left:-30px;top:58px;width:60px;text-align:center;font-family:'Funnel Display';font-size:120px;line-height:1;color:#14181F;font-weight:800}
  </style><div class="c"><img class="logo" src="${LOGO}">
  <div class="r">${lines.map((l, i) => `<div class="l ${i === 2 ? 'hl' : ''}"><span>${l[0]}</span><span class="blur" style="width:${l[1]}px"></span></div>`).join('')}<hr><div class="bars"></div></div>
  <div class="lens"></div><div class="tri"><b>!</b></div></div>`;
}

const G = {
  fr: { eyebrow: 'Rappels Canadian Tire · avis de Santé Canada', title: 'Le rappel arrive souvent bien après la fin du délai de retour',
    lr: 'Délai de retour standard : 90 jours', lw: 'Achat le plus ancien → avis de rappel', yr: 'ans', yr1: 'an', t0: 'Achat',
    rows: [['Souffleuse Yardworks 22 po', 'Vendue de mars 2019 à déc. 2021 · rappel élargi le 11 mars 2025', 72, 'jusqu’à 6 ans'],
      ['Radiateur rond CTP Home Collections', 'Vendu de juin 2016 à avril 2018 · rappel le 11 février 2019', 32, '32 mois'],
      ['Tapis de marche PowerG', 'Vendu de janv. 2025 à juillet 2026 · rappel le 27 août 2026', 19, '19 mois'],
      ['Rampe à trois sections', 'Vendue de sept. 2019 à sept. 2020 · rappel le 16 novembre 2020', 14, '14 mois']],
    src: 'Sources : recalls-rappels.canada.ca, canadiantire.ca · vérifié le 18 novembre 2026 · à l’échelle, en mois' },
  en: { eyebrow: 'Canadian Tire recalls · Health Canada notices', title: 'Recalls often come long after the return window closes',
    lr: 'Standard return window: 90 days', lw: 'Earliest purchase → recall notice', yr: 'yrs', yr1: 'yr', t0: 'Purchase',
    rows: [['Yardworks 22-in snowblower', 'Sold Mar. 2019 to Dec. 2021 · recall expanded Mar. 11, 2025', 72, 'up to 6 years'],
      ['Home Collections round PTC heater', 'Sold June 2016 to April 2018 · recalled Feb. 11, 2019', 32, '32 months'],
      ['PowerG walking pad', 'Sold Jan. 2025 to July 2026 · recalled Aug. 27, 2026', 19, '19 months'],
      ['Tri-panel multi-use ramp', 'Sold Sept. 2019 to Sept. 2020 · recalled Nov. 16, 2020', 14, '14 months']],
    src: 'Sources: recalls-rappels.canada.ca, canadiantire.ca · checked November 18, 2026 · to scale, in months' }
};

const WH = {
  fr: { eyebrow: 'Rappel de produit · quoi vérifier, et où', title: 'Le reçu prouve l’achat. Le produit prouve le lot.',
    left: { title: 'Sur le reçu', items: [['Numéro d’article', '<span class="mono">052-2124-0</span>'], ['Description', '<span class="mono">LAMPE DEL GARAG</span>'], ['Date et magasin', 'Quand et où vous l’avez acheté'], ['Paiement', 'Carte utilisée (4 derniers chiffres)'], ['Ce qui manque', 'Marque, modèle, lot']] },
    right: { title: 'Sur le produit', items: [['Numéro de modèle', 'Étiquette ou emballage'], ['CUP', 'Code-barres de l’emballage'], ['Lot', 'Ex. au dos de la souffleuse Yardworks'], ['Poinçon de date', 'Ex. AASS sur les chargeurs IKEA'], ['Bon de commande', 'Ex. étiquette dans la pochette MEC']] },
    mid: { title: 'Chez Canadian Tire', code: '043-5105', text: 'Les avis de rappel citent un numéro au même format que les numéros d’article imprimés sur les reçus.' },
    src: 'Exemple : reçu de démonstration ReFound (Canadian Tire) · avis de recalls-rappels.canada.ca et ikea.com · vérifié le 18 novembre 2026' },
  en: { eyebrow: 'Product recall · what to check, and where', title: 'The receipt proves the purchase. The product proves the batch.',
    left: { title: 'On the receipt', items: [['Item number', '<span class="mono">052-2124-0</span>'], ['Description', '<span class="mono">LAMPE DEL GARAG</span>'], ['Date and store', 'When and where you bought it'], ['Payment', 'Card used, last 4 digits'], ['What’s missing', 'Brand, model, batch']] },
    right: { title: 'On the product', items: [['Model number', 'Label or packaging'], ['UPC', 'Barcode on the packaging'], ['Batch', 'E.g. back of the Yardworks snowblower'], ['Date stamp', 'E.g. YYWW on IKEA chargers'], ['Purchase order', 'E.g. tag inside the MEC pocket']] },
    mid: { title: 'At Canadian Tire', code: '043-5105', text: 'Recall notices list a number in the same format as the item numbers printed on receipts.' },
    src: 'Example: ReFound demo receipt (Canadian Tire) · notices from recalls-rappels.canada.ca and ikea.com · checked November 18, 2026' }
};

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const only = process.argv[3];
  let jobs = [['cover.png', cover(), 630]];
  for (const l of ['fr', 'en']) { jobs.push([`delai-rappel-${l}.png`, gap(G[l], 72, 3), 675]); jobs.push([`recu-vs-produit-${l}.png`, where(WH[l]), 675]); }
  if (only) jobs = jobs.filter(j => j[0].startsWith(only));
  const b = await chromium.launch();
  for (const [name, html, h] of jobs) {
    const p = await b.newPage({ viewport: { width: 1200, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
