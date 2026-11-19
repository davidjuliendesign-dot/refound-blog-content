// Carrousel tiré de l'article politique-retour-dollarama (rendu : cd tools && node render-carousel.js politique-retour-dollarama ../social/politique-retour-dollarama)
// Faits : dollarama.com (Nous joindre ; Termes et conditions du 11 août 2026), vérifiés le 19 nov. 2026 : « aucun échange ni aucun retour »,
// sauf produit défectueux ou endommagé signalé dans les 30 jours suivant l'achat, photo du produit et de l'emballage d'origine, produit inutilisé.
// Calcul ReFound : 1er déc. 2026 + 30 jours = 31 déc. 2026. Reçu : ligne réelle du kit (Dollarama, 18 août 2026).
// v2 après la ronde 1 (Julie 5, Samuel 4, Gilles 5,5) : calcul retiré, « comment signaler » ajouté (formulaire Nous joindre),
// garantie légale du Québec sur une diapo (OPC : durée raisonnable selon le prix), « inutilisé » retiré, exemple réel de l'app à la fin.
// v3 après la ronde 2 (7 / 5,5 / 7,5) : diapo 1 sans « 30 jours » (doublon avec la 2), action ajoutée à la garantie légale (OPC : commerçant ou fabricant), diapo 5 centrée sur la date.
module.exports = {
  fr: { src: 'Sources : dollarama.com, opc.gouv.qc.ca · vérifié le 19 nov. 2026', slides: [
    { type: 'hook', title: 'Dollarama : aucun échange, aucun retour', text: 'C’est écrit dans sa politique. <b>Sauf une exception.</b>' },
    { type: 'stat', stat: '30 jours', size: 200, title: 'pour signaler un article défectueux ou endommagé', text: 'À compter de la date d’achat.' },
    { type: 'list', title: 'Comment le signaler', items: [
      ['Photo du produit', 'Défectueux ou endommagé'], ['Photo de l’emballage d’origine', 'Gardez-le 30 jours'], ['Formulaire « Nous joindre »', 'Sur dollarama.com']],
      text: '<b>Gardez le reçu : il prouve la date.</b> Acheté en magasin? Demandez aussi au comptoir.' },
    { type: 'text', title: 'Défectueux? Au Québec, la loi vous protège aussi', text: 'Garantie légale : un article doit durer un temps raisonnable. <b>Même après 30 jours, adressez-vous au magasin ou au fabricant, avec le reçu.</b>' },
    { type: 'match', title: '« JEU A PECHE » : c’était quoi, et acheté quand?', lines: [{ code: 'NAPPE TABLE', w: 160 }, { code: 'JEU A PECHE', w: 170, hl: true }, { code: 'CHANDELLE', w: 220 }, { code: 'LIVRE', w: 320 }], text: 'Un vrai reçu Dollarama. Sans le reçu, pas de date. Sans date, pas de 30 jours.' },
    { type: 'cta', title: 'L’app ReFound garde le reçu, la date et le produit', example: { kit: 'dollarama', ix: 12, l1: 'Sur le reçu', l2: 'Dans l’app ReFound' }, text: 'Gratuit, iPhone et Android. Téléchargez-la avant vos achats des Fêtes.' }] },
  en: { src: 'Sources: dollarama.com, opc.gouv.qc.ca · checked Nov. 19, 2026', slides: [
    { type: 'hook', title: 'Dollarama: no exchanges, no returns', text: 'It’s written in its policy. <b>Except one case.</b>' },
    { type: 'stat', stat: '30 days', size: 200, title: 'to report a defective or damaged item', text: 'Counted from the purchase date.' },
    { type: 'list', title: 'How to report it', items: [
      ['Picture of the product', 'Defective or damaged'], ['Picture of the original packaging', 'Keep it 30 days'], ['“Contact us” form', 'On dollarama.com']],
      text: '<b>Keep the receipt: it proves the date.</b> Bought in store? Ask at the counter too.' },
    { type: 'text', title: 'Defective? In Quebec, the law protects you too', text: 'Legal warranty: an item must last a reasonable time. <b>Even after 30 days, go to the store or the manufacturer, with the receipt.</b>' },
    { type: 'match', title: '“JEU A PECHE”: what was it, and bought when?', lines: [{ code: 'NAPPE TABLE', w: 160 }, { code: 'JEU A PECHE', w: 170, hl: true }, { code: 'CHANDELLE', w: 220 }, { code: 'LIVRE', w: 320 }], text: 'A real Dollarama receipt. No receipt, no date. No date, no 30 days.' },
    { type: 'cta', title: 'The ReFound app keeps the receipt, the date and the product', example: { kit: 'dollarama', ix: 12, l1: 'On the receipt', l2: 'In the ReFound app' }, text: 'Free, iPhone and Android. Get it before your holiday shopping.' }] }
};
