// Visuels de posts/politique-retour-decathlon. Usage: node render-decathlon.js <outDir>
// deadlines() copié de render-cadeaux-noel.js (étiquette placée à l'intérieur quand la barre finit à > 80 % de l'axe),
// dates() = jalons datés d'un même achat sur une ligne verticale, cover() = carte membre 365 vs reçu 30, sans texte.
// Gabarit d'origine : deadlines() — un même achat comparé entre marchands sur un axe de dates réelles : barre de la date d'achat à la date limite,
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
    <span class="h val" style="${x(to) > 80 ? `left:calc(${x(to)}% - 10px);transform:translate(-100%,-50%)` : `left:calc(${x(to)}% + 10px)`}">${el}</span></div></div>`).join('');
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
  <div class="legend"><span><i style="background:var(--gold)"></i>${t.lr}</span><span><i class="hatch"></i>${t.lb}</span>${t.marker ? `<span><i class="dash"></i>${t.lm}</span>` : ""}</div>
  <div class="rows"><div class="grid"><div></div><div style="position:relative">${t.marker ? `<div class="mk" style="left:${x(t.marker[0])}%"><span>${t.marker[1]}</span></div>` : ""}</div></div>${rows}</div>
  <div class="axis"><div></div><div>${t.ticks.map(([s, l]) => `<span style="left:${x(s)}%">${l}</span>`).join('')}</div></div>
  <div class="foot" style="margin-top:auto"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}


const AX = ['2026-11-20', '2027-12-20'];
const SE = [['2026-11-27', '2026-11-30'], ['2026-12-26', '2026-12-27']];
const C = {
  fr: { eyebrow: 'Achat du Vendredi fou · 27 novembre 2026', title: 'Jusqu’à quand peut-on le retourner?',
    lr: 'Retour possible', lb: 'Aucun retour en magasin', lm: 'Noël',
    rows: [['Decathlon', 'Compte membre · 365 jours', '2026-11-27', '2027-11-27', '27 nov. 2027'],
      ['Canadian Tire', 'La plupart des articles · 90 jours', '2026-11-27', '2027-02-25', '25 févr. 2027'],
      ['Sports Experts', 'Prolongation des Fêtes', '2026-11-27', '2027-01-10', '10 janv. 2027', SE],
      ['Decathlon', 'Sans compte membre · 30 jours', '2026-11-27', '2026-12-27', '27 déc. 2026'],
      ['Canadian Tire', 'Vélo', '2026-11-27', '2026-11-27', 'Aucun retour']],
    axis: AX, marker: null,
    ticks: [['2026-12-01', 'déc. 2026'], ['2027-03-01', 'mars 2027'], ['2027-06-01', 'juin 2027'], ['2027-09-01', 'sept. 2027'], ['2027-12-01', 'déc. 2027']],
    src: 'Calcul ReFound d’après les politiques officielles · vérifié le 15 novembre 2026 · à l’échelle' },
  en: { eyebrow: 'Black Friday purchase · November 27, 2026', title: 'How long do you have to return it?',
    lr: 'Return accepted', lb: 'No in-store returns', lm: 'Christmas',
    rows: [['Decathlon', 'Member account · 365 days', '2026-11-27', '2027-11-27', 'Nov 27, 2027'],
      ['Canadian Tire', 'Most items · 90 days', '2026-11-27', '2027-02-25', 'Feb 25, 2027'],
      ['Sports Experts', 'Holiday extension', '2026-11-27', '2027-01-10', 'Jan 10, 2027', SE],
      ['Decathlon', 'No membership · 30 days', '2026-11-27', '2026-12-27', 'Dec 27, 2026'],
      ['Canadian Tire', 'Bike', '2026-11-27', '2026-11-27', 'No returns']],
    axis: AX, marker: null,
    ticks: [['2026-12-01', 'Dec 2026'], ['2027-03-01', 'Mar 2027'], ['2027-06-01', 'Jun 2027'], ['2027-09-01', 'Sep 2027'], ['2027-12-01', 'Dec 2027']],
    src: 'ReFound calculation based on official policies · checked November 15, 2026 · to scale' }
};

// dates(): jalons d'un même achat (date, délai, ce qu'on peut faire, couleur) + note
function dates(t) {
  const items = t.items.map(([d, k, x, c]) => `<div class="it"><div class="dot" style="background:${c}"></div>
    <div class="date h" style="color:${c}">${d}</div><div class="k">${k}</div><div class="x">${x}</div></div>`).join('');
  return `<style>${CSS}
  h1{font-size:40px}
  .list{margin-top:34px;position:relative;display:grid;gap:26px}
  .list:before{content:'';position:absolute;left:9px;top:12px;bottom:12px;width:2px;background:var(--line)}
  .it{display:grid;grid-template-columns:20px 230px 190px 1fr;gap:20px;align-items:center;position:relative}
  .dot{width:20px;height:20px;border-radius:50%;border:4px solid var(--bg);box-shadow:0 0 0 2px var(--line);position:relative;z-index:1}
  .date{font-size:28px;font-weight:800;white-space:nowrap}.k{font-weight:700;font-size:19px}.x{color:var(--muted);font-size:18px;line-height:1.35}
  .note{margin-top:30px;border:1px dashed #3A414C;border-radius:12px;padding:13px 18px;font-size:16px;line-height:1.4}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="list">${items}</div><div class="note">${t.note}</div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}
const D = {
  fr: { eyebrow: 'Vélo de marque Decathlon · acheté le 27 novembre 2026', title: 'Les dates à retenir après l’achat',
    items: [['11 déc. 2026', '14 jours', 'Ajustement de prix si le prix baisse et que le prix réduit est encore en vigueur', 'var(--gold)'],
      ['27 déc. 2026', '30 jours', 'Retour sans compte membre, avec le reçu original', 'var(--gold)'],
      ['27 nov. 2027', '365 jours', 'Retour si l’achat a été enregistré au compte membre à la caisse', '#5FD3AE'],
      ['Selon la fiche', 'Garantie Decathlon', 'Nombre d’années indiqué dans l’Aperçu de la fiche du produit', 'var(--green)']],
    note: 'Au Québec, la garantie légale (usage normal pendant une durée raisonnable) s’ajoute, sans durée chiffrée. Un vélo ne fait pas partie des biens visés par la garantie de bon fonctionnement.',
    src: 'Exemple calculé · Sources : decathlon.ca, OPC · vérifié le 15 novembre 2026' },
  en: { eyebrow: 'Decathlon-brand bike · bought November 27, 2026', title: 'The dates that matter after you buy',
    items: [['Dec 11, 2026', '14 days', 'Price adjustment if the price drops and the lower price is still in effect', 'var(--gold)'],
      ['Dec 27, 2026', '30 days', 'Return without a membership, with the original receipt', 'var(--gold)'],
      ['Nov 27, 2027', '365 days', 'Return if the purchase was registered to your member account at checkout', '#5FD3AE'],
      ['Product page', 'Decathlon warranty', 'Number of years shown in the product page’s Overview section', 'var(--green)']],
    note: 'In Quebec, the legal warranty (normal use for a reasonable length of time) also applies, with no set duration. Bikes are not among the goods covered by the warranty of good working order.',
    src: 'Calculated example · Sources: decathlon.ca, OPC · checked November 15, 2026' }
};

// Couverture sans texte dépendant de la langue : carte membre (code-barres) 365 vs reçu papier 30
function cover() {
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 75% 40%, rgba(30,184,133,.18), transparent 70%), var(--bg)}
  .logo{position:absolute;left:72px;top:64px;height:34px}
  .r{position:absolute;left:110px;top:170px;width:300px;background:#F4F1E8;color:#2A2D33;border-radius:6px;padding:26px 24px 30px;transform:rotate(-6deg);font-family:ui-monospace,Menlo,monospace;font-size:18px;box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .r .l{display:grid;grid-template-columns:1fr auto;gap:10px;margin:10px 0}
  .r .l s{color:#B9B5AA;text-decoration:none}
  .r hr{border:0;border-top:2px dashed #B9B5AA;margin:16px 0}
  .bc{height:50px;background:repeating-linear-gradient(90deg,#2A2D33 0 3px,transparent 3px 6px,#2A2D33 6px 7px,transparent 7px 11px)}
  .card{position:absolute;right:120px;top:150px;width:470px;height:290px;border-radius:26px;background:linear-gradient(135deg,#1EB885,#128a63);box-shadow:0 30px 70px rgba(0,0,0,.5);transform:rotate(5deg);padding:34px}
  .card .chip{width:70px;height:52px;border-radius:10px;background:rgba(255,255,255,.25)}
  .card .bc{position:absolute;left:34px;right:34px;bottom:34px;height:70px;background:repeating-linear-gradient(90deg,#0E1217 0 4px,transparent 4px 7px,#0E1217 7px 9px,transparent 9px 14px);border-radius:4px}
  .badge{position:absolute;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Funnel Display';font-weight:800;box-shadow:0 18px 40px rgba(0,0,0,.45)}
  .b30{left:350px;top:390px;width:130px;height:130px;font-size:58px;background:var(--card);border:4px solid var(--gold);color:var(--gold)}
  .b365{right:80px;top:80px;width:170px;height:170px;font-size:62px;background:var(--gold);color:#0E1217;transform:rotate(-8deg)}
  </style><div class="c"><img class="logo" src="${LOGO}">
  <div class="r"><div class="l"><span>████ ███</span><s>—</s></div><div class="l"><span>███ ██████</span><s>—</s></div>
  <div class="l"><span>██████</span><s>—</s></div><hr><div class="l"><span>27/11/26</span><span>★</span></div><hr><div class="bc"></div></div>
  <div class="card"><div class="chip"></div><div class="bc"></div></div>
  <div class="badge b30">30</div><div class="badge b365">365</div></div>`;
}
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  let jobs = [['cover.png', cover(), 630]];
  for (const l of ['fr', 'en']) { jobs.push([`dates-limites-${l}.png`, deadlines(C[l]), 675]); jobs.push([`dates-achat-${l}.png`, dates(D[l]), 675]); }
  const b = await chromium.launch();
  for (const [name, html, h] of jobs) {
    const p = await b.newPage({ viewport: { width: 1200, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
