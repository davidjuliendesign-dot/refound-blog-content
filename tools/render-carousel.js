// Carrousels médias sociaux (social/README.md). Usage: node render-carousel.js <slug> <outDir>
// 1080×1350 (Instagram, Facebook) : fr-01.png… et en-01.png… ; 1080×1920 (TikTok, 9:16) : tt-fr-01.png…, avec
// zones de sécurité TikTok (haut 200 px, bas 460 px pour la légende, droite 130 px pour les boutons). Types de diapos : hook (accroche), text (titre + texte),
// stat (gros chiffre), match (reçu dessiné avec une ligne surlignée : lines [{code, hl, w}]), list (liste numérotée « à garder » : [titre, détail] ; plain: true sans numéros, ex. un magasin par ligne ; text optionnel sous la liste), receipt (lignes de kit/receipts.json : ligne imprimée → produit → garantie/date), cta (fin ; img optionnel, au cas par cas : capture de l'app dans tools/assets/, nettoyée).
// Contenu tiré de l'article (mêmes sources) ; titre ≤ 8 mots, texte ≤ 25 mots ; aucun faux bouton App Store.
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const S = __dirname; const ROOT = path.join(S, '..');
const b64 = p => fs.readFileSync(path.join(S, p)).toString('base64');
const font = (fam, file, w) => `@font-face{font-family:'${fam}';font-weight:${w};src:url(data:font/woff2;base64,${b64(file)}) format('woff2')}`;
const FD = 'fonts/fontsource-funnel-display-5.3.0/files/funnel-display-latin-';
const DM = 'fonts/fontsource-dm-sans-5.3.0/files/dm-sans-latin-';
const LOGO = `data:image/png;base64,${b64('assets/logo-refound-light.png')}`;
const KIT = JSON.parse(fs.readFileSync(path.join(ROOT, 'kit/receipts.json'), 'utf8')).receipts;
function photo(it) {
  if (!it.imageFile) return null; // nom exact du fichier dans kit/images/
  const f = path.join(ROOT, 'kit/images', it.imageFile);
  if (!fs.existsSync(f)) return null;
  const ext = path.extname(f).slice(1).replace('jpg', 'jpeg');
  return `data:image/${ext};base64,${fs.readFileSync(f).toString('base64')}`;
}
const esc = s => String(s).replace(/&#039;/g, '’').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/ /g, ' ');
const CSS = [font('Funnel Display', FD + '700-normal.woff2', 700), font('Funnel Display', FD + '800-normal.woff2', 800),
  font('DM Sans', DM + '400-normal.woff2', 400), font('DM Sans', DM + '500-normal.woff2', 500), font('DM Sans', DM + '700-normal.woff2', 700)].join('') + `
:root{--bg:#14181F;--fg:#F0F2F5;--card:#1D222A;--line:#272C34;--muted:#8491A4;--green:#1EB885;--gold:#F6B828}
*{box-sizing:border-box;margin:0}body{background:var(--bg);color:var(--fg);font-family:'DM Sans',sans-serif}
.h{font-family:'Funnel Display',sans-serif}
.s{width:1080px;height:1350px;padding:84px 80px 70px;display:flex;flex-direction:column;position:relative;overflow:hidden;
 background:radial-gradient(700px 520px at 90% 8%, rgba(30,184,133,.16), transparent 70%), var(--bg)}
.top{display:flex;justify-content:space-between;align-items:center;color:var(--muted);font-size:24px;font-weight:700}
.top img{height:34px}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:60px}
.eyebrow{color:var(--green);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:26px}
.t{font-size:92px;line-height:1.02;font-weight:800;margin-top:22px;letter-spacing:-.01em}
.t em{font-style:normal;color:var(--green)}
.b{font-size:40px;line-height:1.32;color:#C9CFD8;margin-top:40px;max-width:900px}
.b b{color:var(--fg)}
.foot{display:flex;justify-content:space-between;align-items:center;color:var(--muted);font-size:22px;border-top:1px solid var(--line);padding-top:24px}
.big{font-size:250px;line-height:.9;font-weight:800;color:var(--gold);margin-top:30px;letter-spacing:-.03em}
.rows{display:grid;gap:22px;margin-top:46px}
.r{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:24px 26px;display:grid;gap:12px}
.pr{font-family:ui-monospace,Menlo,monospace;font-weight:700;font-size:28px;background:#F4F1E8;color:#2A2D33;border-radius:8px;padding:10px 14px;justify-self:start}
.nm{font-weight:700;font-size:30px;line-height:1.25}.nm:before{content:'→ ';color:var(--green)}
.r.wp{grid-template-columns:150px 1fr;column-gap:24px}.r.wp>*:not(.ph){grid-column:2}.ph{grid-row:1/4;width:150px;height:150px;background:#fff;border-radius:14px;display:flex;align-items:center;justify-content:center;overflow:hidden;align-self:center}.ph img{max-width:100%;max-height:100%}
.bd{justify-self:start;border:3px solid;border-radius:12px;padding:6px 16px;font-family:'Funnel Display';font-weight:800;font-size:32px}
.s.tt{height:1920px;padding:200px 130px 460px 80px}.s.tt .t{font-size:84px}.s.tt .b{font-size:40px}
.ls{list-style:none;padding:0;margin-top:40px;display:grid;gap:22px;counter-reset:n}.ls li{counter-increment:n;display:grid;grid-template-columns:72px 1fr;column-gap:22px;background:var(--card);border:1px solid var(--line);border-radius:18px;padding:22px 24px;align-items:center}.ls li:before{content:counter(n);grid-row:1/3;width:72px;height:72px;border-radius:50%;background:var(--green);color:#0E1217;font-family:'Funnel Display';font-weight:800;font-size:40px;display:flex;align-items:center;justify-content:center}.ls li span{font-weight:800;font-size:36px}.ls li div{color:#C9CFD8;font-size:28px;margin-top:4px}
.rc{margin-top:44px;background:#F4F1E8;border-radius:10px;padding:30px 34px;transform:rotate(-1.5deg);box-shadow:0 24px 50px rgba(0,0,0,.4);display:grid;gap:14px}.rl{display:grid;grid-template-columns:auto 1fr;gap:26px;align-items:center;font-family:ui-monospace,Menlo,monospace;font-weight:700;font-size:38px;color:#2A2D33;padding:8px 12px;border-radius:6px}.rl i{display:block;height:20px;background:#C9C4B8;border-radius:5px}.rl.hl{background:rgba(246,184,40,.6);outline:4px solid #E0A315}
.ex{margin-top:36px;background:var(--card);border:1px solid var(--line);border-radius:20px;padding:24px 28px;display:grid;gap:12px}.exl{color:var(--muted);font-size:24px;font-weight:700;text-transform:uppercase;letter-spacing:.08em}.ex .pr{justify-self:start}.exr{display:flex;gap:20px;align-items:center}.exr .ph{width:110px;height:110px;flex:none}.nm2{font-weight:800;font-size:32px;line-height:1.25}
.ls li.nod:before{grid-row:auto}.ls li.nod span{align-self:center}.ls.pl{gap:14px;margin-top:30px}.ls.pl li{grid-template-columns:1fr;padding:16px 24px}.ls.pl li:before{display:none}.cta:has(.shot) .t{font-size:72px}.shot{display:block;width:620px;margin-top:40px;border-radius:28px;box-shadow:0 24px 50px rgba(0,0,0,.45)}.cta .t{font-size:84px}.url{margin-top:44px;font-family:'Funnel Display';font-weight:800;font-size:56px;color:var(--green)}`;

function slide(d, i, n, src, tt) {
  const top = `<div class="top"><img src="${LOGO}"><span>${i}/${n}</span></div>`;
  const foot = `<div class="foot"><span>${src}</span><span>${i < n ? '→' : ''}</span></div>`;
  let body = '';
  if (d.type === 'hook' || d.type === 'text') body = `${d.eyebrow ? `${d.eyebrow ? `<div class="eyebrow">${d.eyebrow}</div>` : ''}` : ''}<div class="t h">${d.title}</div>${d.text ? `<div class="b">${d.text}</div>` : ''}`;
  if (d.type === 'stat') body = `${d.eyebrow ? `<div class="eyebrow">${d.eyebrow}</div>` : ''}<div class="big h" style="${d.size ? `font-size:${d.size}px` : ""}">${d.stat}</div><div class="t h" style="font-size:68px">${d.title}</div>${d.text ? `<div class="b">${d.text}</div>` : ''}`;
  if (d.type === 'receipt') {
    const r = KIT.find(x => x.slug === d.kit);
    body = `${d.eyebrow ? `<div class="eyebrow">${d.eyebrow}</div>` : ''}<div class="t h" style="font-size:70px">${d.title}</div><div class="rows">${d.rows.map(([ix, badge, col]) => {
      const it = r.items[ix]; const ph = photo(it); return `<div class="r${ph ? ' wp' : ''}">${ph ? `<div class="ph"><img src="${ph}"></div>` : ''}<div class="pr">${esc(it.printed)}</div><div class="nm">${esc(d.names && d.names[ix] || it.name)}</div><div class="bd" style="border-color:${col};color:${col}">${esc(badge)}</div></div>`; }).join('')}</div>`;
  }
  if (d.type === 'list') body = `${d.eyebrow ? `<div class="eyebrow">${d.eyebrow}</div>` : ''}<div class="t h" style="font-size:72px">${d.title}</div><ol class="ls${d.plain ? ' pl' : ''}">${d.items.map(x => `<li${x[1] ? '' : ' class="nod"'}><span class="h">${x[0]}</span>${x[1] ? `<div>${x[1]}</div>` : ''}</li>`).join('')}</ol>${d.text ? `<div class="b" style="font-size:30px;margin-top:28px">${d.text}</div>` : ''}`;
  if (d.type === 'match') body = `${d.eyebrow ? `<div class="eyebrow">${d.eyebrow}</div>` : ''}<div class="t h" style="font-size:80px">${d.title}</div><div class="rc">${d.lines.map(l => `<div class="rl${l.hl ? ' hl' : ''}"><span>${l.code}</span><i style="width:${l.w || 220}px"></i></div>`).join('')}</div>${d.text ? `<div class="b">${d.text}</div>` : ''}`;
  if (d.type === 'cta') {
    let ex = '';
    if (d.example) { const it = KIT.find(x => x.slug === d.example.kit).items[d.example.ix]; const ph = photo(it);
      ex = `<div class="ex"><div class="exl">${d.example.l1}</div><div class="pr">${esc(it.printed)}</div><div class="exl">${d.example.l2}</div><div class="exr">${ph ? `<div class="ph"><img src="${ph}"></div>` : ''}<div class="nm2">${esc(d.example.name || it.name)}</div></div></div>`; }
    const im = d.img ? `<img class="shot" src="data:image/png;base64,${b64(d.img)}">` : '';
    body = `<div class="cta">${d.eyebrow ? `<div class="eyebrow">${d.eyebrow}</div>` : ''}<div class="t h">${d.title}</div>${ex}${im}${d.text ? `<div class="b">${d.text}</div>` : ''}<div class="url">refoundapp.ca</div></div>`;
  }
  return `<style>${CSS}</style><div class="s${tt ? ' tt' : ''}">${top}<div class="mid">${body}</div>${foot}</div>`;
}

const C = require(path.join(ROOT, 'social', process.argv[2], 'slides.js'));
(async () => {
  const out = process.argv[3]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  for (const l of ['fr', 'en']) {
    const list = C[l].slides;
    for (const tt of [false, true]) for (let i = 0; i < list.length; i++) {
      const p = await b.newPage({ viewport: { width: 1080, height: tt ? 1920 : 1350 } });
      await p.setContent(slide(list[i], i + 1, list.length, C[l].src, tt)); await p.evaluate(() => document.fonts.ready);
      await p.screenshot({ path: path.join(out, `${tt ? 'tt-' : ''}${l}-${String(i + 1).padStart(2, '0')}.png`) }); await p.close();
    }
  }
  await b.close();
})();
