// Carrousel tiré de l'article ajustement-de-prix (sujet de saison : Vendredi fou, 27 nov. 2026), fait le 20 nov. 2026 à la place
// du carrousel « souffleuse » de politique-retour-bmr (personas 4,5 / 3 / 6,5 : sujet trop pointu, propriétaires seulement).
// Rendu : cd tools && node render-carousel.js ajustement-de-prix ../social/ajustement-de-prix
// Faits revérifiés le 20 nov. 2026 (verbatim) : Walmart (« Within 30 days (with receipt) … refund the difference », liquidations exclues) ;
// Best Buy (« Should our own price be reduced after your purchase, present us with your original receipt within 30 days of purchase ») ;
// IKEA (baisse dans les 30 jours suivant l'achat, même numéro d'article, demande pendant la promotion, preuve d'achat : reçu ou nº de commande).
// Canadian Tire : page Politique de prix (20 nov. 2026) : alignement en ligne/magasin seulement, rien sur un ajustement après l'achat.
// v2 après la ronde 1 (Julie 7, Samuel 7, Gilles 6) : calcul retiré de la diapo 3, Canadian Tire ajouté, diapo « Comment réclamer », fin concrète (recherche par magasin).
// v3 après la ronde 2 (8 / 7,5 / 7,5) : ligne Canadian Tire reformulée (« aucun ajustement annoncé · demandez au comptoir »).
// Calcul ReFound : 27 nov. 2026 − 30 jours = 28 oct. 2026. App : recherche parmi ses reçus (magasin, date, montant), gratuite (facts/product.md).
module.exports = {
  fr: { src: 'Sources : walmart.ca, bestbuy.ca, ikea.com/ca, canadiantire.ca · vérifié le 20 nov. 2026', slides: [
    { type: 'hook', title: 'Vous avez acheté avant le Vendredi fou?', text: 'Si le prix baisse, <b>vous pouvez récupérer la différence. Sans rien retourner.</b>' },
    { type: 'stat', stat: '30 jours', size: 200, title: 'pour réclamer la différence si le prix baisse', text: 'Chez Walmart, Best Buy et IKEA, <b>avec le reçu.</b>' },
    { type: 'list', plain: true, title: 'Acheté le 28 oct. ou après? Vous êtes dans les temps.', items: [
      ['Walmart', 'Reçu · pas les articles en liquidation'],
      ['Best Buy', 'Reçu original'],
      ['IKEA', 'Même article · à demander pendant la promo'],
      ['Canadian Tire', 'Aucun ajustement annoncé · demandez au comptoir']] },
    { type: 'list', title: 'Comment réclamer', items: [
      ['Le reçu', 'Il prouve la date et le prix payé'], ['Le même article', 'Au nouveau prix, encore affiché'], ['Au service à la clientèle', 'La différence vous est remboursée']],
      text: '<b>Pas de reçu, pas de différence.</b> Il est où, le vôtre?' },
    { type: 'cta', title: 'Tapez « Best Buy » : le reçu sort', text: 'L’app ReFound garde vos reçus et les retrouve par magasin, date ou montant. <b>Gratuit, iPhone et Android. Prenez vos reçus de cadeaux en photo ce soir.</b>' }] },
  en: { src: 'Sources: walmart.ca, bestbuy.ca, ikea.com/ca, canadiantire.ca · checked Nov. 20, 2026', slides: [
    { type: 'hook', title: 'Bought something before Black Friday?', text: 'If the price drops, <b>you can get the difference back. No return needed.</b>' },
    { type: 'stat', stat: '30 days', size: 200, title: 'to claim the difference if the price drops', text: 'At Walmart, Best Buy and IKEA, <b>with the receipt.</b>' },
    { type: 'list', plain: true, title: 'Bought on Oct. 28 or later? You’re in time.', items: [
      ['Walmart', 'Receipt · not clearance items'],
      ['Best Buy', 'Original receipt'],
      ['IKEA', 'Same item · ask during the sale'],
      ['Canadian Tire', 'No adjustment announced · ask at the counter']] },
    { type: 'list', title: 'How to claim it', items: [
      ['The receipt', 'It proves the date and price paid'], ['The same item', 'At the new price, still posted'], ['Customer service', 'You get the difference back']],
      text: '<b>No receipt, no difference.</b> Where’s yours?' },
    { type: 'cta', title: 'Type “Best Buy”: the receipt pops up', text: 'The ReFound app keeps your receipts and finds them by store, date or amount. <b>Free, iPhone and Android. Snap your gift receipts tonight.</b>' }] }
};
