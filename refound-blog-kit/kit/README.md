# Kit de reçus d'exemple

De vrais reçus de David (un par magasin), déjà nettoyés, à utiliser comme exemples dans les articles
et les carrousels : ligne imprimée → produit identifié → garantie → date limite de retour.

- `selection.json` : la liste des reçus retenus (slug, magasin, date). David ou Claude Code la modifie.
- `receipts.json` : les données de ces reçus, régénérées à partir de `selection.json`.

## Ce que contient chaque reçu
`store`, `city` (ville seulement), `date`, `type`, `category`, `subtotal`, `tax`, `total`,
`returnDeadline`, et `items[]` :
- `printed` : la ligne telle qu'imprimée sur le reçu (ex. « BAT VIC FUS HR ») ;
- `name`, `brand` : le produit identifié par ReFound (`enriched: true`) ;
- `productCode`, `quantity`, `unitPrice`, `total`, `regularPrice`, `discount`, `isReturn` ;
- `category`, `subcategory` ;
- `productUrl` : la fiche du produit chez le marchand ;
- `image` : la photo du produit (URL publique, utilisable dans un visuel) ;
- `warranty` : `duration`, `type`, `coverage`, quand elle est connue.

## Ce qui n'y est volontairement PAS (ne jamais le recréer)
Photo du reçu, code-barres ou numéro de transaction, chiffres de carte, numéros d'autorisation ou de
fidélité, adresse de rue du magasin, nom de David. Quand un visuel montre un reçu, le dessiner
(gabarits de `tools/`) avec les lignes du kit, et des zones grises à la place de ces éléments.

## Règles
- Utiliser les données telles quelles : ne pas inventer d'articles, de prix ni de garanties.
- Dire « un reçu réel » ou « un de nos reçus de test », jamais « le reçu de David ».
- Les dates limites de retour de 2053 (ex. Tigre Géant) signifient « aucune date limite » : l'écrire ainsi.
