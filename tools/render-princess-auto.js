// Couverture de l'article politique-retour-princess-auto (sans texte dépendant de la langue) : reçu réel dessiné (ligne « BOX AMMO » surlignée),
// clé à molette, et pastille « téléphone masqué → ✓ » (recherche d'achat par nom et numéro, sans reçu). Usage: node render-princess-auto.js <outDir>
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
.foot p{color:var(--muted);font-size:14px;max-width:900px}.foot img{height:22px}`;
const LOGO = `data:image/png;base64,${b64('assets/logo-refound-light.png')}`;


function cover() {
  return `<style>${CSS}
  .c{width:1200px;height:630px;position:relative;overflow:hidden;background:radial-gradient(700px 420px at 78% 40%, rgba(30,184,133,.18), transparent 70%), var(--bg)}
  .left{position:absolute;left:72px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:30px;width:540px}
  .left img{height:34px;align-self:flex-start}
  .big{font-size:96px;line-height:.95;font-weight:800;letter-spacing:-.02em}.big em{font-style:normal;color:var(--green)}
  .pill{display:flex;align-items:center;gap:16px;align-self:flex-start;border:2px solid var(--line);background:var(--card);border-radius:999px;padding:12px 24px 12px 14px;font-weight:800;font-size:30px}
  .pill .ic{width:52px;height:52px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center}
  .pill .ok{width:46px;height:46px;border-radius:50%;background:var(--green);color:#0E1217;display:flex;align-items:center;justify-content:center;font-size:30px}
  .pill .ar{color:var(--green)}
  .r{position:absolute;right:80px;top:70px;width:420px;background:#F4F1E8;color:#2A2D33;border-radius:6px;padding:26px 24px 30px;transform:rotate(4deg);font-family:ui-monospace,Menlo,monospace;font-size:17px;font-weight:700;box-shadow:0 30px 60px rgba(0,0,0,.45)}
  .r .l{display:grid;grid-template-columns:1fr auto;gap:10px;margin:9px 0}.r .g{height:14px;background:#C9C4B8;border-radius:4px}
  .r .hl{background:rgba(246,184,40,.6);outline:3px solid #E0A315;border-radius:4px;padding:2px 6px;margin-left:-6px;margin-right:-6px}
  .r hr{border:0;border-top:2px dashed #B9B5AA;margin:16px 0}
  .wr{position:absolute;left:610px;bottom:80px;width:250px;transform:rotate(-28deg)}
  </style><div class="c"><div class="left"><img src="${LOGO}"><div class="big h">Princess<br><em>Auto</em></div>
  <div class="pill"><div class="ic"><svg width="28" height="28" viewBox="0 0 24 24" fill="#0E1217"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg></div>
  <span>•••‑•••‑••••</span><span class="ar">→</span><div class="ok">✓</div></div></div>
  <svg class="wr" viewBox="0 0 260 80"><path d="M40 12a28 28 0 1 0 22 46l170-2a14 14 0 0 0 0-28L62 26A28 28 0 0 0 40 12zm-6 16h14l7 12-7 12H34l-7-12z" fill="#8491A4"/></svg>
  <div class="r"><div class="l hl"><span>BOX AMMO UTILITY CRATE POLY</span><span>17.99</span></div>
  <div class="l"><span>GOGGLE SAFETY CLEAR</span><span>4.44</span></div><div class="l"><span>WRAP 5IN X 1000FT STRETCH</span><span>9.99</span></div>
  <div class="l"><span>SPREADER HAND-HELD SALT/SEEDS</span><span>4.49</span></div><div class="l"><span>GUN CAULKING DRPLSS MTL 9IN P</span><span>19.99</span></div>
  <div class="l"><span>PAINT WHITEGLOSS RUST 3.78L T</span><span>84.99</span></div><hr><div class="g"></div><div class="g" style="width:60%;margin-top:10px"></div></div></div>`;
}
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.setContent(cover()); await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(out, 'cover.png') }); await b.close();
})();
