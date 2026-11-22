// Carrousel de saison (Vendredi fou, 27 nov. 2026) tiré de politique-retour-walmart et de retourner-cadeau-noel (mis à jour le 22 nov. 2026).
// Rendu : cd tools && node render-carousel.js politique-retour-walmart ../social/politique-retour-walmart
// Fait vérifié le 22 nov. 2026 sur walmart.ca « Holiday Return Policy » : « Unopened items purchased between November 1 and December 25 »
// avec un délai de 30 jours « can be returned until January 24, 2027 », preuve d'achat valide ; exclus : articles vendus et expédiés
// par un vendeur du Marché électronique, appareils sans fil à contrat postpayé ; « Final sale exceptions still apply ».
// Calcul ReFound : 27 nov. 2026 + 30 jours = 27 déc. 2026 ; 24 janv. 2027 − 27 déc. 2026 = 28 jours.
// App : recherche parmi ses reçus par magasin (gratuite, facts/product.md). La date limite affichée par l'app pour Walmart = politique générale (90 jours) : ne pas promettre qu'elle connaît la prolongation.
// v2 après la ronde 1 (Julie 4, Samuel 4,5, Gilles 5,5) : accroche élargie (achats des Fêtes, pas « console »), année affichée,
// condition « jamais ouvert » en titre (contradiction « déballé » retirée), diapos 3 et 4 fusionnées en langage simple, fin = geste d'abord.
// Finale (ronde 3) : Julie 7,5, Samuel 7, Gilles 8 ; accroche précisée ensuite (« votre électronique », remarque des 3 : « vos achats » survendait).
// v3 après la ronde 2 (6,5 / 6 / 7,5) : gain « +28 jours » en accroche, diapo « quels articles » (30 vs 90 jours, article Walmart), « vendu ou expédié par Walmart » + en magasin, reçu qui pâlit nommé.
module.exports = {
  fr: { src: 'Source : walmart.ca · vérifié le 22 nov. 2026 · calcul ReFound', slides: [
    { type: 'stat', stat: '+28 jours', size: 170, title: 'pour retourner votre électronique du Vendredi fou chez Walmart', text: 'Jusqu’au <b>24&nbsp;janv.&nbsp;2027</b>, au lieu du 27&nbsp;déc.' },
    { type: 'list', plain: true, title: 'Achetés du 1er&nbsp;nov. au 25&nbsp;déc.', items: [
      ['Électronique et autres articles à 30 jours', 'Retour jusqu’au 24 janv. 2027'],
      ['La plupart des autres articles (90 jours)', 'Rien ne change : leur délai est déjà plus long']] },
    { type: 'list', title: 'Deux conditions', items: [
      ['Jamais ouvert', 'Gardez-le dans sa boîte tant que vous hésitez'],
      ['Vendu ou expédié par Walmart', 'En magasin : oui. En ligne : pas un vendeur tiers qui expédie lui-même']],
      text: 'Exclus aussi : cellulaires avec forfait, articles en vente finale.' },
    { type: 'text', title: 'Le 24 janvier, il faudra le reçu.', text: 'Une preuve d’achat est exigée. <b>Et le papier d’un reçu pâlit avec le temps.</b>' },
    { type: 'cta', title: 'Prenez vos reçus en photo en rentrant', text: 'L’app ReFound les garde lisibles. En janvier, tapez «&nbsp;Walmart&nbsp;»&nbsp;: le reçu sort. <b>Gratuit, iPhone et Android.</b>' }] },
  en: { src: 'Source: walmart.ca · checked Nov. 22, 2026 · ReFound calculation', slides: [
    { type: 'stat', stat: '+28 days', size: 170, title: 'to return your Black Friday electronics at Walmart', text: 'Until <b>Jan.&nbsp;24, 2027</b>, instead of Dec.&nbsp;27.' },
    { type: 'list', plain: true, title: 'Bought Nov.&nbsp;1 to Dec.&nbsp;25', items: [
      ['Electronics and other 30-day items', 'Return until Jan. 24, 2027'],
      ['Most other items (90 days)', 'Nothing changes: their window is already longer']] },
    { type: 'list', title: 'Two conditions', items: [
      ['Never opened', 'Keep it in the box while you decide'],
      ['Sold or shipped by Walmart', 'In store: yes. Online: not a third-party seller shipping it themselves']],
      text: 'Also excluded: phones on a plan, final-sale items.' },
    { type: 'text', title: 'On January 24, you’ll need the receipt.', text: 'Proof of purchase is required. <b>And receipt paper fades over time.</b>' },
    { type: 'cta', title: 'Snap your receipts when you get home', text: 'The ReFound app keeps them readable. In January, type “Walmart”: the receipt pops up. <b>Free, iPhone and Android.</b>' }] }
};
