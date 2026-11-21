// Carrousel tiré de l'article politique-retour-joe-fresh (sujet de saison : achats des Fêtes, vêtements achetés à l'épicerie), 21 nov. 2026.
// Rendu : cd tools && node render-carousel.js politique-retour-joe-fresh ../social/politique-retour-joe-fresh
// Faits vérifiés le 21 nov. 2026 (joefresh.com/ca/returns, verbatim) : « Purchases made from November 8, 2026, to December 25, 2026 are eligible for an
// extended return until January 24, 2027 with original price tags and receipt » ; 30 jours « with original price tags and receipt » ;
// « Items must not be washed, worn or damaged » ; retours acceptés « at any grocery stores where Joe Fresh apparel is carried … regardless of where the
// original purchase was made ». FAQ : liste des magasins (Maxi & Cie, Loblaws…), Provigo absent.
// Calculs ReFound : 8 nov. → 24 janv. = 77 jours ; 27 nov. → 24 janv. = 58 jours ; 25 déc. → 24 janv. = 30 jours.
// Lignes du reçu dessiné : vraies lignes du reçu Maxi & Cie de kit/receipts.json (2 oct. 2026).
// v2 après la ronde 1 (Julie 5, Samuel 3, Gilles 5) : le reçu surligné passe en accroche, diapos 2-3 fusionnées (Vendredi fou daté),
// v3 après la ronde 2 (7 / 5 / 7) : diapo 3 « acheté chez Maxi, rapporté chez Loblaws », fin = geste concret (recherche par magasin, gratuite).
// Après la ronde 3 (7,5 / 6 / 8) : titre de fin « Dans l’app, tapez… » (les trois demandaient où taper).
// Provigo retiré des diapos (gardé dans la légende et l'article), diapo « reçu jeté ou pâli », fin en une action.
module.exports = {
  fr: { src: 'Source : joefresh.com/ca/returns · vérifié le 21 nov. 2026', slides: [
    { type: 'match', title: 'Un chandail acheté chez Maxi? Il est caché ici.', lines: [{ code: 'BANANES RJ', w: 200 }, { code: 'DM MANDARINE 4LB RJ', w: 110 }, { code: 'SW HOODY FPRJ', hl: true, w: 190 }, { code: 'CAMP WW LF RJ', w: 180 }],
      text: 'Sur la facture d’épicerie, il s’appelle «&nbsp;SW&nbsp;HOODY&nbsp;». <b>Ne la jetez pas : achat des Fêtes = retour jusqu’au 24 janvier.</b>' },
    { type: 'stat', stat: '24 janv.', size: 210, title: 'pour rapporter du linge Joe Fresh acheté du 8 nov. au 25 déc.', text: 'Acheté au Vendredi fou (27 nov.)? <b>58 jours au lieu de 30.</b>' },
    { type: 'list', title: 'Pour que le retour passe', items: [
      ['Étiquettes attachées', 'Ni lavé, ni porté'], ['Le reçu complet', 'Même avec l’épicerie dessus'], ['Acheté chez Maxi, rapporté chez Loblaws?', 'C’est accepté, comme dans un magasin Joe Fresh']] },
    { type: 'text', title: 'La facture d’épicerie part avec les circulaires', text: 'Ou elle pâlit au fond du tiroir. <b>Le jour du retour, c’est elle qu’on vous demande.</b>' },
    { type: 'cta', title: 'Dans l’app, tapez&nbsp;«&nbsp;Maxi&nbsp;»&nbsp;: la facture sort', text: 'L’app ReFound garde une copie lisible de vos factures, même si le papier pâlit. <b>Gratuit, iPhone et Android : téléchargez-la avant vos achats des Fêtes.</b>' }] },
  en: { src: 'Source: joefresh.com/ca/returns · checked Nov. 21, 2026', slides: [
    { type: 'match', title: 'Bought a hoodie at the grocery store? It’s hiding here.', lines: [{ code: 'BANANES RJ', w: 200 }, { code: 'DM MANDARINE 4LB RJ', w: 110 }, { code: 'SW HOODY FPRJ', hl: true, w: 190 }, { code: 'CAMP WW LF RJ', w: 180 }],
      text: 'On the grocery receipt, it’s called “SW&nbsp;HOODY”. <b>Don’t toss it: holiday purchase = return until January 24.</b>' },
    { type: 'stat', stat: 'Jan 24', size: 210, title: 'to return Joe Fresh clothes bought Nov 8 to Dec 25', text: 'Bought on Black Friday (Nov 27)? <b>58 days instead of 30.</b>' },
    { type: 'list', title: 'To make the return go through', items: [
      ['Tags attached', 'Not washed, not worn'], ['The whole receipt', 'Even with your groceries on it'], ['Bought at Maxi, returned at Loblaws?', 'Accepted, like at any Joe Fresh store']] },
    { type: 'text', title: 'Grocery receipts go out with the flyers', text: 'Or fade in a drawer. <b>On return day, that’s the one they ask for.</b>' },
    { type: 'cta', title: 'In the app, type “Maxi”: the receipt pops up', text: 'The ReFound app keeps a readable copy of your receipts, even if the paper fades. <b>Free, iPhone and Android: get it before your holiday shopping.</b>' }] }
};
