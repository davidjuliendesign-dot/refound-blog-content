# Format d'un article (schemaVersion 1)

Un article = un dossier `posts/<slug>/` :

```
posts/<slug>/post.json      # contenu FR + EN, SEO, sources
posts/<slug>/images/*.png   # fichiers listés dans post.json > assets
```

URL brute d'un fichier :
`https://raw.githubusercontent.com/davidjuliendesign-dot/refound-blog-content/main/posts/<slug>/<fichier>`

Les images vont dans `webapp/public/images/blog/<slug>/` du site. Tous les `src` d'image dans `post.json` utilisent déjà ce chemin public (`/images/blog/<slug>/<fichier>`).

## Racine

| Champ | Type | Notes |
|---|---|---|
| `schemaVersion` | `1` | |
| `slug` | string | identifiant interne, = slug FR |
| `frPath` / `enPath` | string | `/blog/<slug-fr>` et `/en/blog/<slug-en>` |
| `datePublished` / `dateModified` | ISO 8601 | |
| `lastFactCheck` | `YYYY-MM-DD` | date de vérification des faits |
| `cover` | `{src, width, height}` | image vedette (carte, OG, haut d'article) |
| `assets` | string[] | fichiers dans `images/` à copier |
| `fr` / `en` | objet langue | voir ci-dessous |

## Objet langue

| Champ | Notes |
|---|---|
| `metaTitle`, `metaDescription`, `keywords` | SEO |
| `category`, `date`, `readingTime`, `breadcrumb`, `eyebrow`, `h1` | mêmes rôles que `BlogPost` actuel |
| `card` | `{title, subtitle}` pour la liste du blog (`articles.ts`) |
| `coverAlt` | texte alternatif de la couverture |
| `intro` | string[] — le premier paragraphe est la réponse directe |
| `sections` | `[{heading, blocks: Block[]}]` — `heading` = H2 |
| `faqTitle`, `faq` | `[{q, a}]` → accordéon + JSON-LD FAQPage (peut être vide) |
| `ctaTitle`, `ctaBody` | CTA contextuel |
| `relatedTitle`, `related` | `[{label, href, desc}]` |
| `sourcesTitle`, `sources` | `[{label, publisher, url, accessed}]` → liste en bas d'article |
| `factCheckLabel` | ex. « Faits vérifiés le 31 octobre 2026 », affiché près de la date |

## Blocs (`sections[].blocks[]`, rendus dans l'ordre)

| `type` | Champs | Rendu |
|---|---|---|
| `p` | `text` | paragraphe |
| `h3` | `text` | sous-titre H3 |
| `bullets` | `items: string[]` | liste à puces |
| `steps` | `items: string[]` | liste numérotée |
| `table` | `caption, headers: string[], rows: string[][]` | tableau HTML, défilement horizontal sur mobile |
| `figure` | `src, width, height, alt, caption` | image pleine largeur + légende |
| `callout` | `tone: "info" \| "warning", title, text` | encadré |

Texte inline (dans `text`, `items`, cellules, `a` de FAQ) : `[libellé](/chemin)` pour un lien interne, `[libellé](https://…)` pour un lien externe (nouvel onglet), `**gras**`.

## Règles

- Contenu prêt à publier seulement. Aucun secret, aucun brouillon, aucune donnée personnelle.
- Un article ne doit jamais être modifié dans le site à la main : on corrige `post.json` ici et on réimporte.
