# Visuels du blog ReFound

Thème du blog (sombre) :

| Rôle | Hex |
|---|---|
| Fond | #14181F |
| Texte | #F0F2F5 |
| Carte | #1D222A |
| Bordure | #272C34 |
| Texte secondaire | #8491A4 |
| Émeraude (principal) | #1EB885 |
| Doré (accent) | #F6B828 |

Polices : Funnel Display (titres, 700/800), DM Sans (texte, 400/500/700).
Logo clair pour fond sombre : `tools/assets/logo-refound-light.png`.

## Produire les images

```bash
cd tools
mkdir -p fonts && cd fonts && npm pack @fontsource/dm-sans @fontsource/funnel-display --silent \
  && for f in *.tgz; do tar xzf "$f" && mv package "${f%.tgz}"; done && cd ..
node render-example.js ../posts/<slug>/images   # adapter les gabarits cover() / timeline()
```

`render-example.js` (Playwright) contient deux gabarits : couverture 1200×630 et graphique 1200×675. Les copier et adapter pour chaque article.

## Règles

- Couverture 1200×630, sans texte dépendant de la langue si possible (elle sert en FR et EN).
- Visuels dans le texte 1200×675, une version FR et une version EN quand ils contiennent du texte.
- Données uniquement tirées de la fiche de faits ; source et date de vérification dans le visuel.
- Graphiques à l'échelle (barres et axes proportionnels).
- Pas de fausse capture d'écran de l'app ReFound, pas de logo de marchand, pas de vrai reçu avec données personnelles.
- Vérifier chaque image rendue avant de pousser (chevauchements, texte coupé).

## Gabarits supplémentaires

`render-home-depot.js` : `windows()` (délais de retour à l'échelle, avec une ligne « aucun retour ») et `vsWarranty()` (délai de retour vs garantie de bon fonctionnement, à l'échelle en années). Réutilisables pour d'autres marchands en changeant les données.

`render-ikea.js` : `windows()` utilisé deux fois, en jours (délais de retour) et en années (retour vs garanties du marchand). Montre comment réutiliser le gabarit avec une autre unité.

`render-rona.js` : `windows()` en jours (avec une ligne « 1 an ») et `vsWarranty()` avec une couleur par ligne (5e élément) et une 3e légende `lw2`, pour mêler garantie de bon fonctionnement et garantie du fabricant.

`render-walmart.js` : `calendar()` (délais sur un axe de vraies dates, barre normale dorée + prolongation émeraude, ligne pointillée sur une date repère ; ex. retours des Fêtes) et `vsWarranty()`. Réutilisable pour toute politique de retour des Fêtes en changeant les dates.

`render-costco.js` : `windows()` pour comparer un même délai entre marchands (ex. téléviseur chez Costco, Walmart, Home Depot) et `layers()` (couches de protection d'un même achat sur une ligne du temps en années : retour, fabricant, prolongation du marchand, garantie de bon fonctionnement, avec la date de fin à droite de chaque barre).

`render-garantie-bon-fonctionnement.js` : `layers()` (copie corrigée : l'étiquette d'une barre longue reste à l'intérieur de la barre) pour les dates de fin d'une garantie à l'échelle, et `twoDates()` (gros plan sur quelques semaines avec deux jalons datés et la preuve de chaque date, puis ligne du temps complète à l'échelle avec une fin « fantôme » en pointillé). Réutilisable pour toute garantie qui part d'une autre date que l'achat.

`render-retour-sans-recu.js` : `layers()` avec une surcharge `COMPACT` (5 lignes, titre plus petit) pour comparer une fenêtre courte en jours (ex. recherche de reçu de 90 jours) à des garanties en années, et une couverture sans texte dépendant de la langue (reçu manquant en pointillé + carte de paiement).

`render-sports-experts.js` : `segments()` (délais sur un axe de vraies dates avec plusieurs segments par ligne : remboursement en doré, échange seulement en émeraude, période non précisée en pointillé, et zones hachurées pour les jours sans retour, ex. Vendredi fou). Utile pour tout marchand qui a deux délais (remboursement / échange) ou des jours bloqués.

`render-best-buy.js` : `calendar()` de Walmart réutilisé pour montrer la règle « la date la plus tardive » (prolongation des Fêtes vs délai normal, avec des achats après la date de bascule) et `vsWarranty()` sur un axe de 6 ans (gros électroménagers).
