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
      src: 'Data: real Walmart receipt scanned with ReFound (warranties when the information is available; manufacturer terms apply) · deadline from the general 90-day policy' }) }
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
