// Usage: node render-garantie-prolongee.js <outDir>
// Gabarits : pairs() = deux barres par ligne à l'échelle (garantie gratuite vs plan payant, en années)
//            milestones() = échéances datées sur une ligne verticale (annulation, retour, fin de garantie)
//            cover() = couverture sans texte dépendant de la langue (deux barres qui se chevauchent)
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

function pairs(lang) {
  const MAX = 6;
  const t = lang === 'fr' ? {
    eyebrow: 'Garantie prolongée · Québec', title: 'Combien d’années un plan ajoute-t-il vraiment?',
    free: 'Gratuit (garantie de bon fonctionnement)', plan: 'Plan Best Buy, au maximum', y: 'ans', yr: n => `${n} ans`,
    rows: [['Téléviseur', 4, 4, 'Aucune année de plus'], ['Ordinateur, tablette', 3, 4, 'Jusqu’à 1 an de plus'],
      ['Laveuse, sécheuse, lave-vaisselle', 5, 5, 'Aucune année de plus'], ['Réfrigérateur, cuisinière', 6, 5, 'Plan plus court']],
    src: 'Sources : OPC, bestbuy.ca · vérifié le 13 novembre 2026 · pannes seulement, hors dommages accidentels'
  } : {
    eyebrow: 'Extended warranty · Quebec', title: 'How many years does a plan really add?',
    free: 'Free (warranty of good working order)', plan: 'Best Buy plan, at most', y: 'yrs', yr: n => `${n} yrs`,
    rows: [['Television', 4, 4, 'No extra years'], ['Computer, tablet', 3, 4, 'Up to 1 extra year'],
      ['Washer, dryer, dishwasher', 5, 5, 'No extra years'], ['Fridge, stove', 6, 5, 'Plan is shorter']],
    src: 'Sources: OPC, bestbuy.ca · checked November 13, 2026 · breakdowns only, not accidental damage'
  };
  const bar = (v, col, dark) => `<div class="tr"><div class="bar" style="width:${v / MAX * 100}%;background:${col}"><span class="v h" style="color:${dark}">${t.yr(v)}</span></div></div>`;
  const rows = t.rows.map(([n, f, p, d]) => `<div class="row"><div class="lab"><div class="a">${n}</div><div class="d" style="color:${p > f ? 'var(--gold)' : 'var(--muted)'}">${d}</div></div>
    <div class="bars">${bar(f, 'var(--green)', '#0E1217')}${bar(p, 'transparent;border:2px dashed var(--gold)', 'var(--gold)')}</div></div>`).join('');
  const ticks = [0, 1, 2, 3, 4, 5, 6].map(i => `<span style="left:${i / MAX * 100}%">${i}</span>`).join('');
  return `<style>${CSS}
  .wrap{width:1200px;height:675px;padding:48px 64px 36px;display:flex;flex-direction:column}
  h1{font-size:42px;line-height:1.1;margin-top:10px;font-weight:800}
  .leg{display:flex;gap:28px;margin-top:18px;font-size:16px;color:var(--fg)}
  .leg i{display:inline-block;width:26px;height:14px;border-radius:4px;margin-right:8px;vertical-align:-1px}
  .rows{margin-top:22px;display:grid;gap:16px}
  .row{display:grid;grid-template-columns:350px 1fr;gap:24px;align-items:center}
  .a{font-weight:700;font-size:21px}.d{font-size:16px;font-weight:700;margin-top:4px}
  .bars{display:grid;gap:6px;border-left:1px solid var(--line);padding-left:0}
  .tr{height:30px;position:relative}
  .bar{height:100%;border-radius:7px;position:relative;display:flex;align-items:center;justify-content:flex-end;padding-right:10px}
  .v{font-weight:800;font-size:17px;white-space:nowrap}
  .axis{display:grid;grid-template-columns:350px 1fr;gap:24px;color:var(--muted);font-size:14px;margin-top:8px}
  .axis div:last-child{position:relative;height:18px}.axis span{position:absolute;transform:translateX(-50%)}
  .axis span:first-child{transform:none}.axis span:last-child{transform:translateX(-100%)}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="leg"><span><i style="background:var(--green)"></i>${t.free}</span><span><i style="border:2px dashed var(--gold)"></i>${t.plan}</span></div>
  <div class="rows">${rows}</div>
  <div class="axis"><div></div><div>${ticks}</div></div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

function milestones(lang) {
  const t = lang === 'fr' ? {
    eyebrow: 'Vendredi fou · 27 novembre 2026', title: 'Téléviseur + garantie prolongée : vos dates',
    items: [['7 déc. 2026', '10 jours (loi)', 'Annuler la garantie sans frais, par avis écrit', 'var(--gold)'],
      ['27 déc. 2026', '30 jours (Best Buy)', 'Ajouter ou retourner le plan en magasin', '#5FD3AE'],
      ['Nov. 2027', 'Un an (loi)', 'Si le commerçant n’a pas respecté ses obligations d’information', 'var(--gold)'],
      ['27 nov. 2030', '4 ans (loi)', 'Fin de la garantie de bon fonctionnement du téléviseur', 'var(--green)']],
    note: 'Les délais de 10 jours et d’un an ne s’appliquent pas si le contrat est émis par un assureur autorisé.',
    src: 'Exemple calculé, livraison le jour de l’achat · Sources : LPC, OPC, bestbuy.ca · vérifié le 13 novembre 2026'
  } : {
    eyebrow: 'Black Friday · November 27, 2026', title: 'TV + extended warranty: your dates',
    items: [['Dec 7, 2026', '10 days (law)', 'Cancel the warranty at no cost, by written notice', 'var(--gold)'],
      ['Dec 27, 2026', '30 days (Best Buy)', 'Add or return the plan in store', '#5FD3AE'],
      ['Nov 2027', 'One year (law)', 'If the merchant didn’t meet its disclosure obligations', 'var(--gold)'],
      ['Nov 27, 2030', '4 years (law)', 'End of the TV’s warranty of good working order', 'var(--green)']],
    note: 'The 10-day and one-year periods don’t apply if the contract is issued by an authorized insurer.',
    src: 'Calculated example, same-day delivery · Sources: CPA, OPC, bestbuy.ca · checked November 13, 2026'
  };
  const items = t.items.map(([d, k, x, c]) => `<div class="it"><div class="dot" style="background:${c}"></div>
    <div class="date h" style="color:${c}">${d}</div><div class="k">${k}</div><div class="x">${x}</div></div>`).join('');
  return `<style>${CSS}
  .wrap{width:1200px;height:675px;padding:48px 64px 36px;display:flex;flex-direction:column}
  h1{font-size:42px;line-height:1.1;margin-top:10px;font-weight:800}
  .list{margin-top:44px;position:relative;display:grid;gap:34px}
  .list:before{content:'';position:absolute;left:9px;top:12px;bottom:12px;width:2px;background:var(--line)}
  .it{display:grid;grid-template-columns:20px 220px 220px 1fr;gap:20px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px 20px 16px 0;margin-left:0;position:relative}
  .it{background:transparent;border:0;padding:0}
  .dot{width:20px;height:20px;border-radius:50%;border:4px solid var(--bg);box-shadow:0 0 0 2px var(--line);position:relative;z-index:1}
  .date{font-size:30px;font-weight:800;white-space:nowrap}.k{font-weight:700;font-size:20px}.x{color:var(--muted);font-size:19px;line-height:1.35}
  .note{margin-top:40px;border:1px dashed #3A414C;border-radius:12px;padding:14px 18px;font-size:17px;line-height:1.4}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="list">${items}</div><div class="note">⚠ ${t.note}</div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

function cover() {
  return `<style>${CSS}
  .wrap{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 80% 40%, rgba(30,184,133,.16), transparent 70%), var(--bg)}
  .logo{position:absolute;left:72px;top:64px;height:34px}
  .panel{position:absolute;left:72px;right:72px;top:150px;bottom:70px;display:flex;flex-direction:column;justify-content:center;background:var(--card);border:1px solid var(--line);border-radius:22px;padding:56px 56px 40px}
  .b{height:78px;border-radius:14px;position:relative;margin-bottom:30px}
  .b1{width:66.6%;background:var(--green)}
  .b2{width:66.6%;border:4px dashed var(--gold);background:rgba(246,184,40,.08)}
  .eq{position:absolute;right:-118px;top:50%;transform:translateY(-50%);font-family:'Funnel Display';font-weight:800;font-size:64px;color:var(--gold)}
  .shield{position:absolute;left:24px;top:50%;transform:translateY(-50%);width:44px;height:52px}
  .axis{display:flex;justify-content:space-between;color:var(--muted);font-family:'Funnel Display';font-weight:700;font-size:24px;margin-top:6px;width:100%}
  .mark{position:absolute;left:calc(56px + (100% - 112px) * .666);top:60px;bottom:60px;border-left:3px dashed var(--muted);opacity:.5}
  .tag{position:absolute;right:60px;top:66px;width:150px;height:150px;border-radius:50%;background:var(--gold);color:#0E1217;display:flex;align-items:center;justify-content:center;font-family:'Funnel Display';font-weight:800;font-size:70px;transform:rotate(-10deg);box-shadow:0 18px 40px rgba(0,0,0,.4)}
  </style><div class="wrap"><img class="logo" src="${LOGO}">
  <div class="panel">
    <div class="b b1"><svg class="shield" viewBox="0 0 24 28"><path d="M12 1 2 5v8c0 7 4.5 11.5 10 14 5.5-2.5 10-7 10-14V5z" fill="#0E1217"/><path d="m7 14 4 4 7-8" stroke="#1EB885" stroke-width="2.6" fill="none" stroke-linecap="round"/></svg></div>
    <div class="b b2"></div><div class="mark"></div>
    <div class="axis"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span></div>
  </div>
  <div class="tag">$?</div>
  </div>`;
}

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const jobs = [['cover.png', cover(), 1200, 630], ['comparaison-fr.png', pairs('fr'), 1200, 675], ['comparaison-en.png', pairs('en'), 1200, 675],
    ['calendrier-fr.png', milestones('fr'), 1200, 675], ['calendrier-en.png', milestones('en'), 1200, 675]];
  for (const [name, html, w, h] of jobs) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
