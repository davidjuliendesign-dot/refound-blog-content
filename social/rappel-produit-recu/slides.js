// Contenu du carrousel (rendu : node tools/render-carousel.js rappel-produit-recu social/rappel-produit-recu)
module.exports = {
  fr: { src: 'Sources : Santé Canada, IKEA · vérifié le 18 nov. 2026', slides: [
    { type: 'hook', eyebrow: 'Rappel de produit', title: 'Un rappel <em>6 ans</em> après l’achat?', text: 'C’est arrivé à une souffleuse à neige vendue chez Canadian Tire. Votre reçu sert encore.' },
    { type: 'text', eyebrow: '8 avis de rappel comparés', title: 'Faut-il le reçu?', text: '<b>Pas toujours.</b> 2 avis précisent qu’aucune preuve d’achat n’est requise. Les 6 autres n’en parlent pas.' },
    { type: 'stat', eyebrow: '4 rappels Canadian Tire', stat: '14 mois<br>à 6 ans', title: 'entre l’achat et l’avis', text: 'Le délai de retour, lui : 90 jours.' },
    { type: 'text', eyebrow: 'Le reçu', title: 'Le numéro est sur votre reçu', text: 'Chez Canadian Tire, les avis citent un numéro au même format que le reçu, comme <b>043-5105</b>.' },
    { type: 'text', eyebrow: 'Le produit', title: 'Le lot est sur l’étiquette', text: 'Lot, poinçon de date, CUP : vérifiez l’étiquette, puis appelez le numéro de l’avis avant de vous déplacer.' },
    { type: 'cta', eyebrow: 'Avant le prochain rappel', title: 'Gardez vos reçus avec ReFound', text: 'Une copie lisible, avec le numéro d’article et la date. Pour les alertes de rappel : abonnez-vous à Santé Canada.' }] },
  en: { src: 'Sources: Health Canada, IKEA · checked Nov. 18, 2026', slides: [
    { type: 'hook', eyebrow: 'Product recall', title: 'A recall <em>6 years</em> after you bought it?', text: 'It happened to a snowblower sold at Canadian Tire. Your receipt still matters.' },
    { type: 'text', eyebrow: '8 recall notices compared', title: 'Do you need the receipt?', text: '<b>Not always.</b> 2 notices say no proof of purchase is required. The other 6 don’t mention it.' },
    { type: 'stat', eyebrow: '4 Canadian Tire recalls', stat: '14 months<br>to 6 years', size: 170, title: 'between purchase and notice', text: 'The return window: 90 days.' },
    { type: 'text', eyebrow: 'The receipt', title: 'The number is on your receipt', text: 'At Canadian Tire, notices list a number in the same format as the receipt, like <b>043-5105</b>.' },
    { type: 'text', eyebrow: 'The product', title: 'The batch is on the label', text: 'Batch, date stamp, UPC: check the label, then call the number in the notice before you go.' },
    { type: 'cta', eyebrow: 'Before the next recall', title: 'Keep your receipts with ReFound', text: 'A readable copy, with the item number and date. For recall alerts, subscribe to Health Canada.' }] }
};
