// Carrousel de saison (Vendredi fou, 27 nov. 2026) tiré de l'article politique-retour-canadian-tire, fait le 23 nov. 2026 à la place du carrousel
// Reitmans (article du jour), jugé trop pointu par les personas (5,5 / 4 / 5 : « pas mon magasin »).
// Rendu : cd tools && node render-carousel.js politique-retour-canadian-tire ../social/politique-retour-canadian-tire
// Faits revérifiés le 23 nov. 2026 (canadiantire.ca/fr et /en customer-service/returns.html, verbatim) : 90 jours, non ouvert, emballage d'origine, reçu ;
// « Les trottinette électrique et les articles électroniques (audio et vidéo pour la maison, audio et vidéo personnels, appareils photo, caméras et
// accessoires de communication) doivent être retournés dans les 30 jours » ; électronique pour l'auto : 14 jours de la date d'achat ; aucune
// prolongation des Fêtes ; « Exceptions à la politique de retours lors des Fêtes » : décorations de Noël et d'Halloween « peuvent être soumises à des
// restrictions de retour » ; pièce d'identité avec photo « pourrait être exigée » ; recherche de reçu sans reçu.
// Garantie légale : opc.gouv.qc.ca/garanties (« usage normal pendant une durée raisonnable »), vérifié le 23 nov. 2026. Recherche de reçu : page EN, « credit or debit card purchases within 90 days ».
// Ronde 3 : 8,5 / 8 / 8,5 ; pied de page avec l'OPC (source de la diapo 3).
// v2 après la ronde 2 (7,5 / 7 / 7,5) : jours + dates sur la diapo 2, diapo « aucune prolongation » remplacée par la garantie légale (demandé par Gilles), carte précisée.
// Calculs ReFound : 27 nov. + 14 j = 11 déc. ; + 30 j = 27 déc. ; + 90 j = 25 févr. 2027.
module.exports = {
  fr: { src: 'Sources : canadiantire.ca (retours), opc.gouv.qc.ca · vérifié le 23 nov. 2026', slides: [
    { type: 'stat', stat: '14, 30 ou 90', size: 170, title: 'jours pour rapporter un achat du Vendredi fou chez Canadian Tire', text: 'Ça dépend de ce que vous achetez. <b>Voici vos dates.</b>' },
    { type: 'list', plain: true, title: 'Acheté le 27 novembre?', items: [
      ['14 jours → 11 déc. : électronique pour l’auto', 'Démarreur à distance, caméra de recul, GPS'], ['30 jours → 27 déc. : électronique', 'Télé, écouteurs, appareil photo, trottinette électrique'], ['90 jours → 25 févr. 2027 : le reste', 'La plupart des articles, non ouverts']] },
    { type: 'text', title: 'Il brise après la date limite?', text: 'Au Québec, la garantie légale protège encore un bien défectueux. <b>Le reçu prouve la date et le prix.</b>' },
    { type: 'list', title: 'Pour que le retour passe', items: [
      ['Non ouvert', 'Dans l’emballage d’origine'], ['Le reçu', 'Sans reçu : le magasin peut chercher un achat payé par carte de crédit ou de débit'], ['Une pièce d’identité', 'Elle peut être exigée']] },
    { type: 'text', title: 'En février, votre reçu sera-t-il encore lisible?', text: 'Le papier d’un reçu pâlit. <b>Le jour du retour, c’est lui qu’on vous demande.</b>' },
    { type: 'cta', title: 'Prenez vos reçus en photo en rentrant', text: 'L’app ReFound les garde lisibles, même si le papier pâlit, et les sort au comptoir. <b>Gratuit, iPhone et Android : téléchargez-la avant le Vendredi fou.</b>' }] },
  en: { src: 'Sources: canadiantire.ca (returns), opc.gouv.qc.ca · checked Nov. 23, 2026', slides: [
    { type: 'stat', stat: '14, 30 or 90', size: 170, title: 'days to return a Black Friday buy at Canadian Tire', text: 'It depends on what you buy. <b>Here are your dates.</b>' },
    { type: 'list', plain: true, title: 'Bought on November 27?', items: [
      ['14 days → Dec 11: auto electronics', 'Remote starter, backup camera, GPS'], ['30 days → Dec 27: electronics', 'TV, headphones, camera, e-scooter'], ['90 days → Feb 25, 2027: everything else', 'Most items, unopened']] },
    { type: 'text', title: 'It breaks after the deadline?', text: 'In Quebec, the legal warranty still covers defective goods. <b>The receipt proves the date and price.</b>' },
    { type: 'list', title: 'To make the return go through', items: [
      ['Unopened', 'In the original packaging'], ['The receipt', 'No receipt: the store can look up a credit or debit card purchase'], ['Photo ID', 'It may be required']] },
    { type: 'text', title: 'In February, will your receipt still be readable?', text: 'Receipt paper fades. <b>On return day, that’s the one they ask for.</b>' },
    { type: 'cta', title: 'Snap your receipts when you get home', text: 'The ReFound app keeps them readable, even if the paper fades, and brings them up at the counter. <b>Free, iPhone and Android: get it before Black Friday.</b>' }] }
};
