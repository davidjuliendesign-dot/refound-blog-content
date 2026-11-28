// Usage: node render-achat-en-ligne.js <outDir> [prefix]
// Gabarits : dates() = jalons datés d'une commande en ligne (ligne verticale, exemple calculé),
//            three() = trois colonnes « annuler / retourner / garantie » (recours différents d'un même achat),
//            cover() = couverture sans texte dépendant de la langue (colis + pastilles de délais).
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
.eyebrow{color:var(--green);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:18px}
.foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:16px;margin-top:auto}
.foot p{color:var(--muted);font-size:15px}.foot img{height:22px}`;
const LOGO = `data:image/png;base64,${b64('assets/logo-refound-light.png')}`;

function dates(lang) {
  const t = lang === 'fr' ? {
    eyebrow: 'Commande en ligne du Cyber lundi · Québec', title: 'Commande du 30 novembre 2026 : vos dates',
    items: [['30 nov. 2026', 'Achat', 'Gardez le courriel de confirmation : c’est souvent votre copie du contrat', 'var(--muted)'],
      ['15 déc. 2026', '15 jours', 'Le commerçant doit vous avoir envoyé la copie du contrat. Sinon : annulation possible jusqu’au 30 déc.', 'var(--gold)'],
      ['30 déc. 2026', '30 jours', 'Rien de livré et aucune date de livraison convenue? Vous pouvez annuler tant que vous n’avez rien reçu', 'var(--gold)'],
      ['19 janv. 2027', 'Avis + 15 jours', 'Si vous annulez le 4 janvier : le commerçant doit vous rembourser au plus tard à cette date', '#5FD3AE'],
      ['20 mars 2027', '+ 60 jours', 'Pas remboursé? Dernier jour pour demander la rétrofacturation à l’émetteur de la carte de crédit', 'var(--green)']],
    src: 'Exemple calculé · Sources : Office de la protection du consommateur, Éducaloi · vérifié le 28 novembre 2026'
  } : {
    eyebrow: 'Cyber Monday online order · Quebec', title: 'Order placed November 30, 2026: your dates',
    items: [['Nov 30, 2026', 'Purchase', 'Keep the confirmation email: it is often your copy of the contract', 'var(--muted)'],
      ['Dec 15, 2026', '15 days', 'The merchant must have sent you a copy of the contract. If not, you can cancel until Dec 30', 'var(--gold)'],
      ['Dec 30, 2026', '30 days', 'Nothing delivered and no delivery date agreed? You can cancel as long as you haven’t received it', 'var(--gold)'],
      ['Jan 19, 2027', 'Notice + 15 days', 'If you cancel on January 4, the merchant must refund you by this date', '#5FD3AE'],
      ['Mar 20, 2027', '+ 60 days', 'Not refunded? Last day to ask your credit card issuer for a chargeback', 'var(--green)']],
    src: 'Calculated example · Sources: Office de la protection du consommateur, Éducaloi · checked November 28, 2026'
  };
  const items = t.items.map(([d, k, x, c]) => `<div class="it"><div class="dot" style="background:${c}"></div>
    <div class="date h" style="color:${c}">${d}</div><div class="k">${k}</div><div class="x">${x}</div></div>`).join('');
  return `<style>${CSS}
  .wrap{width:1200px;height:675px;padding:44px 64px 34px;display:flex;flex-direction:column}
  h1{font-size:40px;line-height:1.1;margin-top:10px;font-weight:800}
  .list{margin-top:34px;position:relative;display:grid;gap:22px}
  .list:before{content:'';position:absolute;left:9px;top:14px;bottom:14px;width:2px;background:var(--line)}
  .it{display:grid;grid-template-columns:20px 220px 170px 1fr;gap:20px;align-items:center;position:relative}
  .dot{width:20px;height:20px;border-radius:50%;border:4px solid var(--bg);box-shadow:0 0 0 2px var(--line);position:relative;z-index:1}
  .date{font-size:28px;font-weight:800;white-space:nowrap}.k{font-weight:700;font-size:19px}.x{color:var(--muted);font-size:18px;line-height:1.35}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="list">${items}</div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

