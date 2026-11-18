# Carrousels pour les médias sociaux

Un carrousel par article publié, dans `social/<slug>/`. La routine le planifie dans Metricool
(Facebook, Instagram, et TikTok quand le carrousel de photos est possible), au meilleur créneau de
chaque réseau, jamais en publication immédiate : David reçoit le contenu le matin et peut annuler ou
modifier dans Metricool. Sans Metricool, rien n'est publié : David les publie lui-même.

## Format
- 5 à 7 images, 1080 × 1350 (portrait 4:5), PNG, numérotées : `fr-01.png` … et `en-01.png` …
- `caption.md` : la légende FR et EN (2 à 4 phrases, un appel à l'action, 3 à 5 mots-clics),
  plus le lien vers l'article.
- Image 1 : une accroche claire (une question ou un chiffre). Dernière image : « Gardez vos reçus
  avec ReFound » + le lien du site (pas de faux bouton App Store).
- Chaque image se lit seule, en grand (titre ≤ 8 mots, texte ≤ 25 mots), aux couleurs de
  `tools/brand.md`.

## Contenu
- Tiré de l'article du jour et, quand c'est utile, d'un reçu de `kit/receipts.json` : la ligne
  imprimée, puis le produit identifié avec sa photo, puis la date limite de retour ou la garantie.
- Mêmes règles d'exactitude que les articles (`facts/product.md`, sources de l'article).
- Regarder chaque PNG avant de pousser.
