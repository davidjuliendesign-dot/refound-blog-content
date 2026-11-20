// NON PLANIFIÉ (20 nov. 2026) : personas 4,5 / 3 / 6,5 en ronde 1, sujet trop pointu (propriétaires seulement). Remplacé par social/ajustement-de-prix.
// Carrousel tiré de l'article politique-retour-bmr, section « Souffleuse à neige neuve » (sujet de saison plus large que BMR seul).
// Rendu : cd tools && node render-carousel.js politique-retour-bmr ../social/politique-retour-bmr
// Faits vérifiés le 20 nov. 2026 : Canadian Tire (équipement à essence pour l'extérieur, dont souffleuses : 30 jours, neuf, inutilisé,
// emballage d'origine ; utilisé : réparé selon la garantie du fabricant ; délai général 90 jours) ; Home Depot (équipements au gaz :
// 30 jours suivant l'achat avec reçu ; souffleuses à batterie et à fil : 30 jours ; usagés : réparés selon la garantie du fabricant ;
// délai général 90 jours) ; BMR.ca (équipement de travail extérieur rempli d'essence non remboursable) ; OPC (garantie légale).
module.exports = {
  fr: { src: 'Sources : canadiantire.ca, homedepot.ca, bmr.ca, opc.gouv.qc.ca · vérifié le 20 nov. 2026', slides: [
    { type: 'hook', title: 'Souffleuse neuve? Attendez avant le premier plein.', text: 'Après, <b>le retour n’est souvent plus possible.</b>' },
    { type: 'stat', stat: '30 jours', size: 200, title: 'pour retourner une souffleuse, pas 90', text: 'Chez Canadian Tire et Home Depot. Et elle doit être <b>neuve, jamais utilisée.</b>' },
    { type: 'list', plain: true, title: 'Souffleuse à essence : la règle', items: [
      ['Canadian Tire', '30 jours · neuve, inutilisée, emballage d’origine'],
      ['Home Depot', '30 jours après l’achat · avec le reçu'],
      ['BMR.ca', 'Remplie d’essence = plus remboursable']] },
    { type: 'list', title: 'Avant le plein, vérifiez', items: [
      ['Le bon modèle', 'Largeur, démarreur, roues ou chenilles'], ['Les pièces incluses', 'Tout est dans la boîte?'], ['L’emballage d’origine', 'Gardez-le 30 jours']] },
    { type: 'text', title: 'Elle a servi et elle brise?', text: 'Ce n’est plus un retour : c’est la garantie. <b>Au Québec, la garantie légale s’ajoute. Gardez la facture : elle prouve la date.</b>' },
    { type: 'cta', title: 'L’app ReFound garde la facture de votre souffleuse', text: 'Gratuit, iPhone et Android. Prenez la photo en rentrant du magasin.' }] },
  en: { src: 'Sources: canadiantire.ca, homedepot.ca, bmr.ca, opc.gouv.qc.ca · checked Nov. 20, 2026', slides: [
    { type: 'hook', title: 'New snow blower? Wait before the first fill-up.', text: 'After that, <b>a return often isn’t possible.</b>' },
    { type: 'stat', stat: '30 days', size: 200, title: 'to return a snow blower, not 90', text: 'At Canadian Tire and Home Depot. And it must be <b>new and never used.</b>' },
    { type: 'list', plain: true, title: 'Gas snow blower: the rule', items: [
      ['Canadian Tire', '30 days · new, unused, original packaging'],
      ['Home Depot', '30 days from purchase · with the receipt'],
      ['BMR.ca', 'Filled with gas = no longer refundable']] },
    { type: 'list', title: 'Before filling it, check', items: [
      ['The right model', 'Width, starter, wheels or tracks'], ['Included parts', 'Is everything in the box?'], ['The original packaging', 'Keep it 30 days']] },
    { type: 'text', title: 'Used it and it broke?', text: 'That’s the warranty now, not a return. <b>In Quebec, the legal warranty applies too. Keep the invoice: it proves the date.</b>' },
    { type: 'cta', title: 'The ReFound app keeps your snow blower’s invoice', text: 'Free, iPhone and Android. Snap it when you get home from the store.' }] }
};
