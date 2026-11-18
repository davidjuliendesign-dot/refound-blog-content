// Contenu du carrousel (rendu : node tools/render-carousel.js politique-retour-rona social/politique-retour-rona)
module.exports = {
  fr: { src: 'Reçu réel RONA+ numérisé avec ReFound · rona.ca', slides: [
    { type: 'hook', eyebrow: 'Reçu RONA', title: '90 jours… ou <em>à vie</em>?', text: 'Sur un seul reçu RONA+, le retour finit en juillet. Certaines garanties, jamais.' },
    { type: 'receipt', kit: 'rona-plus', eyebrow: 'Un reçu réel du 19 avril 2026', title: 'Ce que la ligne cache',
      rows: [[7, 'Garantie à vie', 'var(--green)'], [3, '15 ans · jusqu’en 2041', 'var(--green)'], [9, '5 ans · jusqu’en 2031', '#5FD3AE']] },
    { type: 'stat', eyebrow: 'Retour', stat: '18 juil.', title: 'Date limite de retour estimée', text: '90 jours après l’achat : la politique générale de RONA. Les exceptions par catégorie sont sur rona.ca.' },
    { type: 'text', eyebrow: 'Le problème', title: 'Le reçu ne le dit pas', text: '« SCELLANT SILICONE+P/F BC 300ML » : ni la marque, ni la garantie à vie. Et le papier pâlit.' },
    { type: 'text', eyebrow: 'Ce que fait ReFound', title: 'La ligne devient un produit', text: 'Nom réel, photo, lien et garantie avec sa date de fin, quand l’information est disponible.' },
    { type: 'cta', eyebrow: 'Après les travaux', title: 'Gardez vos reçus avec ReFound', text: 'Numérisez le reçu le jour de l’achat. Les conditions du fabricant font foi.' }] },
  en: { src: 'Real RONA+ receipt scanned with ReFound · rona.ca', slides: [
    { type: 'hook', eyebrow: 'RONA receipt', title: '90 days… or <em>lifetime</em>?', text: 'On a single RONA+ receipt, the return ends in July. Some warranties never do.' },
    { type: 'receipt', kit: 'rona-plus', eyebrow: 'A real receipt, April 19, 2026', title: 'What the line hides',
      names: { 7: 'DAP Silicone Plus white door and window sealant, 300 ml', 3: 'Saman water-based interior wood varnish, satin, 472 ml', 9: 'VALU+ ultra alkaline AA batteries, 16-pack' },
      rows: [[7, 'Lifetime warranty', 'var(--green)'], [3, '15 years · until 2041', 'var(--green)'], [9, '5 years · until 2031', '#5FD3AE']] },
    { type: 'stat', eyebrow: 'Return', stat: 'July 18', title: 'Estimated return deadline', text: '90 days after purchase: RONA’s general policy. Category exceptions are on rona.ca.' },
    { type: 'text', eyebrow: 'The problem', title: 'The receipt doesn’t say', text: '“SCELLANT SILICONE+P/F BC 300ML”: no brand, no lifetime warranty. And the paper fades.' },
    { type: 'text', eyebrow: 'What ReFound does', title: 'The line becomes a product', text: 'Real name, photo, link and warranty with its end date, when the information is available.' },
    { type: 'cta', eyebrow: 'After the project', title: 'Keep your receipts with ReFound', text: 'Scan the receipt the day you buy. The manufacturer’s terms apply.' }] }
};
