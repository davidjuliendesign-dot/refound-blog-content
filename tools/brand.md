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
