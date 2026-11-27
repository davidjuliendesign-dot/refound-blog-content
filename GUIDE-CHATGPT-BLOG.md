# Guide : écrire et publier un article du blog ReFound

Ce guide te donne la méthode complète que Claude utilise pour créer un article bilingue (FR + EN) sur refoundapp.ca : choix du sujet, recherche, rédaction, visuels, fichier `post.json` et publication. Suis-le à la lettre. Le but : des articles utiles, exacts, qui se positionnent dans Google, sont cités par les moteurs IA et apportent quelque chose qu'aucune autre page n'offre.

Principe de base : ne jamais publier un article juste pour publier. Chaque article répond à une vraie recherche et a une raison claire d'exister.

---

## 1. Sources de vérité (à relire avant chaque article)

Le repo est public : https://github.com/davidjuliendesign-dot/refound-blog-content

| Fichier | Rôle | Adresse brute |
|---|---|---|
| `facts/product.md` | Faits sur l'app. **La seule source pour parler de ReFound.** Il prime sur tout le reste, y compris ce guide. | https://raw.githubusercontent.com/davidjuliendesign-dot/refound-blog-content/main/facts/product.md |
| `facts/return-policies.ts` | Délais de retour utilisés par l'app pour estimer la date limite | https://raw.githubusercontent.com/davidjuliendesign-dot/refound-blog-content/main/facts/return-policies.ts |
| `SCHEMA.md` | Format exact de `post.json` | https://raw.githubusercontent.com/davidjuliendesign-dot/refound-blog-content/main/SCHEMA.md |
| `kit/README.md` + `kit/receipts.json` | Vrais reçus nettoyés (un par magasin) pour les exemples, et leurs règles | https://raw.githubusercontent.com/davidjuliendesign-dot/refound-blog-content/main/kit/README.md |
| `tools/brand.md` | Charte visuelle | https://raw.githubusercontent.com/davidjuliendesign-dot/refound-blog-content/main/tools/brand.md |
| Article modèle | L'exemple à imiter (surtout « Après le délai de retour » et les tableaux d'exemples réels) | https://raw.githubusercontent.com/davidjuliendesign-dot/refound-blog-content/main/posts/politique-retour-canadian-tire/post.json |
| Articles publiés | Pour éviter les doublons et faire des liens internes | https://refoundapp.ca/sitemap.xml |

Si tu ne peux pas lire un de ces fichiers, dis-le à David et demande-le. Ne devine jamais son contenu.

---

## 2. Choisir le sujet

1. Lis le sitemap et la liste des articles (`posts/` dans le repo). **Pas de doublon** : si un article répond déjà à la même recherche, propose plutôt de l'améliorer.
2. Choisis la meilleure occasion dans ces territoires : reçus (garder, numériser, reçu pâli ou perdu, preuve d'achat) ; retours (délais, politiques par marchand, retour sans reçu, cadeaux) ; garanties (magasin, fabricant, garantie d'échange, garantie légale du Québec, garantie de bon fonctionnement) ; marchands ; organisation familiale.
3. Priorité aux grappes existantes : Canadian Tire, IKEA, Home Depot, RONA, Walmart, Costco, Best Buy ; retours ; garanties ; preuve d'achat ; famille. Pense à la saison (Fêtes, Vendredi fou, déménagement, rentrée).
4. Marchands optimisés dans l'app (bons sujets, l'app enrichit mieux leurs reçus) : Canadian Tire, Walmart, RONA, Home Depot, Best Buy, Shoppers Drug Mart (Pharmaprix), Loblaws, Provigo, Staples (Bureau en Gros), Sports Experts, Canac, BMR, Costco, Dollarama, Giant Tiger (Tigre Géant), Decathlon.
5. Note pour toi : requête principale, intention de recherche, questions secondaires, articles existants à lier, et l'apport original prévu (section 4).

---

## 3. Recherche et fiche de faits (avant d'écrire une ligne)

