# Carrousels pour les médias sociaux

Un carrousel par article publié, dans `social/<slug>/`. La routine le planifie dans Metricool
(Facebook, Instagram, TikTok), au meilleur créneau de chaque réseau, jamais en publication
immédiate : David reçoit le contenu le matin et peut annuler ou modifier dans Metricool. Sans
Metricool, rien n'est publié : David les publie lui-même.

Ce guide résume ce qui augmente la portée d'un carrousel en 2026 (recherche du 18 novembre 2026,
sources en bas). Aucune règle ne garantit la viralité : on optimise les signaux que les plateformes
disent utiliser, puis on mesure.

## Ce que les plateformes récompensent
- **Instagram** : les trois signaux principaux sont le temps passé, les mentions J'aime et les
  **envois** (partages en message privé). Les envois comptent un peu plus pour atteindre les
  non-abonnés. Un carrousel non terminé peut être remontré plus tard **à partir de la première diapo
  non vue** : chaque diapo doit pouvoir servir d'accroche. Les carrousels ont le meilleur taux
  d'engagement par personne atteinte ; les Reels, la plus grande portée.
- **Recommandations (non-abonnés)** : contenu original, sans filigrane d'une autre app, sans
  « engagement bait ». Demander explicitement un commentaire précis, un partage ou une
  identification pour gagner de la portée peut exclure la publication des recommandations ; une
  question ouverte ou un appel à l'action sincère reste correct.
- **Mots-clics** : Instagram limite à **5 mots-clics** par publication et dit qu'ils n'aident pas la
  portée ; ils servent à la recherche. Les mots-clés de la légende servent à la recherche Instagram
  et, depuis juillet 2025, à Google (comptes professionnels publics).
- **Facebook** : les publications avec lien sont le format le moins engageant, et Meta limite les
  Pages sans abonnement à **2 liens par mois dans le texte** des publications. Les liens en
  commentaire ne sont pas limités : **le lien va en premier commentaire**.
- **TikTok** : la vidéo reste plus engageante que les photos, mais le mode photo marche pour le
  contenu éducatif. Format **9:16 (1080 × 1920)** ; sinon, bandes noires. Le texte à l'écran et la
  légende servent à la recherche TikTok. Ajouter une musique (Metricool : musique aléatoire, ou une
  des 100 tendances pour un compte Entreprise ; seulement en publication automatique). Le compte
  @refoundapp est personnel : musique aléatoire.

## Format
- **5 à 7 diapos** : la validation par personas montre que les diapos qui répètent font décrocher.
  Jamais de diapo de remplissage.
- Instagram et Facebook : 1080 × 1350 (4:5), `fr-01.png` … `en-01.png` … Garder l'essentiel dans le
  carré central 1080 × 1080 (aperçu de la grille).
- TikTok : 1080 × 1920 (9:16), `tt-fr-01.png` … `tt-en-01.png` …, plus une copie **JPEG** `tt-fr-01.jpg` … : TikTok (via Metricool) refuse le PNG (« 'image/png' type is not allowed, use 'image/jpeg' or 'image/webp' ») ; toujours planifier TikTok avec les `.jpg`. Le tout est rendu par
  `tools/render-carousel.js` avec les zones de sécurité TikTok (haut 200 px, bas 460 px, droite
  130 px).
- Design épuré (demande de David) : **pas de surtitre**, un titre court et au plus une ligne de texte par diapo. Les détails vont dans la légende.
- Chaque image se lit seule, en grand (titre ≤ 8 mots, texte ≤ 12 mots), aux couleurs de
  `tools/brand.md`, avec le compteur « 2/7 ».
- Pas de faux bouton App Store, pas de logo de marchand, pas de filigrane.

## Structure d'un carrousel
1. **Accroche** : un sujet concret qu'on reconnaît (produit, magasin, modèle nommés) et un chiffre ou
   une question. C'est aussi la couverture.
2. **La promesse tenue tout de suite** : l'action concrète ou la réponse, assez forte pour fonctionner
   si le carrousel est remontré à partir de cette diapo.
