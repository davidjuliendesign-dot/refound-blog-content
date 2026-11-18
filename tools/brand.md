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

`render-cadeaux-noel.js` : `deadlines()` (un même achat comparé entre marchands sur un axe de vraies dates : barre de la date d'achat à la date limite, jours sans retour hachurés par ligne, ligne verticale repère comme Noël) et une couverture sans texte dépendant de la langue (boîte-cadeau, reçu-cadeau sans prix, dates). Réutilisable pour toute comparaison de dates limites entre magasins.

`render-garantie-prolongee.js` : `pairs()` (deux barres par ligne à l'échelle en années : garantie gratuite pleine vs plan payant en pointillé, avec un verdict coloré sous l'étiquette ; utile pour toute comparaison « gratuit vs payant »), `milestones()` (échéances datées sur une ligne verticale, pour des délais de natures différentes qu'on ne peut pas mettre à l'échelle ensemble, ex. 10 jours et 4 ans) et une couverture sans texte dépendant de la langue (deux barres qui se chevauchent).

`render-combien-temps-recus.js` : `spans()` (une ligne par article, à l'échelle en années : délai de retour en doré mince par-dessus la garantie en émeraude, durée inconnue en pointillé avec « ? » ; utile pour « combien de temps garder un reçu »), `dates()` (variante compacte de `milestones()` pour 6 jalons avec l'article concerné) et une couverture sans texte (reçu qui pâlit + ligne du temps graduée).

`render-decathlon.js` : `deadlines()` de Noël avec repère vertical optionnel (`marker: null`) et étiquette placée à l'intérieur de la barre quand elle finit à plus de 80 % de l'axe (axe long, ex. 365 jours), et une barre de longueur nulle pour « Aucun retour » ; `dates()` (jalons d'un même achat : ajustement de prix, retour, garantie) ; couverture sans texte (reçu « 30 » vs carte membre « 365 »). Utile pour tout marchand dont le délai dépend du statut membre.

`render-reclamation-garantie.js` : `contacts()` (protections d'un même achat sur un axe de vraies dates, avec « à qui s'adresser » sous chaque libellé ; trois styles de barre : pleine pour une date de fin connue, pointillée en fondu pour « durée selon la marque », dégradé pour « durée raisonnable ») et une couverture sans texte (un reçu relié à trois destinations : magasin, fabricant, loi). Utile pour tout article « qui contacter et jusqu'à quand ».

`render-tigre-geant.js` : `unlimited()` (délais de retour à l'échelle en jours sur un axe 0-365, plus une zone hachurée « sans limite » au-delà de l'axe où une politique sans date limite s'affiche en barre dégradée avec flèche ; utile pour comparer une politique sans délai à des délais chiffrés) et une couverture sans texte (∞, reçu qui pâlit, ligne du temps en années qui se prolonge).

`render-rappel-produit.js` : `gap()` (écart entre l'achat et un événement, ex. avis de rappel, à l'échelle en mois avec ticks en années, et une fenêtre courte dorée superposée, ex. délai de retour de 90 jours), `where()` (deux colonnes « sur le reçu » / « sur le produit » reliées par un identifiant commun au centre) et une couverture sans texte (reçu fictif aux lignes floutées, loupe, triangle d'alerte).
