// Carrousel de saison (Vendredi fou, 27 nov. 2026) fait le 24 nov. 2026, le jour de l'article politique-retour-princess-auto.
// v1 tirée de la section « garantie légale pour vos outils » de cet article (personas 5 / 4,5 / 7 : « outil » et Princess Auto trop pointus, durée
// raisonnable trop floue, hook texte plat) ; v2 élargie aux achats du Vendredi fou et appuyée sur l'article garantie-bon-fonctionnement-quebec.
// Rendu : cd tools && node render-carousel.js garantie-bon-fonctionnement-quebec ../social/garantie-bon-fonctionnement-quebec
// Faits (OPC, vérifiés le 24 nov. 2026) : garantie de bon fonctionnement pour les biens « achetés ou loués à l'état neuf auprès d'un commerçant à compter du
// 5 octobre 2026 », durée à partir de la livraison ; téléviseur 4 ans ; ordinateur, console, cellulaire, tablette 3 ans ; laveuse, sécheuse, lave-vaisselle 5 ans ;
// réparation gratuite (pièces, main-d'œuvre, transport raisonnable) ; commerçant, fabricant ou les deux. Garantie légale (outils, etc.) : « durée raisonnable,
// compte tenu du prix payé, du contrat et des conditions d'utilisation », automatique et sans frais.
module.exports = {
  fr: { src: 'Source : opc.gouv.qc.ca (garanties) · vérifié le 24 nov. 2026', slides: [
    { type: 'stat', stat: '4 ans', size: 230, title: 'de réparation gratuite pour une télé du Vendredi fou', text: 'Au Québec, même après la fin du délai de retour. <b>Et vos autres achats?</b>' },
    { type: 'list', plain: true, title: 'Combien de temps, selon l’achat', items: [
      ['Télé : 4 ans', ''], ['Ordi, console, cellulaire, tablette : 3 ans', ''], ['Laveuse, sécheuse, lave-vaisselle : 5 ans', ''], ['Outils, souffleuse, friteuse, jouets : une « durée raisonnable »', 'Selon le prix payé et l’usage']],
      text: 'Durées en années : achat neuf depuis le 5 octobre 2026, comptées à partir de la livraison. <b>Acheté avant? La « durée raisonnable » s’applique.</b>' },
    { type: 'list', title: 'Comment réclamer', items: [['Apportez le reçu', 'Il prouve la date et le prix'], ['Allez au magasin, au fabricant, ou aux deux', 'Walmart, Costco, Best Buy, Canadian Tire, RONA : partout au Québec'], ['Refus? opc.gouv.qc.ca', '']] },
    { type: 'text', title: 'En 2029, votre reçu sera-t-il lisible?', text: 'Le papier d’un reçu pâlit. <b>Sans la date d’achat, prouver vos 4 ans se complique.</b>' },
    { type: 'cta', title: 'Prenez vos reçus en photo en rentrant', text: 'L’app ReFound les garde lisibles, même si le papier pâlit, et les retrouve par magasin, date ou montant. <b>Gratuit, iPhone et Android.</b>' }] },
  en: { src: 'Source: opc.gouv.qc.ca (warranties) · checked Nov. 24, 2026', slides: [
    { type: 'stat', stat: '4 years', size: 210, title: 'of free repairs for a Black Friday TV', text: 'In Quebec, even after the return window closes. <b>And your other buys?</b>' },
    { type: 'list', plain: true, title: 'How long, by purchase', items: [
      ['TV: 4 years', ''], ['Computer, console, cell phone, tablet: 3 years', ''], ['Washer, dryer, dishwasher: 5 years', ''], ['Tools, snow blower, air fryer, toys: a “reasonable lifetime”', 'Based on price paid and use']],
      text: 'Years apply to goods bought new since October 5, 2026, counted from delivery. <b>Bought earlier? The “reasonable lifetime” applies.</b>' },
    { type: 'list', title: 'How to claim', items: [['Bring the receipt', 'It proves the date and price'], ['Go to the store, the maker, or both', 'Walmart, Costco, Best Buy, Canadian Tire, RONA: everywhere in Quebec'], ['Refused? opc.gouv.qc.ca', '']] },
    { type: 'text', title: 'In 2029, will your receipt be readable?', text: 'Receipt paper fades. <b>Without the purchase date, proving your 4 years gets harder.</b>' },
    { type: 'cta', title: 'Snap your receipts when you get home', text: 'The ReFound app keeps them readable, even if the paper fades, and finds them by store, date or amount. <b>Free, iPhone and Android.</b>' }] }
};
