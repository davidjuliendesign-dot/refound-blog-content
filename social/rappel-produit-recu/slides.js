// Contenu du carrousel (rendu : node tools/render-carousel.js rappel-produit-recu social/rappel-produit-recu)
// Structure (social/README.md) : accroche → réponse → valeur (3 diapos) → reçu réel → diapo « à garder » → fin.
module.exports = {
  fr: { src: 'Sources : Santé Canada, IKEA, Canadian Tire · vérifié le 18 nov. 2026', slides: [
    { type: 'hook', eyebrow: 'Rappel de produit', title: 'Un rappel <em>6 ans</em> après l’achat?', text: 'Une souffleuse vendue chez Canadian Tire dès mars 2019 a été visée par un rappel élargi en mars 2025.' },
    { type: 'text', eyebrow: 'La réponse courte', title: 'Faut-il le reçu? Pas toujours.', text: 'Sur 8 avis de rappel réels, <b>2 disent qu’aucune preuve d’achat n’est requise</b>. Les 6 autres n’en parlent pas.' },
    { type: 'stat', eyebrow: '4 rappels Canadian Tire', stat: '14 mois<br>à 6 ans', title: 'entre l’achat et l’avis', text: 'Le délai de retour, lui : 90 jours.' },
    { type: 'text', eyebrow: 'Sans reçu', title: 'La carte ne suffit plus après 90 jours', text: 'Chez Canadian Tire, la recherche de reçu retrouve les achats par carte de crédit ou de débit dans les 90 jours. Après, il reste votre reçu.' },
    { type: 'text', eyebrow: 'Le bon numéro', title: 'Le numéro est sur votre reçu', text: 'Les avis de rappel Canadian Tire citent un numéro au même format que les numéros d’article des reçus, comme <b style="white-space:nowrap">043-5105</b>.' },
    { type: 'receipt', kit: 'canadian-tire', eyebrow: 'Un reçu réel Canadian Tire', title: 'Ce que vous compareriez',
      rows: [[0, 'N° 083-5519-0', 'var(--gold)'], [7, 'N° 058-0070-6', 'var(--gold)']] },
    { type: 'list', eyebrow: 'À garder', title: 'Produit rappelé : 4 vérifications', items: [
      ['Cessez de l’utiliser', 'Tous les avis le demandent.'],
      ['Vérifiez l’étiquette', 'Modèle, lot, poinçon de date ou CUP.'],
      ['Retrouvez le reçu', 'Il prouve la date et le lieu d’achat.'],
      ['Appelez avant d’y aller', 'Le numéro est dans l’avis.']] },
    { type: 'cta', eyebrow: 'Avant le prochain rappel', title: 'Gardez vos reçus avec ReFound', text: 'Une copie lisible, avec le numéro d’article et la date. Pour les alertes de rappel : abonnez-vous à Santé Canada.' }] },
  en: { src: 'Sources: Health Canada, IKEA, Canadian Tire · checked Nov. 18, 2026', slides: [
    { type: 'hook', eyebrow: 'Product recall', title: 'A recall <em>6 years</em> after you bought it?', text: 'A snowblower sold at Canadian Tire from March 2019 was covered by an expanded recall in March 2025.' },
    { type: 'text', eyebrow: 'The short answer', title: 'Need the receipt? Not always.', text: 'Of 8 real recall notices, <b>2 say no proof of purchase is required</b>. The other 6 don’t mention it.' },
    { type: 'stat', eyebrow: '4 Canadian Tire recalls', stat: '14 months<br>to 6 years', size: 170, title: 'between purchase and notice', text: 'The return window: 90 days.' },
    { type: 'text', eyebrow: 'No receipt', title: 'Your card won’t help after 90 days', text: 'At Canadian Tire, receipt look-up finds credit or debit card purchases within 90 days. After that, only your receipt is left.' },
    { type: 'text', eyebrow: 'The right number', title: 'The number is on your receipt', text: 'Canadian Tire recall notices list a number in the same format as receipt item numbers, like <b style="white-space:nowrap">043-5105-0</b>.' },
    { type: 'receipt', kit: 'canadian-tire', eyebrow: 'A real Canadian Tire receipt', title: 'What you would compare',
      names: { 0: 'VIC Fused wood street hockey stick, junior, 40 in', 7: 'Mag-Torch odourized butane refill, 160 g' },
      rows: [[0, 'No. 083-5519-0', 'var(--gold)'], [7, 'No. 058-0070-6', 'var(--gold)']] },
    { type: 'list', eyebrow: 'Save this', title: 'Recalled product: 4 checks', items: [
      ['Stop using it', 'Every notice asks for this.'],
      ['Check the label', 'Model, batch, date stamp or UPC.'],
      ['Find the receipt', 'It proves when and where you bought it.'],
      ['Call before you go', 'The number is in the notice.']] },
    { type: 'cta', eyebrow: 'Before the next recall', title: 'Keep your receipts with ReFound', text: 'A readable copy, with the item number and date. For recall alerts, subscribe to Health Canada.' }] }
};
