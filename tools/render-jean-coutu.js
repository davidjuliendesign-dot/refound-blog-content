// Visuels de posts/politique-retour-jean-coutu. Usage : node render-jean-coutu.js ../posts/politique-retour-jean-coutu/images
// deadlines() de render-cadeaux-noel.js réutilisé : une ligne par DATE D'ACHAT (même délai de 30 jours), repère vertical à Noël,
// légende « aucun retour » masquée (lb vide). compare() de render-bmr.js généralisé (reçoit directement les textes) pour comparer
// trois chaînes (colonnes = enseignes, lignes = critères, ligne 2 surlignée). Couverture sans texte dépendant de la langue.
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
  <div class="legend"><span><i style="background:var(--gold)"></i>${t.lr}</span>${t.lb ? `<span><i class="hatch"></i>${t.lb}</span>` : ''}<span><i class="dash"></i>${t.lm}</span></div>
  <div class="rows"><div class="grid"><div></div><div style="position:relative"><div class="mk" style="left:${x(t.marker[0])}%"><span>${t.marker[1]}</span></div></div></div>${rows}</div>
  <div class="axis"><div></div><div>${t.ticks.map(([s, l]) => `<span style="left:${x(s)}%">${l}</span>`).join('')}</div></div>
  <div class="foot" style="margin-top:auto"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}


