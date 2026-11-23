// Carrousel tiré de l'article politique-retour-reitmans (sujet de saison : vêtements achetés pour les Fêtes et au Vendredi fou), 23 nov. 2026.
// Rendu : cd tools && node render-carousel.js politique-retour-reitmans ../social/politique-retour-reitmans
// Faits vérifiés le 23 nov. 2026 (reitmans.com, FR et EN, verbatim) : « Les achats faits entre le 9 octobre et le 5 décembre 2026 peuvent être retournés
// jusqu'au 4 janvier 2027. » ; 30 jours ; « non portés, non lavés, dans leur état original, avec les étiquettes intactes » + reçu original ou preuve d'achat ;
// non retournables : « Articles achetés en magasin dont le prix se termine par ,97 $ » (EN : « Items purchased in store with a price ending in $.97 »).
// Calculs ReFound : 27 nov. → 4 janv. = 38 jours ; 20 déc. + 30 jours = 19 janv.
// Lignes du reçu dessiné : vraies lignes du reçu Reitmans de kit/receipts.json (16 sept. 2026, Gatineau), prix réels.
module.exports = {
  fr: { src: 'Source : reitmans.com (retours) · vérifié le 23 nov. 2026', slides: [
    { type: 'match', title: 'Ce haut Reitmans à 14,97&nbsp;$? Il ne se rapporte pas.', lines: [{ code: 'T-Shirts &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;14,97', hl: true, w: 0.1 }, { code: 'T-ShirtsR-Essentiels 14,99', w: 0.1 }, { code: 'Jupes &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 14,99', w: 0.1 }, { code: 'Pantalons Pet. Denim 34,99', w: 0.1 }],
      text: 'Un vrai reçu Reitmans. <b>Regardez les cents.</b>' },
    { type: 'stat', stat: ',97&nbsp;$', size: 230, title: '= vente finale chez Reitmans', text: 'Acheté en magasin à un prix qui finit par ,97 $&nbsp;: <b>ni retour, ni échange.</b>' },
    { type: 'stat', stat: '4 janv.', size: 210, title: 'pour rapporter un achat fait du 9 oct. au 5 déc.', text: 'Acheté au Vendredi fou (27 nov.)? <b>38 jours au lieu de 30.</b>' },
    { type: 'list', title: 'Pour que le retour passe', items: [
      ['Étiquettes attachées', 'Ni lavé, ni porté'], ['Le reçu', 'Ou une preuve d’achat'], ['Acheté après le 5 décembre?', 'C’est 30 jours : 20 déc. → 19 janv.']] },
    { type: 'text', title: 'Deux «&nbsp;T-Shirts&nbsp;» sur le reçu, 2&nbsp;¢ d’écart', text: 'Un seul peut retourner au magasin. <b>Sur le papier, impossible de savoir lequel.</b>' },
    { type: 'cta', title: 'L’app ReFound vous dit lequel', example: { kit: 'reitmans', ix: 0, l1: 'Sur le reçu', l2: 'Dans l’app' },
      text: 'Prenez le reçu en photo en rentrant : chaque ligne retrouve son vrai produit et sa photo, quand l’info est disponible. <b>Gratuit, iPhone et Android.</b>' }] },
  en: { src: 'Source: reitmans.com (returns) · checked Nov. 23, 2026', slides: [
    { type: 'match', title: 'This $14.97 Reitmans top? It can’t go back.', lines: [{ code: 'T-Shirts &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;14.97', hl: true, w: 0.1 }, { code: 'T-ShirtsR-Essentiels 14.99', w: 0.1 }, { code: 'Jupes &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 14.99', w: 0.1 }, { code: 'Pantalons Pet. Denim 34.99', w: 0.1 }],
      text: 'A real Reitmans receipt. <b>Look at the cents.</b>' },
    { type: 'stat', stat: '$.97', size: 230, title: '= final sale at Reitmans', text: 'Bought in store at a price ending in $.97: <b>no return, no exchange.</b>' },
    { type: 'stat', stat: 'Jan 4', size: 210, title: 'to return a purchase made Oct 9 to Dec 5', text: 'Bought on Black Friday (Nov 27)? <b>38 days instead of 30.</b>' },
    { type: 'list', title: 'To make the return go through', items: [
      ['Tags attached', 'Not washed, not worn'], ['The receipt', 'Or proof of purchase'], ['Bought after December 5?', 'It’s 30 days: Dec 20 → Jan 19']] },
    { type: 'text', title: 'Two “T-Shirts” on the receipt, 2¢ apart', text: 'Only one can go back to the store. <b>On paper, there’s no way to tell which.</b>' },
    { type: 'cta', title: 'The ReFound app tells you which', example: { kit: 'reitmans', ix: 0, l1: 'On the receipt', l2: 'In the app', name: 'Two-fabric puff-sleeve top (identified in French)' },
      text: 'Snap the receipt when you get home: each line gets its real product and photo, when the info is available. <b>Free, iPhone and Android.</b>' }] }
};
