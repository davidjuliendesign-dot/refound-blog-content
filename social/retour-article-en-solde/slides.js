// Carrousel de saison (Vendredi fou, 27 nov. 2026) tiré de l'article retour-article-en-solde.
// Rendu : cd tools && node render-carousel.js retour-article-en-solde ../social/retour-article-en-solde
// Faits vérifiés le 25 nov. 2026 : canadiantire.ca/fr et /en customer-service/returns.html (non remboursables ni échangeables : « articles en
// liquidation, tel quel, ou en vente définitive » / « Clearance, final sale or AS-IS merchandise » ; 90 jours ; électronique 30 jours ; électronique
// pour l'auto 14 jours) ; homedepot.ca/fr politique de retour (90 jours ; téléviseurs, ordinateurs 30 jours avec reçu ; promotion article gratuit
// ou à prix réduit avec achat : tout retourner ensemble pour le remboursement complet, sinon remboursement ajusté) ; opc.gouv.qc.ca (garanties
// légales automatiques et sans frais ; vêtements : « même si le commerçant ou le fabricant dit vendre l'article sans garantie »).
// Lignes du reçu de la diapo 1 : reçu réel Canadian Tire du kit (kit/receipts.json).
// v2 après la ronde 1 (Julie 6, Samuel 5, Gilles 6,5) : diapo 1 sans code de reçu (incompris par les trois), diapo Home Depot « gratuit avec achat »
// retirée (jugée trop pointue par les trois), magasin précisé sur chaque date, garantie légale avec le geste concret, fin moins publicitaire.
// v3 après la ronde 2 (7,5 / 6,5 / 8) : la date limite estimée revient à la dernière diapo (demandé par les trois).
// Calculs ReFound : 27 nov. + 14 j = 11 déc. ; + 30 j = 27 déc. ; + 90 j = 25 févr. 2027.
module.exports = {
  fr: { src: 'Sources : canadiantire.ca, homedepot.ca, opc.gouv.qc.ca · vérifié le 25 nov. 2026', slides: [
    { type: 'stat', stat: '3 mots', size: 220, title: 'sur l’étiquette empêchent de retourner un achat du Vendredi fou', text: 'Les voici, <b>avant de passer à la caisse.</b>' },
    { type: 'list', plain: true, title: 'Pas de retour si l’étiquette dit\u00a0:', items: [['Liquidation', ''], ['Vente finale', ''], ['Tel quel', '']], text: 'C’est la règle chez Canadian Tire. <b>Un simple prix réduit, lui, se retourne comme d’habitude.</b>' },
    { type: 'list', plain: true, title: 'Acheté le 27 novembre?', items: [
      ['Télé, écouteurs : 27 déc.', '30 jours · Canadian Tire, et Home Depot (télé, ordinateur)'], ['Démarreur à distance : 11 déc.', '14 jours · électronique pour l’auto, Canadian Tire'], ['Le reste : 25 févr. 2027', '90 jours · la plupart des articles, Canadian Tire et Home Depot']] },
    { type: 'text', title: 'Vente finale, et il brise?', text: 'Au Québec, la garantie légale s’applique quand même. <b>Rapportez-le au magasin avec le reçu : demandez réparation, échange ou remboursement.</b>' },
    { type: 'cta', title: 'Vendredi, en rentrant\u00a0: reçus en photo', text: 'L’app ReFound les garde lisibles et affiche sur chacun une date limite de retour estimée. <b>Gratuit, iPhone et Android.</b>' }] },
  en: { src: 'Sources: canadiantire.ca, homedepot.ca, opc.gouv.qc.ca · checked Nov. 25, 2026', slides: [
    { type: 'stat', stat: '3 words', size: 220, title: 'on the tag block a Black Friday return', text: 'Here they are, <b>before you hit the checkout.</b>' },
    { type: 'list', plain: true, title: 'No return if the tag says:', items: [['Clearance', ''], ['Final sale', ''], ['As-is', '']], text: 'That’s the rule at Canadian Tire. <b>A simple sale price returns like any other item.</b>' },
    { type: 'list', plain: true, title: 'Bought on November 27?', items: [
      ['TV, headphones: Dec 27', '30 days · Canadian Tire, and Home Depot (TV, computer)'], ['Remote starter: Dec 11', '14 days · auto electronics, Canadian Tire'], ['Everything else: Feb 25, 2027', '90 days · most items, Canadian Tire and Home Depot']] },
    { type: 'text', title: 'Final sale, and it breaks?', text: 'In Quebec, the legal warranty still applies. <b>Bring it back to the store with the receipt: ask for a repair, exchange or refund.</b>' },
    { type: 'cta', title: 'Friday, when you get home: snap your receipts', text: 'The ReFound app keeps them readable and shows an estimated return deadline on each one. <b>Free, iPhone and Android.</b>' }] }
};