function compare(t) {
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


const AX = ['2026-11-10', '2027-02-08'];
const D = {
  fr: { eyebrow: 'Jean Coutu · 30 jours après l’achat', title: 'Un cadeau acheté chez Jean Coutu : jusqu’à quand le retourner?',
    lr: 'Retour possible (30 jours)', lb: '', lm: 'Noël',
    rows: [['Acheté le 15 nov.', 'Avant le Vendredi fou', '2026-11-15', '2026-12-15', '15 déc.'],
      ['Acheté le 27 nov.', 'Vendredi fou', '2026-11-27', '2026-12-27', '27 déc.'],
      ['Acheté le 10 déc.', 'Début décembre', '2026-12-10', '2027-01-09', '9 janv.'],
      ['Acheté le 24 déc.', 'Veille de Noël', '2026-12-24', '2027-01-23', '23 janv.']],
    axis: AX, marker: ['2026-12-25', '25 déc.'],
    ticks: [['2026-11-15', '15 nov.'], ['2026-12-01', '1er déc.'], ['2027-01-01', '1er janv.'], ['2027-01-23', '23 janv.']],
    src: 'Calcul ReFound : date d’achat + 30 jours · politique de jeancoutu.com vérifiée le 26 novembre 2026 · à l’échelle' },
  en: { eyebrow: 'Jean Coutu · 30 days from purchase', title: 'A gift bought at Jean Coutu: how long to return it?',
    lr: 'Return accepted (30 days)', lb: '', lm: 'Christmas',
    rows: [['Bought Nov 15', 'Before Black Friday', '2026-11-15', '2026-12-15', 'Dec 15'],
      ['Bought Nov 27', 'Black Friday', '2026-11-27', '2026-12-27', 'Dec 27'],
      ['Bought Dec 10', 'Early December', '2026-12-10', '2027-01-09', 'Jan 9'],
      ['Bought Dec 24', 'Christmas Eve', '2026-12-24', '2027-01-23', 'Jan 23']],
    axis: AX, marker: ['2026-12-25', 'Dec 25'],
    ticks: [['2026-11-15', 'Nov 15'], ['2026-12-01', 'Dec 1'], ['2027-01-01', 'Jan 1'], ['2027-01-23', 'Jan 23']],
    src: 'ReFound calculation: purchase date + 30 days · jeancoutu.com policy checked November 26, 2026 · to scale' }
};
const K = {
  fr: { eyebrow: 'Trois pharmacies · politiques publiées', title: 'Même délai, règles différentes',
    cols: [['Jean Coutu', 'achats en magasin'], ['Proxim', 'pharmacies Proxim'], ['Rexall', 'pharmacies Rexall']],
    rows: [
      ['Délai', ['30 jours', '30 jours', '30 jours']],
      ['Où', ['n’importe quelle PJC', 'au magasin d’achat seulement', 'le Rexall le plus près']],
      ['Reçu', ['original, papier ou courriel', 'original, pas de photocopie', 'reçu de caisse original']],
      ['Remboursé', ['mode de paiement ou carte-cadeau', 'mode de paiement d’origine', 'même mode, sinon carte-cadeau']],
      ['Échange', ['oui, dans les 30 jours', 'seulement si défectueux', 'remplacement équivalent']],
    ],
    src: 'Sources : jeancoutu.com, groupeproxim.ca, rexall.ca (pages consultées en anglais) · vérifié le 26 novembre 2026' },
  en: { eyebrow: 'Three pharmacies · published policies', title: 'Same time limit, different rules',
    cols: [['Jean Coutu', 'in-store purchases'], ['Proxim', 'Proxim pharmacies'], ['Rexall', 'Rexall pharmacies']],
    rows: [
      ['Time limit', ['30 days', '30 days', '30 days']],
      ['Where', ['any PJC store', 'store of purchase only', 'your nearest Rexall']],
      ['Receipt', ['original, paper or email', 'original, no photocopies', 'original sales receipt']],
      ['Refund', ['payment method or gift card', 'original payment method', 'same method, else gift card']],
      ['Exchange', ['yes, within 30 days', 'only if defective', 'equivalent replacement']],
    ],
    src: 'Sources: jeancoutu.com, groupeproxim.ca, rexall.ca · checked November 26, 2026' }
};
// Couverture sans texte dépendant de la langue : reçu de pharmacie (croix verte), boîte-cadeau, dates 27·11 → 27·12.
function cover() {
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 80% 35%, rgba(30,184,133,.18), transparent 70%), var(--bg)}
  .left{position:absolute;left:72px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:30px;width:520px}
  .left img{height:34px;align-self:flex-start}
  .dates{display:flex;align-items:center;gap:18px}
  .d{background:var(--card);border:2px solid var(--line);border-radius:18px;padding:16px 22px;text-align:center}
  .d b{display:block;font-family:'Funnel Display';font-size:64px;line-height:1;font-weight:800}.d span{color:var(--muted);font-size:18px;font-weight:700;letter-spacing:.1em}
  .arrow{font-size:44px;color:var(--gold);font-weight:800}
  .chip{align-self:flex-start;border:2px solid var(--gold);background:var(--card);border-radius:999px;padding:8px 26px;font-weight:800;font-size:34px;color:var(--gold)}
  .box{position:absolute;right:330px;top:200px;width:220px;height:200px;background:var(--green);border-radius:14px;transform:rotate(-6deg);box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .box:before{content:'';position:absolute;left:50%;top:0;bottom:0;width:34px;margin-left:-17px;background:var(--gold)}
  .box:after{content:'';position:absolute;left:-12px;right:-12px;top:-44px;height:52px;background:#17A673;border-radius:10px}
  .bow{position:absolute;right:390px;top:120px;width:110px;height:70px;transform:rotate(-6deg)}
  .bow i{position:absolute;top:10px;width:56px;height:46px;border:12px solid var(--gold);border-radius:50%}
  .bow i:first-child{left:-4px;transform:rotate(-20deg)}.bow i:last-child{right:-4px;transform:rotate(20deg)}
  .r{position:absolute;right:70px;top:120px;width:290px;background:#F4F1E8;color:#2A2D33;border-radius:6px;padding:26px 24px 30px;transform:rotate(7deg);font-family:ui-monospace,Menlo,monospace;font-size:17px;box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .cross{width:64px;height:64px;margin:0 auto 18px;position:relative}.cross:before,.cross:after{content:'';position:absolute;background:var(--green);border-radius:4px}
  .cross:before{left:22px;top:0;width:20px;height:64px}.cross:after{top:22px;left:0;height:20px;width:64px}
  .r .l{display:grid;grid-template-columns:1fr auto;gap:10px;margin:9px 0}.r .l i{display:block;height:14px;background:#C9C4B8;border-radius:4px}
  .r .l.hl{background:rgba(246,184,40,.6);outline:3px solid #E0A315;border-radius:4px;padding:4px 6px}
  .r hr{border:0;border-top:2px dashed #B9B5AA;margin:16px 0}
  </style><div class="c"><div class="left"><img src="${LOGO}">
  <div class="dates"><div class="d"><b>27</b><span>11 · 2026</span></div><div class="arrow">→</div><div class="d" style="border-color:var(--gold)"><b style="color:var(--gold)">27</b><span>12 · 2026</span></div></div>
  <div class="chip h">30</div></div>
  <div class="bow"><i></i><i></i></div><div class="box"></div>
  <div class="r"><div class="cross"></div>
  <div class="l"><i style="width:150px"></i><i style="width:46px"></i></div>
  <div class="l hl"><i style="width:120px;background:#8F7A3C"></i><i style="width:46px;background:#8F7A3C"></i></div>
  <div class="l"><i style="width:170px"></i><i style="width:46px"></i></div>
  <hr><div class="l"><span>27/11/26</span><span>★</span></div><hr>
  <div style="height:48px;background:#C9C4B8;border-radius:4px"></div></div></div>`;
}
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const jobs = [['cover.png', cover(), 630]];
  for (const l of ['fr', 'en']) { jobs.push([`dates-limites-${l}.png`, deadlines(D[l]), 675]); jobs.push([`comparaison-pharmacies-${l}.png`, compare(K[l]), 675]); }
  const b = await chromium.launch();
  for (const [name, html, h] of jobs) {
    const p = await b.newPage({ viewport: { width: 1200, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