function three(lang) {
  const t = lang === 'fr' ? {
    eyebrow: 'Achat en ligne · trois recours différents', title: 'Annuler, retourner ou faire jouer la garantie?',
    cols: [['La loi', 'Annuler', 'var(--gold)', [['Quand', 'Livraison manquée, contrat non reçu, renseignements manquants'], ['Délais', '7 ou 30 jours selon le cas'], ['Résultat', 'Remboursement en 15 jours ; retour aux frais du commerçant']]],
      ['Le magasin', 'Retourner', '#5FD3AE', [['Quand', 'Vous changez d’idée'], ['Délais', 'Ceux de sa politique, s’il en a une'], ['Résultat', 'Selon la politique ; ex. livraison non remboursée chez Canadian Tire']]],
      ['La loi + le fabricant', 'Garantie', 'var(--green)', [['Quand', 'Le bien est défectueux'], ['Délais', 'Durée raisonnable ; 3 à 6 ans depuis la livraison pour 14 biens'], ['Résultat', 'Réparation, échange ou remboursement']]]],
    src: 'Québec · Sources : OPC, Éducaloi, canadiantire.ca · vérifié le 28 novembre 2026'
  } : {
    eyebrow: 'Online purchase · three different remedies', title: 'Cancel, return, or use the warranty?',
    cols: [['The law', 'Cancel', 'var(--gold)', [['When', 'Missed delivery, no contract copy, missing information'], ['Time limit', '7 or 30 days depending on the case'], ['Result', 'Refund within 15 days; merchant pays return costs']]],
      ['The store', 'Return', '#5FD3AE', [['When', 'You changed your mind'], ['Time limit', 'Whatever its policy says, if it has one'], ['Result', 'Per the policy; e.g. Canadian Tire keeps the shipping fee']]],
      ['The law + manufacturer', 'Warranty', 'var(--green)', [['When', 'The item is defective'], ['Time limit', 'Reasonable period; 3 to 6 years from delivery for 14 goods'], ['Result', 'Repair, exchange or refund']]]],
    src: 'Quebec · Sources: OPC, Éducaloi, canadiantire.ca · checked November 28, 2026'
  };
  const cols = t.cols.map(([who, what, c, rows]) => `<div class="col" style="border-top:6px solid ${c}">
    <div class="who">${who}</div><div class="what h" style="color:${c}">${what}</div>
    ${rows.map(([k, v]) => `<div class="kv"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('')}</div>`).join('');
  return `<style>${CSS}
  .wrap{width:1200px;height:675px;padding:44px 64px 34px;display:flex;flex-direction:column}
  h1{font-size:40px;line-height:1.1;margin-top:10px;font-weight:800}
  .cols{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:30px}
  .col{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:20px 22px 18px}
  .who{color:var(--muted);font-weight:700;font-size:15px;letter-spacing:.08em;text-transform:uppercase}
  .what{font-size:32px;font-weight:800;margin:4px 0 10px}
  .kv{border-top:1px solid var(--line);padding:10px 0}.k{color:var(--muted);font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:.06em}
  .v{font-size:18px;line-height:1.35;margin-top:3px}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="cols">${cols}</div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

function cover() {
  return `<style>${CSS}
  .wrap{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 75% 45%, rgba(30,184,133,.17), transparent 70%), var(--bg)}
  .logo{position:absolute;left:72px;top:64px;height:34px}
  .box{position:absolute;left:150px;top:190px;width:400px;height:300px}
  .chips{position:absolute;right:90px;top:120px;display:grid;gap:26px}
  .chip{display:flex;align-items:center;gap:22px}
  .n{width:128px;height:128px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Funnel Display';font-weight:800;font-size:58px;color:#0E1217;box-shadow:0 14px 30px rgba(0,0,0,.35)}
  .bar{height:14px;border-radius:7px;background:var(--line)}
  .card{position:absolute;left:470px;top:330px;width:250px;height:156px;border-radius:16px;background:linear-gradient(135deg,#2B323C,#1D222A);border:1px solid #3A414C;transform:rotate(-8deg);box-shadow:0 20px 40px rgba(0,0,0,.45)}
  .card .chipc{position:absolute;left:24px;top:46px;width:44px;height:34px;border-radius:6px;background:var(--gold)}
  .card .num{position:absolute;left:24px;bottom:28px;display:flex;gap:10px}.card .num i{width:36px;height:8px;border-radius:4px;background:#4A525E;display:block}
  .card .num i:last-child{background:var(--green)}
  </style><div class="wrap"><img class="logo" src="${LOGO}">
  <svg class="box" viewBox="0 0 400 300">
    <path d="M200 20 380 80 200 140 20 80Z" fill="#2B323C" stroke="#3A414C" stroke-width="3"/>
    <path d="M20 80 200 140 200 290 20 230Z" fill="#1D222A" stroke="#3A414C" stroke-width="3"/>
    <path d="M380 80 200 140 200 290 380 230Z" fill="#232932" stroke="#3A414C" stroke-width="3"/>
    <path d="M110 50 290 110 290 160 260 150 260 120 80 60Z" fill="#1EB885" opacity=".9"/>
    <rect x="60" y="150" width="96" height="56" rx="6" transform="skewY(18)" fill="#F4F1E8"/>
    <g transform="skewY(18)"><rect x="70" y="160" width="60" height="6" rx="3" fill="#B9B5AA"/><rect x="70" y="174" width="44" height="6" rx="3" fill="#B9B5AA"/><rect x="70" y="188" width="70" height="8" rx="2" fill="#2A2D33"/></g>
  </svg>
  <div class="card"><div class="chipc"></div><div class="num"><i></i><i></i><i></i><i></i></div></div>
  <div class="chips">
    <div class="chip"><div class="n" style="background:var(--gold)">7</div><div class="bar" style="width:60px"></div></div>
    <div class="chip"><div class="n" style="background:#5FD3AE">15</div><div class="bar" style="width:120px;background:#5FD3AE;opacity:.5"></div></div>
    <div class="chip"><div class="n" style="background:var(--green)">30</div><div class="bar" style="width:200px;background:var(--green);opacity:.5"></div></div>
  </div>
  </div>`;
}

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const only = process.argv[3];
  let jobs = [['cover.png', cover(), 1200, 630], ['dates-commande-fr.png', dates('fr'), 1200, 675], ['dates-commande-en.png', dates('en'), 1200, 675],
    ['trois-recours-fr.png', three('fr'), 1200, 675], ['trois-recours-en.png', three('en'), 1200, 675]];
  if (only) jobs = jobs.filter(j => j[0].startsWith(only));
  for (const [name, html, w, h] of jobs) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
