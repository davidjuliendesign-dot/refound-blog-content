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
// Finale ronde 3 : Julie 8, Samuel 7,5, Gilles 9. Reste : aucune capture d'écran de l'app (demander à David une vraie capture du mode retour).
module.exports = {
  fr: { src: 'Sources : politiques de retour officielles, nov. 2026 · calcul ReFound', slides: [
    { type: 'stat', eyebrow: 'Cadeau acheté au Vendredi fou', stat: '2 jours', title: 'après Noël pour retourner l’électronique chez Canadian Tire', text: '30 jours à partir de l’achat, pas de Noël.<br><b>27 novembre + 30 jours = 27 décembre.</b>' },
    { type: 'list', plain: true, eyebrow: 'Acheté le 27 novembre', title: 'Rapportez-le avant le…', items: [
      ['Canadian Tire · Home Depot', 'Télé et électronique : 27 déc. · Le reste : 25 févr.'],
      ['Walmart', 'Électronique : 27 déc. · Le reste : 25 févr.'],
      ['RONA', 'Électroménagers : 27 déc. · Le reste : 25 févr.'],
      ['Costco', 'Télé et électronique : 25 févr.'],
      ['Best Buy', '10 janv. · Mais aucun retour en magasin le 26 déc.']],
      text: 'Électronique : télé, son, photo, téléphones. Walmart n’a pas annoncé de prolongation des Fêtes.' },
    { type: 'text', eyebrow: 'Le vrai problème', title: 'Le cadeau est chez eux. Le reçu est chez vous.', text: 'Pour un retour, le magasin demande une preuve d’achat. C’est la personne qui a payé qui l’a.' },
    { type: 'list', eyebrow: 'Pas de reçu chez IKEA?', title: 'Pour retrouver l’achat, il faut 4&nbsp;choses', items: [
      ['La date d’achat', ''], ['Le magasin', ''], ['Le montant exact', ''], ['Les 4 derniers chiffres de la carte', '']],
      text: '<b>La personne qui a reçu le cadeau n’en a aucune.</b>' },
    { type: 'cta', eyebrow: 'Gratuit · iPhone et Android', title: 'L’app ReFound garde le reçu de chaque cadeau', img: 'assets/app-partage-recu.png', text: 'Prenez-le en photo en emballant le cadeau, et envoyez-le à la personne qui fera l’échange.' }] },
  en: { src: 'Sources: official return policies, Nov. 2026 · ReFound calculation', slides: [
    { type: 'stat', eyebrow: 'Gift bought on Black Friday', stat: '2 days', title: 'after Christmas to return electronics at Canadian Tire', text: '30 days from the purchase, not from Christmas.<br><b>November 27 + 30 days = December 27.</b>' },
    { type: 'list', plain: true, eyebrow: 'Bought November 27', title: 'Bring it back by…', items: [
      ['Canadian Tire · Home Depot', 'TVs and electronics: Dec. 27 · Everything else: Feb. 25'],
      ['Walmart', 'Electronics: Dec. 27 · Everything else: Feb. 25'],
      ['RONA', 'Appliances: Dec. 27 · Everything else: Feb. 25'],
      ['Costco', 'TVs and electronics: Feb. 25'],
      ['Best Buy', 'Jan. 10 · But no in-store returns on Dec. 26']],
      text: 'Electronics: TVs, audio, cameras, phones. Walmart hasn’t announced a holiday extension.' },
    { type: 'text', eyebrow: 'The real problem', title: 'The gift is at their place. The receipt is at yours.', text: 'Stores ask for proof of purchase. The person who paid has it.' },
    { type: 'list', eyebrow: 'No receipt at IKEA?', title: 'To find the purchase, they need 4&nbsp;things', items: [
      ['The purchase date', ''], ['The store', ''], ['The exact amount', ''], ['The card’s last 4 digits', '']],
      text: '<b>The person who got the gift has none of them.</b>' },
    { type: 'cta', eyebrow: 'Free · iPhone and Android', title: 'The ReFound app keeps every gift receipt', text: 'Snap it while you wrap the gift, then send it to whoever makes the exchange.' }] }
};
