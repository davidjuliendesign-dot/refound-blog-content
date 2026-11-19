// Carrousel tiré de l'article retourner-cadeau-noel (rendu : node tools/render-carousel.js retourner-cadeau-noel social/retourner-cadeau-noel)
// Calcul ReFound : achat le 27 novembre 2026 (Vendredi fou) + délai officiel (30 jours → 27 déc. ; 90 jours → 25 févr. 2027).
// Canadian Tire revérifié le 19 nov. 2026 (aucune prolongation des Fêtes) ; Walmart : la page « Holiday Return Policy » affiche
// encore « January 24, 2026 » le 19 nov. 2026, donc prolongation 2026 non annoncée. Best Buy (achats du 2 nov. au 31 déc. → 10 janv. 2027,
// aucun retour en magasin le 26 déc.), Home Depot, Costco, RONA : pages officielles consultées le 12 nov. 2026 (sources des articles).
// v2 après une ronde de personas (5,5 / 6 / 7) : magasins nommés sans numéros, Walmart, Costco et RONA ajoutés, « électronique » défini,
// diapo Best Buy fusionnée, exemple de reçu hors sujet retiré, problème réel (le reçu est chez celui qui a payé).
// v3 après la ronde 2 (7,5 / 7 / 8,5) : conseils génériques remplacés par ce que l'app fait de plus qu'une photo (facts/product.md : recherche du reçu complet, mode retour, partage — gratuits).
// v4 (demande de David) : l'app seulement à la dernière diapo, nommée « l'app » ; diapo 4 = ce que les magasins demandent sans reçu (article, 12 nov. 2026).
// Ronde 4 : 7,5 / 7,5 / 8,5 ; dernière diapo reliée au problème (partage du reçu).
// v5 : diapo 4 simplifiée (David ne la comprenait pas) : une seule règle, IKEA sans reçu, 4 éléments.
// v6 (David) : rester sur un sujet, titres génériques (plus de Canadian Tire à la diapo 1 ni d'IKEA en titre).
// v7 (David) : pas de surtitres, texte réduit au minimum.
// Finale ronde 3 : Julie 8, Samuel 7,5, Gilles 9. Reste : aucune capture d'écran de l'app (demander à David une vraie capture du mode retour).
module.exports = {
  fr: { src: 'Sources : politiques de retour officielles, nov. 2026 · calcul ReFound', slides: [
    { type: 'stat', stat: '2 jours', title: 'après Noël pour retourner un cadeau électronique', text: 'Dans plusieurs magasins :<br><b>27&nbsp;nov. + 30&nbsp;jours = 27&nbsp;déc.</b>' },
    { type: 'list', plain: true, title: 'Acheté le 27 nov. : à rapporter avant le…', items: [
      ['Canadian Tire · Home Depot', 'Électronique : 27 déc. · Le reste : 25 févr.'],
      ['Walmart', 'Électronique : 27 déc. · Le reste : 25 févr.'],
      ['RONA', 'Électroménagers : 27 déc. · Le reste : 25 févr.'],
      ['Costco', 'Électronique : 25 févr.'],
      ['Best Buy', '10 janv. · Aucun retour en magasin le 26 déc.']] },
    { type: 'text', title: 'Le cadeau est chez eux. Le reçu est chez vous.' },
    { type: 'list', title: 'Sans reçu, il faut 4&nbsp;choses', items: [
      ['La date d’achat', ''], ['Le magasin', ''], ['Le montant exact', ''], ['Les 4 derniers chiffres de la carte', '']],
      text: '<b>La personne qui a reçu le cadeau n’en a aucune.</b><br><span style="font-size:22px;color:#8491A4">Exemple : IKEA.</span>' },
    { type: 'cta', title: 'L’app ReFound garde le reçu de chaque cadeau', img: 'assets/app-partage-recu.png', text: 'Gratuit. Envoyez-le à qui fera l’échange.' }] },
  en: { src: 'Sources: official return policies, Nov. 2026 · ReFound calculation', slides: [
    { type: 'stat', stat: '2 days', title: 'after Christmas to return an electronics gift', text: 'At several stores:<br><b>Nov.&nbsp;27 + 30&nbsp;days = Dec.&nbsp;27</b>' },
    { type: 'list', plain: true, title: 'Bought Nov. 27: bring it back by…', items: [
      ['Canadian Tire · Home Depot', 'Electronics: Dec. 27 · Everything else: Feb. 25'],
      ['Walmart', 'Electronics: Dec. 27 · Everything else: Feb. 25'],
      ['RONA', 'Appliances: Dec. 27 · Everything else: Feb. 25'],
      ['Costco', 'Electronics: Feb. 25'],
      ['Best Buy', 'Jan. 10 · No in-store returns on Dec. 26']] },
    { type: 'text', title: 'The gift is at their place. The receipt is at yours.' },
    { type: 'list', title: 'No receipt? You need 4&nbsp;things', items: [
      ['The purchase date', ''], ['The store', ''], ['The exact amount', ''], ['The card’s last 4 digits', '']],
      text: '<b>The person who got the gift has none of them.</b><br><span style="font-size:22px;color:#8491A4">Example: IKEA.</span>' },
    { type: 'cta', title: 'The ReFound app keeps every gift receipt', text: 'Free. Send it to whoever makes the exchange.' }] }
};
