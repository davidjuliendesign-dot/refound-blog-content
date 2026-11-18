// Contenu du carrousel (rendu : node tools/render-carousel.js politique-retour-tigre-geant social/politique-retour-tigre-geant)
module.exports = {
  fr: { src: 'Source : centre d’aide Tigre Géant · vérifié le 17 nov. 2026', slides: [
    { type: 'hook', eyebrow: 'Tigre Géant', title: 'Un retour <em>sans date limite</em>?', text: 'Oui, chez Tigre Géant. À une condition : garder le reçu.' },
    { type: 'text', eyebrow: 'Les conditions', title: 'Pas de date, mais des règles', text: 'Reçu ou courriel de confirmation exigé. Ventes fermes : tabac, alcool, loterie, sous-vêtements, matelas, masques, cartes-cadeaux.' },
    { type: 'stat', eyebrow: 'Sans reçu', stat: '3 fois', title: 'par année, au maximum', text: 'Une carte-cadeau, valable seulement dans ce magasin, avec une pièce d’identité.' },
    { type: 'receipt', kit: 'tigre-geant', eyebrow: 'Un reçu réel du 19 juillet 2026', title: 'Date limite : aucune',
      rows: [[3, 'Aucune date limite', 'var(--green)'], [7, 'Aucune date limite', 'var(--green)']] },
    { type: 'text', eyebrow: 'Le vrai problème', title: 'Le reçu doit durer aussi longtemps', text: 'Le papier thermique pâlit. Sans reçu lisible, pas de remboursement en argent.' },
    { type: 'cta', eyebrow: 'Le jour de l’achat', title: 'Gardez vos reçus avec ReFound', text: 'Une copie lisible, avec la date, le magasin et le montant, retrouvable quand vous en avez besoin.' }] },
  en: { src: 'Source: Giant Tiger help centre · checked Nov. 17, 2026', slides: [
    { type: 'hook', eyebrow: 'Giant Tiger', title: 'A return with <em>no time limit</em>?', text: 'Yes, at Giant Tiger. On one condition: keep the receipt.' },
    { type: 'text', eyebrow: 'The conditions', title: 'No deadline, but rules', text: 'Receipt or confirmation email required. Final sale: tobacco, alcohol, lottery, underwear, mattresses, masks, gift cards.' },
    { type: 'stat', eyebrow: 'No receipt', stat: '3 times', title: 'a year, at most', text: 'A gift card, valid only at that store, with ID.' },
    { type: 'receipt', kit: 'tigre-geant', eyebrow: 'A real receipt, July 19, 2026', title: 'Return deadline: none',
      names: { 3: 'Silk unsweetened almond beverage, 946 ml', 7: 'Club House ranch dressing and dip mix, 28 g' },
      rows: [[3, 'No deadline', 'var(--green)'], [7, 'No deadline', 'var(--green)']] },
    { type: 'text', eyebrow: 'The real problem', title: 'The receipt has to last', text: 'Thermal paper fades. Without a readable receipt, no cash refund.' },
    { type: 'cta', eyebrow: 'The day you buy', title: 'Keep your receipts with ReFound', text: 'A readable copy, with the date, store and amount, easy to find when you need it.' }] }
};
