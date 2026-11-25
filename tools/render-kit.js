// Visuels tirés de kit/receipts.json (vrais reçus nettoyés). Usage: node render-kit.js <slug-article> <outDir>
// Gabarit réutilisable : flow() — « ligne imprimée → produit identifié (avec sa photo) → garantie ou date limite ».
//  - Les lignes et produits viennent tels quels de kit/receipts.json (index d'articles choisis dans JOBS).
//  - Photo produit : champ `imageFile` (nom exact du fichier dans kit/images/) ; sans imageFile, pas de photo.
//    Les URL distantes ne sont jamais chargées (l'hôte des images n'est pas joignable depuis la routine).
//  - Règles de kit/README.md : jamais de code-barres, numéro de transaction, chiffres de carte, adresse de rue.
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const S = __dirname; const ROOT = path.join(S, '..');
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
.wrap{width:1200px;height:675px;padding:44px 60px 34px;display:flex;flex-direction:column}
.eyebrow{color:var(--green);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:16px}
h1{font-size:36px;line-height:1.12;margin-top:8px;font-weight:800}
.foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:12px;margin-top:auto}
.foot p{color:var(--muted);font-size:13px;max-width:930px}.foot img{height:20px}`;
const LOGO = `data:image/png;base64,${b64('assets/logo-refound-light.png')}`;
const KIT = JSON.parse(fs.readFileSync(path.join(ROOT, 'kit/receipts.json'), 'utf8')).receipts;
const esc = s => String(s).replace(/\\u0026/g, '&').replace(/&#039;/g, '’').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/ /g, ' ');

function photo(it) {
  if (!it.imageFile) return null; // nom exact du fichier dans kit/images/
  const f = path.join(ROOT, 'kit/images', it.imageFile);
  if (!fs.existsSync(f)) return null;
  const ext = path.extname(f).slice(1).replace('jpg', 'jpeg');
  return `data:image/${ext};base64,${fs.readFileSync(f).toString('base64')}`;
}

// t: {eyebrow, title, head:[left, right], rows:[{printed, name, badge, sub, color}], src}
function flow(t) {
  const withPhotos = t.rows.some(r => r.photo);
  const cols = withPhotos ? '340px 28px 64px 1fr 28px 240px' : '330px 34px 1fr 34px 260px';
  const rows = t.rows.map(r => `<div class="row" style="grid-template-columns:${cols}">
    <div class="pr">${esc(r.printed)}</div><div class="ar">→</div>
    ${withPhotos ? `<div class="ph">${r.photo ? `<img src="${r.photo}">` : ''}</div>` : ''}
    <div class="nm">${esc(r.name)}</div><div class="ar">→</div>
    <div class="bd" style="border-color:${r.color};color:${r.color}"><b class="h">${esc(r.badge)}</b><span>${esc(r.sub)}</span></div></div>`).join('');
  return `<style>${CSS}
  .head{display:flex;justify-content:space-between;margin-top:16px;color:var(--muted);font-size:15px}
  .head b{color:var(--fg)}.head .g b{color:var(--gold)}
  .rows{margin-top:12px;display:grid;gap:8px}
  .row{display:grid;gap:12px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:8px 16px;min-height:58px}
  .pr{font-family:ui-monospace,Menlo,monospace;font-weight:700;font-size:15px;background:#F4F1E8;color:#2A2D33;border-radius:6px;padding:8px 10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .ar{color:var(--green);font-size:24px;text-align:center}
  .ph{width:64px;height:48px;background:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;overflow:hidden}.ph img{max-width:100%;max-height:100%}.ph:empty{background:transparent;border:1px dashed var(--line)}
  .nm{font-weight:700;font-size:17px;line-height:1.25}
  .bd{border:2px solid;border-radius:10px;padding:6px 12px;display:flex;flex-direction:column;line-height:1.2}
  .bd b{font-size:19px;font-weight:800}.bd span{font-size:13px;color:var(--muted)}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="head"><span>${t.head[0]}</span><span>${t.head[1]}</span></div>
  <div class="rows">${rows}</div>
  <div class="foot"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

const item = (slug, i) => { const r = KIT.find(x => x.slug === slug); return r.items[i]; };
const row = (slug, i, badge, sub, color) => { const it = item(slug, i); return { printed: it.printed, name: it.name, badge, sub, color, photo: photo(it) }; };

const nf = (r, name) => Object.assign(r, { name }); // ligne non enrichie : on l'affiche comme telle
const JOBS = {
  'politique-retour-joe-fresh': {
    file: 'recu-reel', slug: 'maxi',
    fr: () => ({ eyebrow: 'Un reçu réel Maxi & Cie · acheté le 2 octobre 2026 · 44 lignes', title: 'Deux vêtements perdus dans une facture d’épicerie',
      head: ['<b>Ligne imprimée</b> → <b>ce que ReFound en a tiré</b> → <b>à retenir</b>', 'Retour estimé : <span class="g"><b>1er novembre 2026</b></span>'],
      rows: [nf(row('maxi', 39, '29,00 $', 'ni marque, ni taille, ni couleur', 'var(--gold)'), 'Non identifié : la ligne reste telle quelle'),
        nf(row('maxi', 40, '16,94 $', 'ni marque, ni taille, ni couleur', 'var(--gold)'), 'Non identifié : la ligne reste telle quelle'),
        row('maxi', 28, 'Épicerie', 'identifié, avec sa photo', 'var(--muted)'),
        Object.assign(row('maxi', 0, 'Retour', 'jusqu’au 1er novembre 2026', 'var(--green)'), { printed: 'Tout le reçu', name: '30 jours après l’achat, estimation de l’app', photo: null })],
      src: 'Données : reçu réel Maxi & Cie (Gatineau) numérisé avec ReFound · l’app estime la date limite selon la politique générale du marchand ; elle ne tient pas compte de la prolongation des Fêtes de Joe Fresh' }),
    en: () => ({ eyebrow: 'A real Maxi & Cie receipt · bought October 2, 2026 · 44 lines', title: 'Two pieces of clothing lost in a grocery receipt',
      head: ['<b>Printed line</b> → <b>what ReFound got from it</b> → <b>what to note</b>', 'Estimated return deadline: <span class="g"><b>November 1, 2026</b></span>'],
      rows: [nf(row('maxi', 39, '$29.00', 'no brand, size or colour', 'var(--gold)'), 'Not identified: the line stays as printed'),
        nf(row('maxi', 40, '$16.94', 'no brand, size or colour', 'var(--gold)'), 'Not identified: the line stays as printed'),
        row('maxi', 28, 'Grocery', 'identified, with its photo', 'var(--muted)'),
        Object.assign(row('maxi', 0, 'Return', 'until November 1, 2026', 'var(--green)'), { printed: 'Whole receipt', name: '30 days after purchase, the app’s estimate', photo: null })],
      src: 'Data: real Maxi & Cie receipt (Gatineau) scanned with ReFound · the app estimates the deadline from the merchant’s general policy; it does not include Joe Fresh’s holiday extension' }) },
  'politique-retour-bmr': {
    file: 'recu-reel', slug: 'bmr',
    fr: () => ({ eyebrow: 'Un reçu réel BMR · acheté le 18 avril 2026', title: 'Le reçu dit « BALAI FEUILLES ». L’app a trouvé une garantie d’un an.',
      head: ['<b>Ligne imprimée</b> → <b>produit identifié par ReFound</b> → <b>garantie</b>', 'Retour estimé : <span class="g"><b>18 mai 2026</b></span>'],
      rows: [row('bmr', 0, '1 an', 'fabricant · fin 18 avril 2027', 'var(--green)'), row('bmr', 4, 'Aucune', 'garantie indiquée', 'var(--muted)'),
        nf(row('bmr', 2, 'Aucune', 'garantie indiquée', 'var(--muted)'), 'Non identifié : la ligne reste telle quelle'), row('bmr', 0, 'Retour', 'jusqu’au 18 mai 2026', 'var(--gold)')].map((r, i) => i === 3 ? Object.assign(r, { printed: 'Tout le reçu', name: '30 jours après l’achat, estimation de l’app', photo: null }) : r),
      src: 'Données : reçu réel BMR (Laval) numérisé avec ReFound · garantie quand l’information est disponible, conditions du fabricant · la date limite réelle dépend du magasin BMR' }),
    en: () => ({ eyebrow: 'A real BMR receipt · bought April 18, 2026', title: 'The receipt says “BALAI FEUILLES”. The app found a 1-year warranty.',
      head: ['<b>Printed line</b> → <b>product identified by ReFound</b> → <b>warranty</b>', 'Estimated return deadline: <span class="g"><b>May 18, 2026</b></span>'],
      rows: [row('bmr', 0, '1 year', 'manufacturer · ends Apr. 18, 2027', 'var(--green)'), row('bmr', 4, 'None', 'no warranty listed', 'var(--muted)'),
        nf(row('bmr', 2, 'None', 'no warranty listed', 'var(--muted)'), 'Not identified: the line stays as printed'), row('bmr', 0, 'Return', 'until May 18, 2026', 'var(--gold)')].map((r, i) => i === 3 ? Object.assign(r, { printed: 'Whole receipt', name: '30 days after purchase, the app’s estimate', photo: null }) : r),
      src: 'Data: real BMR receipt (Laval) scanned with ReFound · warranty when the information is available, manufacturer terms apply · the actual deadline depends on the BMR store' }) },
  'politique-retour-rona': {
    file: 'recu-reel', slug: 'rona-plus',
    fr: () => ({ eyebrow: 'Un reçu réel RONA+ · acheté le 19 avril 2026', title: 'Retour : 90 jours. Garantie : jusqu’à « à vie ».',
      head: ['<b>Ligne imprimée</b> → <b>produit identifié par ReFound</b> → <b>garantie affichée</b>', 'Retour estimé : <span class="g"><b>18 juillet 2026</b></span>'],
      rows: [row('rona-plus', 7, 'À vie', 'garantie du fabricant', 'var(--green)'), row('rona-plus', 3, '15 ans', 'limitée · fin 19 avril 2041', 'var(--green)'),
        row('rona-plus', 9, '5 ans', 'fabricant · fin 19 avril 2031', '#5FD3AE'), row('rona-plus', 5, '1 an', 'limitée · fin 19 avril 2027', '#7FA8FF'), row('rona-plus', 0, 'Aucune', 'garantie indiquée', 'var(--muted)')],
      src: 'Données : reçu réel RONA+ numérisé avec ReFound (garanties quand l’information est disponible ; conditions du fabricant) · dates de fin calculées à partir de l’achat' }),
    en: () => ({ eyebrow: 'A real RONA+ receipt · bought April 19, 2026', title: 'Return: 90 days. Warranty: up to “lifetime”.',
      head: ['<b>Printed line</b> → <b>product identified by ReFound</b> → <b>warranty shown</b>', 'Estimated return deadline: <span class="g"><b>July 18, 2026</b></span>'],
      rows: [row('rona-plus', 7, 'Lifetime', 'manufacturer warranty', 'var(--green)'), row('rona-plus', 3, '15 years', 'limited · ends Apr. 19, 2041', 'var(--green)'),
        row('rona-plus', 9, '5 years', 'manufacturer · ends Apr. 19, 2031', '#5FD3AE'), row('rona-plus', 5, '1 year', 'limited · ends Apr. 19, 2027', '#7FA8FF'), row('rona-plus', 0, 'None', 'no warranty listed', 'var(--muted)')],
      src: 'Data: real RONA+ receipt scanned with ReFound (warranties when the information is available; manufacturer terms apply) · end dates calculated from the purchase' }) },
  'politique-retour-dollarama': {
    file: 'recu-reel', slug: 'dollarama',
    fr: () => ({ eyebrow: 'Un reçu réel Dollarama · acheté le 18 août 2026', title: 'Le reçu dit « JEU A PECHE ». Il ne dit rien d’autre.',
      head: ['<b>Ligne imprimée</b> → <b>produit identifié par ReFound</b> → <b>garantie</b>', 'Défaut à signaler avant le : <span class="g"><b>17 septembre 2026</b></span>'],
      rows: [row('dollarama', 12, 'Aucune', 'garantie indiquée', 'var(--muted)'), row('dollarama', 5, 'Aucune', 'garantie indiquée', 'var(--muted)'),
        row('dollarama', 8, 'Aucune', 'garantie indiquée', 'var(--muted)'), row('dollarama', 13, 'Aucune', 'garantie indiquée', 'var(--muted)'), row('dollarama', 6, 'Aucune', 'garantie indiquée', 'var(--muted)')],
      src: 'Données : reçu réel Dollarama numérisé avec ReFound · 17 septembre = 30 jours après l’achat, délai de Dollarama pour signaler un produit défectueux ou endommagé (dollarama.com, vérifié le 19 novembre 2026)' }),
    en: () => ({ eyebrow: 'A real Dollarama receipt · bought August 18, 2026', title: 'The receipt says “JEU A PECHE”. Nothing more.',
      head: ['<b>Printed line</b> → <b>product identified by ReFound</b> → <b>warranty</b>', 'Report a defect by: <span class="g"><b>September 17, 2026</b></span>'],
      rows: [row('dollarama', 12, 'None', 'no warranty listed', 'var(--muted)'), row('dollarama', 5, 'None', 'no warranty listed', 'var(--muted)'),
        row('dollarama', 8, 'None', 'no warranty listed', 'var(--muted)'), row('dollarama', 13, 'None', 'no warranty listed', 'var(--muted)'), row('dollarama', 6, 'None', 'no warranty listed', 'var(--muted)')],
      src: 'Data: real Dollarama receipt scanned with ReFound · September 17 = 30 days after purchase, Dollarama’s window to report a defective or damaged product (dollarama.com, checked November 19, 2026)' }) },
  'politique-retour-reitmans': {
    file: 'recu-reel', slug: 'reitmans',
    fr: () => ({ eyebrow: 'Un reçu réel Reitmans · acheté le 16 septembre 2026 · 4 vêtements', title: 'Deux lignes « T-Shirts ». Une seule peut être rapportée.',
      head: ['<b>Ligne imprimée</b> → <b>produit identifié par ReFound</b> → <b>retour</b>', 'Retour estimé : <span class="g"><b>16 octobre 2026</b></span>'],
      rows: [row('reitmans', 0, 'Vente finale', '14,97 $ : prix en ,97', 'var(--gold)'), row('reitmans', 1, '30 jours', '14,99 $ · retournable', 'var(--green)'),
        row('reitmans', 2, '30 jours', '14,99 $ · retournable', 'var(--green)'), row('reitmans', 3, '30 jours', '34,99 $ · retournable', 'var(--green)')],
      src: 'Données : reçu réel Reitmans (Gatineau) numérisé avec ReFound · vente finale selon la politique Reitmans (achat en magasin, prix se terminant par ,97 $), vérifiée le 23 novembre 2026 · l’app estime 30 jours et ne connaît pas cette règle' }),
    en: () => ({ eyebrow: 'A real Reitmans receipt · bought September 16, 2026 · 4 items', title: 'Two “T-Shirts” lines. Only one can go back.',
      head: ['<b>Printed line</b> → <b>product identified by ReFound</b> → <b>return</b>', 'Estimated return deadline: <span class="g"><b>October 16, 2026</b></span>'],
      rows: [row('reitmans', 0, 'Final sale', '$14.97: price ends in .97', 'var(--gold)'), row('reitmans', 1, '30 days', '$14.99 · returnable', 'var(--green)'),
        row('reitmans', 2, '30 days', '$14.99 · returnable', 'var(--green)'), row('reitmans', 3, '30 days', '$34.99 · returnable', 'var(--green)')],
      src: 'Data: real Reitmans receipt (Gatineau) scanned with ReFound; product names as listed in French by the merchant · final sale under Reitmans’ policy (in-store purchase, price ending in $.97), checked November 23, 2026 · the app estimates 30 days and does not know this rule' }) },
  'politique-retour-walmart': {
    file: 'recu-reel', slug: 'walmart',
    fr: () => ({ eyebrow: 'Un reçu réel Walmart · acheté le 26 mai 2026', title: 'Le retour finit en août. La garantie, l’an prochain.',
      head: ['<b>Ligne imprimée</b> → <b>produit identifié par ReFound</b> → <b>garantie affichée</b>', 'Retour estimé : <span class="g"><b>24 août 2026</b></span>'],
      rows: [row('walmart', 1, '1 an', 'fabricant · fin 26 mai 2027', 'var(--green)'), row('walmart', 2, '1 an', 'fabricant · fin 26 mai 2027', 'var(--green)'),
        row('walmart', 4, '1 an', 'fabricant · fin 26 mai 2027', 'var(--green)'), row('walmart', 6, 'Retour', 'jusqu’au 24 août 2026', 'var(--gold)')],
      src: 'Données : reçu réel Walmart numérisé avec ReFound (garanties quand l’information est disponible ; conditions du fabricant) · date limite selon la politique générale de 90 jours' }),
    en: () => ({ eyebrow: 'A real Walmart receipt · bought May 26, 2026', title: 'The return ends in August. The warranty, next year.',
      head: ['<b>Printed line</b> → <b>product identified by ReFound</b> → <b>warranty shown</b>', 'Estimated return deadline: <span class="g"><b>August 24, 2026</b></span>'],
      rows: [row('walmart', 1, '1 year', 'manufacturer · ends May 26, 2027', 'var(--green)'), row('walmart', 2, '1 year', 'manufacturer · ends May 26, 2027', 'var(--green)'),
        row('walmart', 4, '1 year', 'manufacturer · ends May 26, 2027', 'var(--green)'), row('walmart', 6, 'Return', 'until August 24, 2026', 'var(--gold)')],
      src: 'Data: real Walmart receipt scanned with ReFound (warranties when the information is available; manufacturer terms apply) · deadline from the general 90-day policy' }) },
  // Princess Auto : pas de garantie dans le kit ; badge = prix payé (sert à juger la « durée raisonnable » de la garantie légale).
  'retour-article-en-solde': {
    file: 'recu-reel', slug: 'canadian-tire',
    fr: () => ({ eyebrow: 'Un reçu réel Canadian Tire · acheté le 3 mai 2026 · 17 lignes', title: 'Le reçu prouve la date et le prix. Pas le produit ni la garantie.',
      head: ['<b>Ligne imprimée</b> → <b>produit identifié par ReFound</b> → <b>garantie</b>', 'Retour estimé : <span class="g"><b>1er août 2026</b></span>'],
      rows: [row('canadian-tire', 11, '1 an', 'fabricant · 24,99 $', 'var(--green)'), row('canadian-tire', 15, '1 an', 'fabricant · 59,99 $', 'var(--green)'),
        row('canadian-tire', 0, 'Fabricant', 'voir les détails · 14,99 $', 'var(--green)'),
        Object.assign(row('canadian-tire', 0, 'Retour', 'jusqu’au 1er août 2026', 'var(--gold)'), { printed: 'Tout le reçu', name: '90 jours après l’achat, estimation de l’app', photo: null })],
      src: 'Données : reçu réel Canadian Tire numérisé avec ReFound · garantie quand l’information est disponible, conditions du fabricant · délai de retour général de 90 jours (canadiantire.ca, vérifié le 25 novembre 2026)' }),
    en: () => ({ eyebrow: 'A real Canadian Tire receipt · bought May 3, 2026 · 17 lines', title: 'The receipt proves the date and price. Not the product or the warranty.',
      head: ['<b>Printed line</b> → <b>product identified by ReFound</b> → <b>warranty</b>', 'Estimated return deadline: <span class="g"><b>August 1, 2026</b></span>'],
      rows: [Object.assign(row('canadian-tire', 11, '1 year', 'manufacturer · $24.99', 'var(--green)'), { name: 'Energizer MAX AA alkaline batteries, 24-pack' }),
        Object.assign(row('canadian-tire', 15, '1 year', 'manufacturer · $59.99', 'var(--green)'), { name: 'Road Warrior street hockey goalie pads, glove and blocker, youth, right-handed, 21 in.' }),
        Object.assign(row('canadian-tire', 0, 'Manufacturer', 'see details · $14.99', 'var(--green)'), { name: 'VIC Fused wood street hockey stick, youth, 40 in.' }),
        Object.assign(row('canadian-tire', 0, 'Return', 'until August 1, 2026', 'var(--gold)'), { printed: 'Whole receipt', name: '90 days after purchase, the app’s estimate', photo: null })],
      src: 'Data: real Canadian Tire receipt scanned with ReFound; product names translated from the merchant’s French pages · warranty when the information is available, manufacturer terms apply · general 90-day return window (canadiantire.ca, checked November 25, 2026)' }) },
  'politique-retour-princess-auto': {
    file: 'recu-reel', slug: 'princess-auto',
    fr: () => ({ eyebrow: 'Un reçu réel Princess Auto · acheté le 14 septembre 2025 · 9 lignes', title: '« BOX AMMO » : ce n’est pas une boîte de munitions',
      head: ['<b>Ligne imprimée</b> → <b>produit identifié par ReFound</b> → <b>prix payé</b>', 'Magasin de Kanata (Ontario)'],
      rows: [row('princess-auto', 0, '17,99 $', 'caisse, pas des munitions', 'var(--gold)'), row('princess-auto', 5, '4,49 $', 'Powerfist', 'var(--green)'),
        row('princess-auto', 6, '19,99 $', 'Pro.Point', 'var(--green)'), row('princess-auto', 3, '9,99 $', 'identifié', 'var(--green)'),
        nf(row('princess-auto', 1, '4,44 $', 'ligne non identifiée', 'var(--muted)'), 'Non identifiée : la ligne reste la seule description')],
      src: 'Données : reçu réel Princess Auto numérisé avec ReFound, noms des fiches françaises du marchand · ventes de munitions définitives selon la FAQ Princess Auto, vérifiée le 24 novembre 2026 · le prix payé compte pour la garantie légale (OPC)' }),
    en: () => ({ eyebrow: 'A real Princess Auto receipt · bought September 14, 2025 · 9 lines', title: '“BOX AMMO”: it’s not a box of ammunition',
      head: ['<b>Printed line</b> → <b>product identified by ReFound</b> → <b>price paid</b>', 'Store in Kanata, Ontario'],
      rows: [Object.assign(row('princess-auto', 0, '$17.99', 'a crate, not ammo', 'var(--gold)'), { name: 'Large poly ammo/utility storage crate' }),
        Object.assign(row('princess-auto', 5, '$4.49', 'Powerfist', 'var(--green)'), { name: 'Hand-held salt/seed spreader' }),
        Object.assign(row('princess-auto', 6, '$19.99', 'Pro.Point', 'var(--green)'), { name: 'Dripless caulking gun' }),
        Object.assign(row('princess-auto', 3, '$9.99', 'identified', 'var(--green)'), { name: 'Stretch wrap, 5 in x 1,000 ft' }),
        nf(row('princess-auto', 1, '$4.44', 'line not identified', 'var(--muted)'), 'Not identified: the line is the only description')],
      src: 'Data: real Princess Auto receipt scanned with ReFound; product names translated from the merchant’s French pages · ammunition sales are final per the Princess Auto FAQ, checked November 24, 2026 · price paid matters for Quebec’s legal warranty (OPC)' }) }
};

(async () => {
  const [, , post, out] = process.argv; const j = JOBS[post];
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  for (const l of ['fr', 'en']) {
    const p = await b.newPage({ viewport: { width: 1200, height: 675 } });
    await p.setContent(flow(j[l]())); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, `${j.file}-${l}.png`) }); await p.close();
  }
  await b.close();
})();
