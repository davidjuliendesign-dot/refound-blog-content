// Contenu du carrousel (rendu : node tools/render-carousel.js rappel-produit-recu social/rappel-produit-recu)
// v4 après 2 rondes de validation par 3 personas (Julie 38 ans, Samuel 26 ans, Gilles 63 ans) :
// produit nommé et précisé (électrique à fil), action et question du reçu réglées tout de suite, reçu dessiné,
// plan B sans reçu, problème du papier qui pâlit, puis ce que fait ReFound avec un exemple réel du kit.
// Faits : avis de Santé Canada (rappel élargi du 11 mars 2025) ; l'avis ne parle pas du reçu.
module.exports = {
  fr: { src: 'Source : Santé Canada, rappel élargi du 11 mars 2025 · vérifié le 18 nov. 2026', slides: [
    { type: 'stat', eyebrow: 'Rappel · Canadian Tire', stat: '6 ans', title: 'après l’achat : souffleuse électrique Yardworks rappelée', text: 'Modèle 060-0583, à fil, 22 po. Vendue de mars 2019 à décembre 2021. Le fil peut casser sous <span style="white-space:nowrap">-20 °C</span>.' },
    { type: 'text', eyebrow: 'C’est la vôtre?', title: 'Remboursement complet', text: 'Rapportez-la dans <b>n’importe quel magasin Canadian Tire</b>. L’avis ne parle pas du reçu : apportez-le si vous l’avez, il prouve votre modèle et votre date d’achat.<br><br>Info : <span style="white-space:nowrap">1-800-387-8803</span>' },
    { type: 'match', eyebrow: 'Comment vérifier', title: 'Le numéro est sur le reçu', text: 'Cherchez <b style="white-space:nowrap">060-0583</b> au début d’une ligne. Plus de reçu? Lisez l’étiquette de la machine ou appelez Canadian Tire.',
      lines: [{ code: '052-2124', w: 250 }, { code: '060-0583', w: 280, hl: true }, { code: '184-2003', w: 200 }] },
    { type: 'stat', eyebrow: 'Le vrai problème', stat: '90 jours', size: 200, title: 'pour un retour. Votre reçu tiendra-t-il 6 ans?', text: 'Le papier thermique pâlit avec le temps. Le jour d’un rappel, il peut être illisible.' },
    { type: 'cta', eyebrow: 'Gratuit · iPhone et Android', title: 'Une copie lisible, même si le papier pâlit', text: 'Prenez le reçu en photo : ReFound le garde et affiche le vrai nom du produit.',
      example: { kit: 'canadian-tire', ix: 0, l1: 'Exemple : un vrai reçu dit', l2: 'ReFound affiche' } }] },
  en: { src: 'Source: Health Canada, expanded recall of March 11, 2025 · checked Nov. 18, 2026', slides: [
    { type: 'stat', eyebrow: 'Recall · Canadian Tire', stat: '6 years', size: 220, title: 'after purchase: Yardworks electric snowblower recalled', text: 'Model 060-0583, corded, 22 in. Sold March 2019 to December 2021. The cord can break below <span style="white-space:nowrap">-20 °C</span>.' },
    { type: 'text', eyebrow: 'Is it yours?', title: 'Full refund', text: 'Bring it to <b>any Canadian Tire store</b>. The notice doesn’t mention the receipt: bring it if you have it, it proves your model and purchase date.<br><br>Info: <span style="white-space:nowrap">1-800-387-8803</span>' },
    { type: 'match', eyebrow: 'How to check', title: 'The number is on the receipt', text: 'Look for <b style="white-space:nowrap">060-0583</b> at the start of a line. No receipt? Read the label on the machine or call Canadian Tire.',
      lines: [{ code: '052-2124', w: 250 }, { code: '060-0583', w: 280, hl: true }, { code: '184-2003', w: 200 }] },
    { type: 'stat', eyebrow: 'The real problem', stat: '90 days', size: 200, title: 'to return it. Will your receipt last 6 years?', text: 'Thermal paper fades over time. By the time of a recall, it may be unreadable.' },
    { type: 'cta', eyebrow: 'Free · iPhone and Android', title: 'A readable copy, even when the paper fades', text: 'Snap the receipt: ReFound keeps it and shows the real product name.',
      example: { kit: 'canadian-tire', ix: 0, l1: 'Example: a real receipt says', l2: 'ReFound shows', name: 'VIC Fused wood street hockey stick, junior, 40 in' } }] }
};
