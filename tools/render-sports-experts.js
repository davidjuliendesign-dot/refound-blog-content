// Visuels de posts/politique-retour-sports-experts. Usage: node render-sports-experts.js <outDir>
// Gabarit : segments() — délais sur un axe de dates réelles, plusieurs segments par ligne (remboursement / échange / non précisé) et zones hachurées de jours sans retour (ex. Vendredi fou, 26-27 décembre).
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

// segments(): rows = [label, sub, [[fromISO, toISO, kind], ...], endLabel]; kind = 'r' (remboursement ou échange, doré), 'x' (échange seulement, émeraude), 'u' (non précisé, contour pointillé)
// bands = [[fromISO, toISO]] zones hachurées (aucun retour ni échange) ; axis = [fromISO, toISO] ; ticks = [[ISO, label]]
const day = s => Date.parse(s + 'T12:00:00Z') / 864e5;
function segments(t) {
  const [a0, a1] = t.axis.map(day); const span = a1 - a0; const x = s => (day(s) - a0) / span * 100;
  const cls = { r: 'sr', x: 'sx', u: 'su' };
  const rows = t.rows.map(([lab, sub, segs, el]) => {
    const endX = Math.max(...segs.map(s => x(s[1])));
    return `<div class="row"><div><div class="a">${lab}</div><div class="b">${sub}</div></div>
    <div class="track">${segs.map(([f, to, k]) => `<div class="${cls[k]}" style="left:${x(f)}%;width:${x(to) - x(f)}%"></div>`).join('')}
    <span class="h val" style="left:calc(${endX}% + 10px)">${el}</span></div></div>`;
  }).join('');
  const bands = t.bands.map(([f, to]) => `<div class="band" style="left:${x(f)}%;width:${x(to) - x(f)}%"></div>`).join('');
  return `<style>${CSS}
  h1{font-size:40px}
  .legend{display:flex;gap:24px;margin-top:14px;font-size:15px;color:var(--muted);flex-wrap:wrap}.legend i{display:inline-block;width:14px;height:14px;border-radius:3px;margin-right:8px;vertical-align:-2px}
  .rows{margin-top:20px;display:grid;gap:11px;position:relative}
  .row{display:grid;grid-template-columns:270px 1fr;gap:20px;align-items:center;position:relative;z-index:1}
  .a{font-weight:700;font-size:19px}.b{color:var(--muted);font-size:14px;margin-top:2px}
  .track{height:42px;background:rgba(29,34,42,.75);border:1px solid var(--line);border-radius:10px;position:relative}
  .sr,.sx,.su{position:absolute;top:6px;bottom:6px}
  .sr{background:var(--gold);border-radius:6px 0 0 6px;min-width:4px}.sx{background:var(--green);border-radius:0 6px 6px 0}
  .su{border:2px dashed var(--green);border-left:0;border-radius:0 6px 6px 0}
  .val{position:absolute;top:50%;transform:translateY(-50%);font-weight:800;font-size:16px;white-space:nowrap;background:#0E1217;padding:2px 8px;border-radius:6px;z-index:2}
  .grid{display:grid;grid-template-columns:270px 1fr;gap:20px;position:absolute;inset:-8px 0;pointer-events:none;z-index:0}
  .band{position:absolute;top:0;bottom:0;background:repeating-linear-gradient(135deg,rgba(240,95,95,.38) 0 5px,transparent 5px 10px);border-left:1px solid rgba(240,95,95,.7);border-right:1px solid rgba(240,95,95,.7)}
  .axis{display:grid;grid-template-columns:270px 1fr;gap:20px;color:var(--muted);font-size:14px;margin-top:12px}
  .axis div:last-child{position:relative;height:18px}.axis span{position:absolute;transform:translateX(-50%);white-space:nowrap}
  .hatch{background:repeating-linear-gradient(135deg,rgba(240,95,95,.6) 0 3px,transparent 3px 6px);border:1px solid rgba(240,95,95,.8)}
  .dash{border:2px dashed var(--green)}
  </style><div class="wrap"><div class="eyebrow">${t.eyebrow}</div><h1 class="h">${t.title}</h1>
  <div class="legend"><span><i style="background:var(--gold)"></i>${t.lr}</span><span><i style="background:var(--green)"></i>${t.lx}</span><span><i class="dash"></i>${t.lu}</span><span><i class="hatch"></i>${t.lb}</span></div>
  <div class="rows"><div class="grid"><div></div><div style="position:relative">${bands}</div></div>${rows}</div>
  <div class="axis"><div></div><div>${t.ticks.map(([s, l]) => `<span style="left:${x(s)}%">${l}</span>`).join('')}</div></div>
  <div class="foot" style="margin-top:auto"><p>${t.src}</p><img src="${LOGO}"></div></div>`;
}

