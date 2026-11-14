// Usage: node render-combien-temps-recus.js <outDir>
// Gabarits : spans() = une ligne par article, à l'échelle en années : délai de retour (doré, mince) par-dessus
//                      la garantie (émeraude) ; durée inconnue en pointillé avec « ? ». Utile pour « combien de temps garder ».
//            dates() = jalons datés sur une ligne verticale (copie de milestones() de render-garantie-prolongee.js,
//                      compactée pour 6 jalons, avec l'article concerné).
//            cover() = couverture sans texte dépendant de la langue (reçu qui pâlit + ligne du temps en années).
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
.foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:16px;margin-top:auto}
.foot p{color:var(--muted);font-size:15px}.foot img{height:22px}
.eyebrow{color:var(--green);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:17px}`;
const LOGO = `data:image/png;base64,${b64('assets/logo-refound-light.png')}`;

function spans(lang) {
  const MAX = 6; // années
  const t = lang === 'fr' ? {
    eyebrow: 'Combien de temps garder le reçu', title: 'Le retour finit vite. La garantie, non.',
    lr: 'Délai de retour', lw: 'Garantie', lu: 'Durée non indiquée', yr: n => n === 1 ? '1 an' : `${n} ans`,
    rows: [['Haltère WA:KE', 'reçu Canadian Tire (démo)', 90, 1, '90 j'], ['Lampe de garage NOMA', 'reçu Canadian Tire (démo)', 90, 5, '90 j'],
      ['Casque de hockey CCM', 'reçu Canadian Tire (démo)', 90, null, '90 j'], ['Téléviseur', 'acheté neuf au Québec, chez Canadian Tire', 30, 4, '30 j']],
    unk: 'garantie spéciale : durée à demander',
    src: 'Sources : canadiantire.ca, OPC, compte de démonstration ReFound · vérifié le 14 novembre 2026 · axe en années'
  } : {
    eyebrow: 'How long to keep the receipt', title: 'Returns end fast. Warranties don’t.',
    lr: 'Return window', lw: 'Warranty', lu: 'No duration stated', yr: n => n === 1 ? '1 yr' : `${n} yrs`,
    rows: [['WA:KE dumbbell', 'Canadian Tire receipt (demo)', 90, 1, '90 d'], ['NOMA garage light', 'Canadian Tire receipt (demo)', 90, 5, '90 d'],
      ['CCM hockey helmet', 'Canadian Tire receipt (demo)', 90, null, '90 d'], ['Television', 'bought new in Quebec, at Canadian Tire', 30, 4, '30 d']],
    unk: 'special warranty: ask for the duration',
    src: 'Sources: canadiantire.ca, OPC, ReFound demo account · checked November 14, 2026 · axis in years'
  };
  const rows = t.rows.map(([n, d, ret, w, rl]) => {
    const rw = ret / 365 / MAX * 100;
    const war = w ? `<div class="war" style="width:${w / MAX * 100}%"><span class="v h">${t.yr(w)}</span></div>`
      : `<div class="war unk" style="width:100%"><span class="v h q">?</span><span class="uk">${t.unk}</span></div>`;
    return `<div class="row"><div class="lab"><div class="a">${n}</div><div class="d">${d}</div></div>
    <div class="track">${war}<div class="ret" style="width:${rw}%"></div><span class="rl" style="left:calc(${rw}% + 8px)">${rl}</span></div></div>`;
  }).join('');
  const ticks = [0, 1, 2, 3, 4, 5, 6].map(i => `<span style="left:${i / MAX * 100}%">${i}</span>`).join('');
  return `<style>${CSS}
  .wrap{width:1200px;height:675px;padding:48px 64px 36px;display:flex;flex-direction:column}
  h1{font-size:42px;line-height:1.1;margin-top:10px;font-weight:800}
  .leg{display:flex;gap:28px;margin-top:18px;font-size:16px}
  .leg i{display:inline-block;width:26px;height:14px;border-radius:4px;margin-right:8px;vertical-align:-1px}
  .rows{margin-top:40px;display:grid;gap:36px}
  .row{display:grid;grid-template-columns:330px 1fr;gap:24px;align-items:center}
  .a{font-weight:700;font-size:21px}.d{font-size:15px;color:var(--muted);margin-top:3px}
  .track{position:relative;height:46px;border-left:1px solid var(--line)}
  .war{position:absolute;left:0;top:10px;height:36px;border-radius:7px;background:var(--green);display:flex;align-items:center;justify-content:flex-end;padding-right:10px}
  .war.unk{background:transparent;border:2px dashed var(--green);justify-content:flex-start;padding-left:70px;gap:14px}
  .v{font-weight:800;font-size:18px;color:#0E1217;white-space:nowrap}.q{color:var(--green);font-size:24px}
  .uk{color:var(--muted);font-size:15px}
  .ret{position:absolute;left:0;top:0;height:14px;border-radius:4px;background:var(--gold)}
  .rl{position:absolute;top:-3px;font-size:13px;font-weight:700;color:var(--gold)}
  .axis{display:grid;grid-template-columns:330px 1fr;gap:24px;color:var(--muted);font-size:14px;margin-top:10px}
  .axis div:last-child{position:relative;height:18px}.axis span{position:absolute;transform:translateX(-50%)}
  .axis span:first-child{transform:none}.axis span:last-child{transform:translateX(-100%)}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="leg"><span><i style="background:var(--gold)"></i>${t.lr}</span><span><i style="background:var(--green)"></i>${t.lw}</span><span><i style="border:2px dashed var(--green)"></i>${t.lu}</span></div>
  <div class="rows">${rows}</div>
  <div class="axis"><div></div><div>${ticks}</div></div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

function dates(lang) {
  const t = lang === 'fr' ? {
    eyebrow: 'Achats du 27 novembre 2026', title: 'Jusqu’à quand garder chaque reçu?',
    items: [['27 déc. 2026', 'Téléviseur', 'Fin du retour (30 jours, électronique Canadian Tire)', 'var(--gold)'],
      ['25 févr. 2027', 'Lampe, haltère', 'Fin du retour (90 jours, Canadian Tire)', 'var(--gold)'],
      ['27 nov. 2027', 'Haltère WA:KE', 'Fin de la garantie d’échange de 1 an', 'var(--green)'],
      ['27 nov. 2030', 'Téléviseur', 'Fin de la garantie de bon fonctionnement (4 ans, Québec)', 'var(--green)'],
      ['27 nov. 2031', 'Lampe NOMA', 'Fin de la garantie d’échange de 5 ans', 'var(--green)'],
      ['27 nov. 2051', 'Cuisine IKEA SEKTION', 'Fin de la garantie de 25 ans (reçu original exigé)', 'var(--green)']],
    src: 'Exemple calculé, livraison le jour de l’achat · Sources : canadiantire.ca, OPC, IKEA, démo ReFound · vérifié le 14 novembre 2026'
  } : {
    eyebrow: 'Purchases made November 27, 2026', title: 'How long to keep each receipt',
    items: [['Dec 27, 2026', 'Television', 'Return window ends (30 days, Canadian Tire electronics)', 'var(--gold)'],
      ['Feb 25, 2027', 'Light, dumbbell', 'Return window ends (90 days, Canadian Tire)', 'var(--gold)'],
      ['Nov 27, 2027', 'WA:KE dumbbell', '1-year exchange warranty ends', 'var(--green)'],
      ['Nov 27, 2030', 'Television', 'Warranty of good working order ends (4 years, Quebec)', 'var(--green)'],
      ['Nov 27, 2031', 'NOMA light', '5-year exchange warranty ends', 'var(--green)'],
      ['Nov 27, 2051', 'IKEA SEKTION kitchen', '25-year warranty ends (original receipt required)', 'var(--green)']],
    src: 'Calculated example, same-day delivery · Sources: canadiantire.ca, OPC, IKEA, ReFound demo · checked November 14, 2026'
  };
  const items = t.items.map(([d, k, x, c]) => `<div class="it"><div class="dot" style="background:${c}"></div>
    <div class="date h" style="color:${c}">${d}</div><div class="k">${k}</div><div class="x">${x}</div></div>`).join('');
  return `<style>${CSS}
  .wrap{width:1200px;height:675px;padding:48px 64px 36px;display:flex;flex-direction:column}
  h1{font-size:42px;line-height:1.1;margin-top:10px;font-weight:800}
  .list{margin-top:44px;position:relative;display:grid;gap:30px}
  .list:before{content:'';position:absolute;left:9px;top:12px;bottom:12px;width:2px;background:var(--line)}
  .it{display:grid;grid-template-columns:20px 200px 250px 1fr;gap:20px;align-items:center;position:relative}
  .dot{width:20px;height:20px;border-radius:50%;border:4px solid var(--bg);box-shadow:0 0 0 2px var(--line);position:relative;z-index:1}
  .date{font-size:26px;font-weight:800;white-space:nowrap}.k{font-weight:700;font-size:19px}.x{color:var(--muted);font-size:17px;line-height:1.3}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="list">${items}</div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

function cover() {
  const lines = [1, .9, .75, .6, .45, .32, .22, .14].map((o, i) => `<div class="ln" style="opacity:${o};width:${[80, 60, 72, 50, 66, 58, 70, 44][i]}%"></div>`).join('');
  const ticks = Array.from({ length: 26 }, (_, i) => `<i style="left:${i / 25 * 100}%;height:${i % 5 === 0 ? 26 : 12}px"></i>`).join('');
  return `<style>${CSS}
  .wrap{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 75% 45%, rgba(30,184,133,.16), transparent 70%), var(--bg)}
  .logo{position:absolute;left:72px;top:64px;height:34px}
  .rc{position:absolute;left:110px;top:150px;width:250px;height:400px;background:linear-gradient(180deg,#F0F2F5 0%,#E6E8EC 55%,#C9CDD3 100%);border-radius:6px 6px 0 0;padding:34px 28px;transform:rotate(-5deg);box-shadow:0 24px 50px rgba(0,0,0,.45)}
  .rc:after{content:'';position:absolute;left:0;right:0;bottom:-14px;height:14px;background:linear-gradient(-45deg,transparent 10px,#C9CDD3 0) 0 0/20px 14px repeat-x}
  .ln{height:12px;border-radius:3px;background:#3B4350;margin-bottom:22px}
  .tl{position:absolute;left:440px;right:80px;top:330px;height:64px}
  .bar{position:absolute;left:0;top:18px;height:30px;border-radius:8px}
  .b1{width:1.5%;background:var(--gold);height:30px}
  .b2{width:20%;background:var(--green);top:60px;height:22px;opacity:.9}
  .b3{width:100%;border:3px dashed var(--green);top:98px;height:22px}
  .ax{position:absolute;left:0;right:0;top:-24px;height:2px;background:#3A414C}
  .ax i{position:absolute;top:-12px;width:2px;background:#3A414C;transform:translateX(-1px)}
  .hg{position:absolute;right:80px;top:170px;width:80px;height:100px}
  </style><div class="wrap"><img class="logo" src="${LOGO}">
  <div class="rc">${lines}</div>
  <div class="tl"><div class="ax">${ticks}</div><div class="bar b1"></div><div class="bar b2"></div><div class="bar b3"></div></div>
  <svg class="hg" viewBox="0 0 40 50"><path d="M6 3h28M6 47h28M9 3c0 12 11 15 11 22S9 35 9 47M31 3c0 12-11 15-11 22s11 10 11 22" stroke="#F6B828" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M14 44c2-5 10-5 12 0z" fill="#F6B828"/></svg>
  </div>`;
}

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const jobs = [['cover.png', cover(), 1200, 630], ['recu-durees-fr.png', spans('fr'), 1200, 675], ['recu-durees-en.png', spans('en'), 1200, 675],
    ['dates-fr.png', dates('fr'), 1200, 675], ['dates-en.png', dates('en'), 1200, 675]];
  for (const [name, html, w, h] of jobs) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
