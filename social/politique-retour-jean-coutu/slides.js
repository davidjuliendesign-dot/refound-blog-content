// Carrousel de saison (cadeaux des Fêtes, Vendredi fou du 27 nov. 2026) tiré de l'article politique-retour-jean-coutu.
// Rendu : cd tools && node render-carousel.js politique-retour-jean-coutu ../social/politique-retour-jean-coutu
// Faits vérifiés le 26 nov. 2026 : jeancoutu.com/en/customer-service/return-policy-instore (30 jours, PJC de votre choix, reçu original papier ou
// courriel, revendable dans l'emballage d'origine, remboursement sur le mode de paiement d'origine ou carte-cadeau, exclusions : cartes-cadeaux,
// liquidation, sous-vêtements, produits d'hygiène, ordonnances…), aucune prolongation des Fêtes mentionnée ; groupeproxim.ca et rexall.ca (30 jours) ;
// opc.gouv.qc.ca (garanties légales automatiques et sans frais ; commerçant ou fabricant ; réparation, échange ou remboursement).
// v2 après la ronde 1 (Julie 4,5, Samuel 3, Gilles 6) : accroche plus claire, conditions et exclusions fusionnées (liste d'exclusions jugée
// évidente par les trois), diapo « le cadeau, c'est quelqu'un d'autre qui le rapporte » (question de Julie), garantie légale expliquée en mots simples,
// fin sans contradiction avec le reçu original et avec un geste concret (recherche par magasin, gratuite).
// v3 après la ronde 2 (6,5 / 4,5 / 7,5) : diapo 2 allégée (Proxim et Rexall dans la légende), reçu-cadeau absent de la politique dit clairement,
// rôle de la photo et de l'original expliqué, raison d'avoir la carte (le remboursement retourne au mode de paiement d'origine).
// Calculs ReFound : 27 nov. + 30 j = 27 déc. ; 10 déc. + 30 j = 9 janv. ; 24 déc. + 30 j = 23 janv.
module.exports = {
  fr: { src: 'Sources : jeancoutu.com, opc.gouv.qc.ca · vérifié le 26 nov. 2026', slides: [
    { type: 'stat', stat: '27 déc.', size: 230, title: 'Un cadeau du Vendredi fou acheté chez Jean Coutu?', text: '<b>Dernier jour pour le retourner.</b> Pas en janvier.' },
    { type: 'list', plain: true, title: '30 jours après l’achat, pas après Noël', items: [
      ['Acheté le 27 nov. → 27 déc.', 'Vendredi fou'], ['Acheté le 10 déc. → 9 janv.', ''], ['Acheté le 24 déc. → 23 janv.', 'Veille de Noël']],
      text: '<b>Aucune prolongation des Fêtes affichée par Jean Coutu.</b>' },
    { type: 'list', title: 'Pour que le retour passe', items: [
      ['Le reçu original', 'papier ou courriel'], ['Dans sa boîte d’origine', 'comme neuf, prêt à revendre']],
      text: '<b>Jamais repris, même avec le reçu :</b> produits d’hygiène, sous-vêtements, liquidation, cartes-cadeaux.' },
    { type: 'text', title: 'Quelqu’un d’autre fera l’échange?', text: 'La politique ne prévoit pas de reçu-cadeau : <b>donnez-lui le reçu original</b>, même si le prix y paraît. N’importe quelle pharmacie Jean Coutu l’accepte.' },
    { type: 'text', title: 'Passé 30 jours, le sèche-cheveux brise?', text: 'Au Québec, un appareil doit durer un temps raisonnable pour son prix : c’est la garantie légale. <b>Retournez au magasin avec le reçu : réparation, échange ou remboursement.</b>' },
    { type: 'cta', title: 'En emballant le cadeau : reçu en photo', text: 'La photo sert à le retrouver, l’original au comptoir. Dans l’app ReFound, tapez « Jean Coutu » : <b>la date et la carte à présenter pour le remboursement ressortent.</b> Gratuit, iPhone et Android.' }] },
  en: { src: 'Sources: jeancoutu.com, opc.gouv.qc.ca · checked Nov. 26, 2026', slides: [
    { type: 'stat', stat: 'Dec 27', size: 230, title: 'A Black Friday gift bought at Jean Coutu?', text: '<b>Last day to return it.</b> Not January.' },
    { type: 'list', plain: true, title: '30 days after purchase, not after Christmas', items: [
      ['Bought Nov 27 → Dec 27', 'Black Friday'], ['Bought Dec 10 → Jan 9', ''], ['Bought Dec 24 → Jan 23', 'Christmas Eve']],
      text: '<b>No holiday extension posted by Jean Coutu.</b>' },
    { type: 'list', title: 'For the return to go through', items: [
      ['The original receipt', 'paper or email'], ['In its original box', 'like new, ready to resell']],
      text: '<b>Never taken back, even with a receipt:</b> hygiene products, underwear, clearance, gift cards.' },
    { type: 'text', title: 'Someone else will exchange it?', text: 'The policy has no gift receipt: <b>give them the original receipt</b>, even if the price shows. Any Jean Coutu pharmacy takes it.' },
    { type: 'text', title: 'Past 30 days, the hair dryer breaks?', text: 'In Quebec, a device must last a reasonable time for its price: that’s the legal warranty. <b>Bring it back to the store with the receipt: repair, exchange or refund.</b>' },
    { type: 'cta', title: 'While wrapping the gift: snap the receipt', text: 'The photo helps you find it, the original goes to the counter. In the ReFound app, type “Jean Coutu”: <b>the date and the card to show for the refund come right up.</b> Free, iPhone and Android.' }] }
};