Fais une fiche de **15 à 25 faits**, chacun avec : l'affirmation, la source, l'URL, la date de vérification (aujourd'hui) et l'endroit où tu l'utiliseras.

Règles :
- Sources dans cet ordre : gouvernement et loi (opc.gouv.qc.ca, canada.ca, ised-isde.canada.ca) ; marchand ou fabricant officiel ; documentation officielle ; organisme reconnu. Évite les sites de résumés de politiques (returnspolicy, storepolicies, etc.) et les concurrents.
- **Chaque délai, durée ou montant est confirmé mot pour mot sur la page officielle**, en français et en anglais quand la page existe. Si la version française est introuvable, cite la page anglaise avec « (page consultée en anglais) ».
- Une politique ambiguë : dis qu'elle est ambiguë. Une info importante non confirmée : ne l'utilise pas.
- Une page qui ne se charge pas : trouve la même info sur une autre page officielle. Ne remplis jamais un trou avec ta mémoire.
- Ne dis jamais « aucune prolongation des Fêtes » sans avoir vérifié la page du jour ; écris plutôt « la page ne mentionne aucune prolongation (vérifié le …) ».

Repères légaux déjà vérifiés par Claude (à revérifier sur opc.gouv.qc.ca avant usage) :
- Au Canada, une entreprise n'est pas obligée d'accepter un retour, sauf si l'article est défectueux (Bureau de la consommation).
- Au Québec, la garantie légale s'applique automatiquement et sans frais : un bien doit servir à un usage normal pendant une durée raisonnable ; on peut s'adresser au commerçant, au fabricant ou aux deux ; le commerçant ne peut pas obliger à passer par le fabricant.
- Garantie de bon fonctionnement (depuis le 5 octobre 2026) : 14 appareils neufs ; 6 ans (cuisinière, réfrigérateur, congélateur, climatiseur, thermopompe), 5 ans (laveuse, sécheuse, lave-vaisselle), 4 ans (téléviseur), 3 ans (ordinateur portable ou de bureau, console, cellulaire, tablette), à partir de la livraison.

---

## 4. Apport original (obligatoire)

Un article qui ne fait que résumer une page officielle est **refusé** : Google et les moteurs IA citeraient la source, pas ReFound. Chaque article contient au moins une section qui n'existe nulle part ailleurs :

- **De vrais exemples de reçus** tirés de `kit/receipts.json` : ligne imprimée (ex. « BAT VIC FUS HR ») → produit identifié par ReFound → garantie → date limite de retour. Règles de `kit/README.md` : dire « un reçu réel » ou « un de nos reçus de test », jamais « le reçu de David » ; jamais de code-barres, numéro de transaction, chiffres de carte, numéro d'autorisation ou de fidélité, adresse de rue ; une date limite en 2053 veut dire « aucune date limite » ; respecter les mises en garde (Costco, Decathlon, Bureau en Gros).
- **L'angle « après le délai de retour »** : garantie d'échange du magasin, garantie du fabricant, garantie légale du Québec, garantie de bon fonctionnement. La garantie ne prolonge pas le délai de retour : c'est un autre recours (réparation, échange, remboursement selon le cas).
- **Un calcul, une comparaison entre marchands ou une ligne du temps** construite à partir des sources (ex. « acheté le 27 novembre → dernier jour le 27 décembre »). Explique comment tu as compté.
- **Le problème que le reçu ne règle pas seul** : description abrégée illisible, garantie absente du reçu, papier thermique qui pâlit, reçu par courriel perdu, carte de paiement oubliée. Puis comment ReFound aide, sans exagérer.

---

## 5. Ce qu'on peut dire de l'app (et ce qu'on ne dit jamais)

Toujours vérifier dans `facts/product.md`. Au 18 novembre 2026 :

**Gratuit :** numérisation illimitée de reçus de n'importe quel marchand (photo, reçus longs, import de la galerie) ; enrichissement des articles (vrai nom, image, lien vers la fiche, garantie) **quand l'information est disponible** ; date limite de retour estimée selon la politique **générale** du marchand ; mode retour au comptoir (code-barres du reçu quand il a été détecté, mode de paiement, photo du reçu, liste des articles, « Article à retourner ») ; noms de cartes (4 derniers chiffres, carte physique ou Apple Pay / Google Pay) ; partage d'un reçu à la fois ; recherche parmi ses reçus (magasin, date, montant).

**ReFound Pro (4,99 $ par mois ou 39,99 $ par an) :** rappels de retour (3 jours avant) et de garantie (30 jours avant) ; recherche par article (nom ou caméra) ; sauvegarde cloud.

**Jamais :** recherche par article gratuite ou « 3 recherches gratuites » ; délais par catégorie de produit connus par l'app ; surveillance ou alerte de rappels de produits ; remises en argent ; notes de frais ou export comptable ; dossier partagé ; « fonctionne avec tous les reçus », « OCR à 100 % », « tous les produits identifiés » ; « accepté par [marchand] » ou partenariat ; « remplace le reçu original » ; « app n° 1 » ; « toutes les données restent au Canada » ; économies chiffrées ; app fiscale ou comptable.

Formulations sûres : « Vous pouvez numériser les reçus de n'importe quel marchand ; l'information produit plus riche dépend du marchand et des données disponibles. » « Sur un reçu réel de ce magasin, ReFound a identifié la ligne abrégée comme [produit]. »

Si un marchand n'est pas dans `facts/return-policies.ts`, ne promets pas que l'app affiche sa date limite.

---

## 6. Rédaction (SEO + moteurs IA + humains)

- **Longueur :** environ 1200 à 2000 mots par langue.
- **Intro :** le premier paragraphe est la réponse directe (« Réponse courte : … »). Le deuxième dit ce que l'article ajoute. Le troisième donne la date de vérification et rappelle que la page officielle a le dernier mot.
- **Chaque H2 :** 1 à 3 phrases de réponse directe, compréhensibles hors contexte ; puis explication, conditions, source, exemple.
- **Formats :** tableaux pour comparer, étapes pour une marche à suivre, encadrés (`callout`) pour une mise en garde. FAQ seulement si elle ajoute des réponses utiles (4 à 5 questions).
- **Ton :** clair, pratique, calme, direct. Vouvoiement. Pas de « naviguer dans le monde complexe de… », pas de remplissage, pas de fausse urgence, pas de « révolutionnaire », pas de conclusion qui répète l'intro.
- **SEO :** `metaTitle` ≤ 70 caractères (finit par « | ReFound »), `metaDescription` ≤ 160, slug FR court (ex. `politique-retour-jean-coutu`), slug EN traduit (ex. `jean-coutu-return-policy`), mot-clé dans le H1, le premier paragraphe et au moins un H2.
- **Anglais :** traduction du sens, pas mot à mot. Lexique : reçu / receipt ; preuve d'achat / proof of purchase ; politique de retour / return policy ; garantie du fabricant / manufacturer warranty ; garantie d'échange / exchange warranty ; date limite de retour / return deadline ; garantie légale / legal warranty ; garantie de bon fonctionnement / warranty of good working order.
- **Liens internes :** 3 ou 4 dans `related`, plus quelques-uns dans le texte. Format `[libellé](/blog/slug)` en FR et `[label](/en/blog/slug-en)` en EN. **Vérifie chaque lien** : la page doit s'ouvrir ET avoir un vrai titre (le site renvoie une page même pour une adresse inexistante ; son titre est alors le titre générique du site).
- **CTA :** relié au problème de l'article. Ex. « Prenez le reçu en photo en rentrant : ReFound garde une copie lisible, le mode de paiement et la liste des articles. » Jamais « Téléchargez ReFound et révolutionnez vos reçus! »
- **Sources :** 5 à 8 sources officielles avec `accessed` (date du jour). `factCheckLabel` : « Faits vérifiés le 27 novembre 2026 » / « Facts checked November 27, 2026 ».

### Les 7 passes de révision (une à la fois)
1. Exactitude de chaque fait. 2. Chaque source soutient vraiment l'affirmation. 3. La vraie question du lecteur est réglée vite. 4. SEO (titre, H1, H2, méta, slug, liens). 5. Moteurs IA (réponses explicites et autonomes). 6. Humanisation (formules génériques, répétitions, ton pub). 7. Chaque phrase sur ReFound est conforme à `facts/product.md`.

---

## 7. Visuels

Il y a deux familles d'images, avec des règles différentes.

### 7a. Photos générées (ton générateur d'images)
Utilise-les pour la **couverture** et, au besoin, une photo d'ambiance dans l'article.
- **Aucun texte, aucun chiffre, aucun logo** dans l'image générée. Pas de logo ni d'enseigne de magasin reconnaissable, pas de marque de produit lisible.
- **Jamais** de faux reçu lisible, de fausse capture de l'app ReFound, de fausse étiquette de prix, de personne réelle connue.
- Scènes concrètes du Québec : comptoir de retour, reçus dans un tiroir, cadeau qu'on emballe, appareil brisé sur un comptoir de cuisine, téléphone qui photographie un reçu (écran vide ou flou).
- Couverture : **1200 × 630**, sert en FR et en EN (donc sans texte). Lumière naturelle, couleurs qui vont avec le fond sombre du blog (#14181F) et l'émeraude (#1EB885).
- Texte alternatif honnête qui décrit la scène.

### 7b. Graphiques et tableaux visuels (en code, jamais générés)
Tout visuel qui contient des **données** (dates, délais, durées, comparaisons) est construit en code avec les vraies polices, jamais par le générateur d'images :
- 1200 × 675, une version FR et une version EN.
- Fond #14181F, texte #F0F2F5, cartes #1D222A, bordures #272C34, texte secondaire #8491A4, émeraude #1EB885, doré #F6B828.
- Polices : Funnel Display (titres, 700/800) et DM Sans (texte, 400/500/700), fichiers .ttf de fonts.google.com, avec Pillow ou matplotlib.
- Logo clair en bas à droite : https://raw.githubusercontent.com/davidjuliendesign-dot/refound-blog-content/main/tools/assets/logo-refound-light.png
- **À l'échelle** (une barre de 90 jours est trois fois plus longue qu'une de 30), avec la source et la date de vérification en bas du visuel.
- Exemples utiles : délais de retour par catégorie ; dates limites selon la date d'achat ; retour vs garantie sur une ligne du temps en années ; tableau comparatif entre marchands.
- Un reçu montré dans un visuel est **dessiné** avec les lignes de `kit/receipts.json`, avec des barres grises à la place des éléments exclus.

Regarde chaque image avant de la livrer : texte coupé, chevauchement, faute d'accent, chiffres conformes à la fiche de faits.

---

## 8. Le fichier `post.json`

Format complet dans `SCHEMA.md`. Points essentiels :

```
posts/<slug>/post.json
posts/<slug>/images/cover.png          (1200 × 630)
posts/<slug>/images/<visuel>-fr.png     (1200 × 675)
posts/<slug>/images/<visuel>-en.png
```

```json
{
  "schemaVersion": 1,
  "slug": "<slug-fr>",
  "frPath": "/blog/<slug-fr>",
  "enPath": "/en/blog/<slug-en>",
  "datePublished": "2026-11-27T09:00:00-05:00",
  "dateModified": "2026-11-27T09:00:00-05:00",
  "lastFactCheck": "2026-11-27",
  "cover": { "src": "/images/blog/<slug-fr>/cover.png", "width": 1200, "height": 630 },
  "assets": ["cover.png", "<visuel>-fr.png", "<visuel>-en.png"],
  "fr": { ... objet langue ... },
  "en": { ... objet langue ... }
}
```

Objet langue : `metaTitle`, `metaDescription`, `keywords`, `category` (« Guide »), `date` (« 27 novembre 2026 » / « November 27, 2026 »), `readingTime` (« 8 min de lecture » / « 8 min read »), `breadcrumb`, `eyebrow` (« Retours », « Garanties »…), `h1`, `card` {`title`, `subtitle`}, `coverAlt`, `intro` (liste de paragraphes), `sections` [{`heading`, `blocks`}], `faqTitle`, `faq` [{`q`, `a`}], `ctaTitle`, `ctaBody`, `relatedTitle`, `related` [{`label`, `href`, `desc`}], `sourcesTitle`, `sources` [{`label`, `publisher`, `url`, `accessed`}], `factCheckLabel`.

Blocs : `p` {text} ; `h3` {text} ; `bullets` {items} ; `steps` {items} ; `table` {caption, headers, rows} ; `figure` {src, width, height, alt, caption} ; `callout` {tone: "info" ou "warning", title, text}. Dans le texte : `**gras**`, `[lien interne](/blog/slug)`, `[lien externe](https://…)`.

Pièges qui font échouer la publication :
- **Aucune chaîne vide**, nulle part. Exemple réel d'échec : un tableau dont le premier en-tête était `""`. Mets « Critère » / « Rule ».
- Chaque fichier de `assets` existe dans `images/`, et chaque `src` commence par `/images/blog/<slug>/`.
- Le JSON doit être valide (vérifie-le en Python avec `json.load`).
- Pas de secret, de brouillon ni de donnée personnelle : le repo est public.

---

## 9. Publication

1. **Dépôt dans GitHub.** Si tu peux écrire dans le repo de façon fiable, pousse `posts/<slug>/` sur `main`. Sinon, livre à David un dossier `<slug>` (post.json + images/) : il le dépose sur github.com (dossier `posts/`, « Add file » → « Upload files », message de commit « <slug>: post FR/EN »).
2. **Attendre quelques minutes** que https://raw.githubusercontent.com/davidjuliendesign-dot/refound-blog-content/main/posts/<slug>/post.json serve la bonne version (cache de GitHub).
3. **Vibecode, projet « ReFound Web » seulement** (jamais le projet mobile « ReFound »). David envoie ce message, mot pour mot :
   > Publie l'article <slug> : dans webapp, exécute uniquement `npm run import-post -- <slug>` puis le build. Ne modifie aucun autre fichier. Si l'import ou le build échoue, n'essaie pas de corriger : arrête et donne l'erreur.
4. Si l'import échoue : corrige `post.json` selon l'erreur, redépose-le, attends le cache, et relance **une seule fois**. Ne demande jamais à Vibecode de corriger lui-même : ça coûte des crédits et ça peut toucher d'autres fichiers.
5. Une fois le build réussi : **Deploy** dans Vibecode.
6. **Vérification en ligne** des deux pages (FR et EN) : bon titre d'onglet, H1, images qui s'affichent, liens internes qui marchent, et les deux adresses présentes dans https://refoundapp.ca/sitemap.xml.

Pour mettre à jour un article : même commande, l'import écrase l'ancienne version. Ne modifie jamais un article directement dans le code du site.

---

## 10. Livraison à David

- Titre FR, les deux liens, l'apport original en une phrase.
- La fiche de faits (ou au moins la liste des sources avec date).
- Tout fait non vérifiable, tout écart entre `facts/product.md` et ce que tu as vu, et toute décision à prendre.
- Ensuite seulement, le carrousel de l'article selon `social/GUIDE-CHATGPT.md`.