3. **2 ou 3 diapos de valeur** : une idée par diapo, sans jargon ; un visuel simple (reçu dessiné avec
   la ligne surlignée, ligne d'un reçu réel du kit avec la photo du produit) plutôt qu'un paragraphe.
4. **Une diapo « à garder »** quand le sujet s'y prête (liste à cocher, chiffre à retrouver), ou le
   problème que le reçu ne règle pas seul (papier qui pâlit, ligne illisible).
5. **Fin, et seulement là, l'app** : « L'app ReFound… » en une phrase qui règle le problème posé juste avant,
   « Gratuit, iPhone et Android », et refoundapp.ca. Pas de paragraphe de conseils.

## Validation avant publication
Obligatoire : 3 personas (sous-agents) lisent le carrousel et le notent, on corrige jusqu'à au moins
7/10 chacune. Méthode, personas, gabarit et leçons : `social/VALIDATION.md`.

## Légende (`caption.md`, FR et EN)
- **Première ligne = titre avec le mot-clé recherché** (« Rappel de produit : faut-il le reçu pour
  être remboursé? »). Pas de formule vague.
- 2 à 4 phrases utiles, le même vouvoiement que le site.
- Un appel à l'action ouvert qui donne une raison d'envoyer ou d'enregistrer (« Envoyez-le à la
  personne qui garde les reçus chez vous »). Jamais « commentez X pour recevoir… ».
- **5 mots-clics au maximum**, précis (sujet, marchand, #Québec quand c'est pertinent, #ReFound).
- Facebook : « Le guide complet est en premier commentaire », et le lien de l'article dans le
  premier commentaire.
- Instagram : « Le guide complet : lien du blog dans la bio. » La bio a deux liens :
  refoundapp.ca/download (iPhone et Android) et refoundapp.ca/blog.
- TikTok : « Le guide complet est sur refoundapp.ca, section Blog. » Le compte est personnel : le
  lien de la bio n'est pas cliquable sous 1 000 abonnés (un compte Entreprise lèverait la limite).
- Texte alternatif pour chaque image (Metricool `mediaAltText`) : ce que dit la diapo, avec les
  mots-clés naturels.

## Contenu
- Tiré de l'article du jour et, quand c'est utile, d'un reçu de `kit/receipts.json` (photos :
  `imageFile`, règles de `kit/README.md`).
- Mêmes règles d'exactitude que les articles (`facts/product.md`, sources de l'article). Une
  accroche forte ne doit jamais exagérer un fait.
- Regarder chaque PNG avant de pousser.

## Mesurer (une fois par semaine)
Avec les analyses Metricool, comparer les carrousels sur : envois par portée et enregistrements
(Instagram), portée et clics (Facebook), vues et taux de complétion (TikTok). Garder les sujets et
les accroches qui gagnent ; noter les constats ici.

## Sources (consultées le 18 novembre 2026)
- Buffer, « How the Instagram Algorithm Works » (octobre 2026) : temps passé, J'aime et envois ;
  carrousels remontrés à partir de la diapo non vue ; 5 mots-clics.
- Buffer, « Best Content Format on Social Platforms in 2026 » (mars 2026) : carrousels Instagram
  6,9 % d'engagement médian ; Facebook, liens en dernier (4,43 %) ; TikTok, vidéo 3,39 % vs photos
  1,92 %.
- Socialinsider, « 2026 Instagram Organic Benchmarks » (février 2026) : carrousels 0,55 %, Reels
  0,52 %, images 0,37 %.
- Instagram, « Recommendations and originality » (creators.instagram.com) et précisions sur les
  appels à l'action (Social Media Today, juin 2024).
- Social Media Examiner (février 2026) et Social Media Today (septembre 2026) : limite de 2 liens
  par mois pour les Pages Facebook ; liens en commentaire non limités.
- Metricool : indexation Google des publications Instagram (juillet 2025) ; ajout de musique TikTok.
- Formats TikTok 9:16 : guides TokPortal (mars 2026) et Moda (2026).