const AX = ['2026-10-15', '2027-02-20'];
const BANDS = [['2026-11-27', '2026-12-01'], ['2026-12-26', '2026-12-28']];
const C = {
  fr: { eyebrow: 'Sports Experts · retours des Fêtes 2026', title: 'Date limite de retour selon la date d’achat',
    lr: 'Remboursement ou échange', lx: 'Échange seulement', lu: 'Échange : non précisé', lb: 'Aucun retour ni échange (hors N.-B.)',
    rows: [['Achat le 20 octobre', 'Avant la période des Fêtes', [['2026-10-20', '2026-11-04', 'r'], ['2026-11-04', '2026-11-19', 'x']], '4 nov. · 19 nov.'],
      ['Achat le 26 octobre', '1er jour de la période', [['2026-10-26', '2027-01-10', 'r']], '10 janv.'],
      ['Achat le 27 novembre', 'Vendredi fou', [['2026-11-27', '2027-01-10', 'r']], '10 janv.'],
      ['Achat le 20 décembre', 'Cadeau de dernière minute', [['2026-12-20', '2027-01-10', 'r'], ['2027-01-10', '2027-01-19', 'u']], '10 janv. · 19 janv.?'],
      ['Achat le 26 décembre', 'Politique régulière', [['2026-12-26', '2027-01-10', 'r'], ['2027-01-10', '2027-01-25', 'x']], '10 janv. · 25 janv.']],
    axis: AX, bands: BANDS,
    ticks: [['2026-11-01', 'nov.'], ['2026-12-01', 'déc.'], ['2027-01-01', 'janv.'], ['2027-02-01', 'févr.']],
    src: 'Calcul ReFound d’après le centre d’aide Sports Experts · vérifié le 9 novembre 2026 · à l’échelle' },
  en: { eyebrow: 'Sports Experts · 2026 holiday returns', title: 'Return deadline by purchase date',
    lr: 'Refund or exchange', lx: 'Exchange only', lu: 'Exchange: not specified', lb: 'No returns or exchanges (outside N.B.)',
    rows: [['Bought October 20', 'Before the holiday period', [['2026-10-20', '2026-11-04', 'r'], ['2026-11-04', '2026-11-19', 'x']], 'Nov 4 · Nov 19'],
      ['Bought October 26', 'First day of the period', [['2026-10-26', '2027-01-10', 'r']], 'Jan 10'],
      ['Bought November 27', 'Black Friday', [['2026-11-27', '2027-01-10', 'r']], 'Jan 10'],
      ['Bought December 20', 'Last-minute gift', [['2026-12-20', '2027-01-10', 'r'], ['2027-01-10', '2027-01-19', 'u']], 'Jan 10 · Jan 19?'],
      ['Bought December 26', 'Regular policy', [['2026-12-26', '2027-01-10', 'r'], ['2027-01-10', '2027-01-25', 'x']], 'Jan 10 · Jan 25']],
    axis: AX, bands: BANDS,
    ticks: [['2026-11-01', 'Nov'], ['2026-12-01', 'Dec'], ['2027-01-01', 'Jan'], ['2027-02-01', 'Feb']],
    src: 'ReFound calculation based on the Sports Experts help centre · checked November 9, 2026 · to scale' }
};

function cover() {
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 85% 30%, rgba(30,184,133,.18), transparent 70%), var(--bg)}
  .left{position:absolute;left:72px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:28px;width:560px}
  .left img{height:34px;align-self:flex-start}
  .big{font-size:104px;line-height:.95;font-weight:800;letter-spacing:-.02em}.big em{font-style:normal;color:var(--green)}
  .chips{display:flex;gap:14px}.chip{border:2px solid var(--line);background:var(--card);border-radius:999px;padding:10px 22px;font-weight:800;font-size:28px}
  .r{position:absolute;right:96px;top:64px;width:460px;background:#F4F1E8;color:#2A2D33;border-radius:6px;padding:34px 32px 40px;transform:rotate(4deg);font-family:ui-monospace,Menlo,monospace;font-size:18px;box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .r .t{text-align:center;font-weight:700;letter-spacing:.2em;margin-bottom:22px}
  .r .l{display:grid;grid-template-columns:1fr auto;gap:12px;margin:9px 0}
  .r hr{border:0;border-top:2px dashed #B9B5AA;margin:20px 0}
  .stamp{position:absolute;right:66px;bottom:52px;width:164px;height:164px;border-radius:50%;background:var(--green);color:#0E1217;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-10deg);box-shadow:0 18px 40px rgba(0,0,0,.4);text-align:center}
  .stamp b{font-family:'Funnel Display';font-size:58px;line-height:1}.stamp span{font-weight:700;font-size:14px;letter-spacing:.08em}
  </style><div class="c"><div class="left"><img src="${LOGO}"><div class="big h">Sports<br><em>Experts</em></div>
  <div class="chips"><div class="chip h" style="color:var(--gold)">15</div><div class="chip h" style="color:var(--green)">30</div></div></div>
  <div class="r"><div class="t">REÇU · RECEIPT</div>
  <div class="l"><span>PATINS / SKATES</span><span>15 · 30</span></div>
  <div class="l"><span>BÂTON / STICK</span><span>15 · 30</span></div>
  <div class="l"><span>CASQUE / HELMET</span><span>15 · 30</span></div>
  <hr><div class="l"><span>26/10 → 25/12</span><span>★</span></div><div class="l" style="color:#8A8579"><span>RETOUR / RETURN</span><span>10/01/27</span></div><hr>
  <div style="height:54px;background:repeating-linear-gradient(90deg,#2A2D33 0 3px,transparent 3px 6px,#2A2D33 6px 7px,transparent 7px 11px)"></div></div>
  <div class="stamp"><b>10.01</b><span>2027</span></div></div>`;
}
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  let jobs = [['cover.png', cover(), 630]];
  for (const l of ['fr', 'en']) jobs.push([`retours-fetes-${l}.png`, segments(C[l]), 675]);
  const b = await chromium.launch();
  for (const [name, html, h] of jobs) {
    const p = await b.newPage({ viewport: { width: 1200, height: h } });
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
})();
