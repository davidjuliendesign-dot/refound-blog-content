# Guide : carrousels ReFound à partir des articles du blog

Ce guide te donne la méthode que Claude utilise pour transformer un article de refoundapp.ca en carrousel pour Instagram, Facebook et TikTok. Suis-le à la lettre : il résume ce qui a marché et ce qui a échoué depuis le 18 novembre 2026.

## 1. Sources de vérité (à relire à chaque carrousel)

Le repo est public. Lis toujours la version à jour :

- Faits sur l'app (la seule source pour parler de ReFound) : https://raw.githubusercontent.com/davidjuliendesign-dot/refound-blog-content/main/facts/product.md
- Règles des carrousels : https://raw.githubusercontent.com/davidjuliendesign-dot/refound-blog-content/main/social/README.md
- Leçons des tests avec lecteurs types : https://raw.githubusercontent.com/davidjuliendesign-dot/refound-blog-content/main/social/VALIDATION.md
- Charte visuelle : https://raw.githubusercontent.com/davidjuliendesign-dot/refound-blog-content/main/tools/brand.md
- Articles : https://refoundapp.ca/blog (le contenu source de chaque article : `posts/<slug>/post.json` dans le repo)
- Carrousels déjà faits, pour t'en inspirer et ne pas te répéter : dossier `social/` du repo

Si tu ne peux pas lire ces fichiers, dis-le et demande-les à David au lieu de deviner.

## 2. Règles d'exactitude (non négociables)

- Chaque fait du carrousel (délai, date, montant, règle) vient de l'article et de ses sources officielles. N'invente jamais un chiffre, une politique ou une date.
- Sur l'app, n'affirme que ce qui est dans `facts/product.md`. À ne jamais dire : que la recherche par article est gratuite (c'est Pro), que l'app surveille les rappels de produits, qu'elle connaît les délais de retour par catégorie de produit, qu'elle remplace le reçu original, qu'elle offre des remises en argent ou des exports comptables.
- Une accroche forte n'exagère jamais un fait. Si l'accroche est plus large que la règle (« vos achats » alors que c'est « l'électronique »), elle est fausse.
- Jamais de faux reçu présenté comme vrai, de fausse capture de l'app, de logo de magasin, ni de données personnelles (numéro de carte, code-barres, nom, adresse).

## 3. Choisir le sujet

- Le carrousel doit concerner beaucoup de monde **maintenant** : saison, Vendredi fou, Fêtes, déménagement, impôts, rentrée.
- Montre les magasins où les gens achètent vraiment : Canadian Tire, Walmart, Costco, RONA, Home Depot, Best Buy. Une enseigne trop pointue (vêtements pour femmes, pharmacie, outils seulement) n'atteint qu'une partie du public.
- Si l'article du jour est trop pointu, fais le carrousel à partir d'un autre article du blog, plus large et de saison.
- Un seul sujet du début à la fin. Ne commence pas par un magasin pour finir sur un autre.

## 4. Structure (5 à 7 diapos)

1. **Accroche** : un sujet concret qu'on reconnaît, et un chiffre ou une question. Un gros chiffre-énigme (« 27 déc. », « 3 mots ») arrête mieux qu'une phrase. Ne donne pas la réponse si la diapo 2 la donne.
2. **La promesse tenue tout de suite** : la réponse ou l'action. Cette diapo doit tenir seule, car Instagram remontre un carrousel à partir de la première diapo non vue.
3. **2 ou 3 diapos de valeur** : une idée par diapo, sans jargon. Un calcul en clair (« 27 nov. + 30 jours = 27 déc. ») seulement s'il révèle une surprise. Une diapo « comment faire » (2 ou 3 étapes) est celle qu'on enregistre.
4. **Après le délai** quand ça s'applique : au Québec, la garantie légale (un bien doit durer un temps raisonnable pour son prix), avec le geste concret (« rapportez-le au magasin avec le reçu : réparation, échange ou remboursement »).
5. **Fin, et seulement là, l'app** : « L'app ReFound… » en une phrase reliée au problème de la diapo d'avant, un geste réaliste (en rentrant, en emballant le cadeau ; jamais « à la caisse »), puis « Gratuit, iPhone et Android » et refoundapp.ca. Dis ce que l'app fait de plus qu'une photo dans la galerie (par exemple : « Dans l'app, tapez “Jean Coutu” : la date et la carte qui a payé ressortent »). Si tu parles du reçu original, précise le rôle de chacun : « La photo sert à le retrouver, l'original au comptoir. »

Leçons qui reviennent souvent :
- Les conseils que tout le monde connaît font décrocher (« gardez vos reçus »).
- Deux diapos qui se contredisent ruinent la confiance juste avant l'app.
- Une liste de magasins n'a pas de numéros (sinon on croit que ce sont des étapes).
- Une réserve (« appelez avant ») sur une diapo fait douter : mets-la dans la légende.
- La question qui fait commenter est liée au sujet (« Vos reçus : tiroir, portefeuille ou photo? »), jamais « commentez X pour recevoir… ».

## 5. Design (technique)

Le texte est toujours écrit avec les vraies polices, en code (Python + Pillow, ou une page HTML rendue par un navigateur). Le générateur d'images ne sert qu'aux photos de fond, **sans aucun texte ni logo**.

- Formats : 1080 × 1350 pour Instagram et Facebook (`fr-01.png`…, `en-01.png`…), et 1080 × 1920 pour TikTok (`tt-fr-01.jpg`…, en JPEG). Sur TikTok, rien d'important dans les 200 px du haut, les 460 px du bas et les 130 px de droite.
- Marges : 80 px à gauche et à droite, 84 px en haut, 70 px en bas.
- Couleurs : fond #14181F avec une lueur émeraude douce en haut à droite ; texte #F0F2F5 ; texte secondaire #C9CFD8 ; texte discret #8491A4 ; lignes #272C34 ; émeraude #1EB885 ; doré #F6B828 pour les gros chiffres.
- Polices : titres en Funnel Display ExtraBold (92 px, interligne 1,02) ; texte en DM Sans (40 px, interligne 1,32), passages importants en DM Sans Bold blanc ; gros chiffre en Funnel Display ExtraBold 230 à 250 px, doré.
- Chaque diapo : logo clair en haut à gauche (34 px de haut), compteur « 2/6 » en haut à droite ; contenu centré verticalement ; en bas une ligne fine et la source (DM Sans 22 px, #8491A4), avec « → » sauf sur la dernière.
- Épuré : pas de surtitre, un titre de 8 mots au maximum, au plus une ligne de texte (25 mots au maximum). Les détails vont dans la légende.
- Photo de fond : verticale, espace libre en haut, assombrie par un dégradé #14181F (opaque derrière le texte) pour que le texte reste lisible. Jamais de texte, de faux reçu, de logo de magasin ni d'écran d'app dans la photo.
- Les sources du pied de page sont celles du carrousel, et chaque diapo factuelle cite la sienne (ex. la garantie légale vient de opc.gouv.qc.ca, pas du marchand).
- Regarde chaque image avant de la livrer : texte coupé, chevauchement, faute d'accent.

## 6. Légendes (`caption.md`, FR et EN)

- Première ligne = titre avec le mot-clé recherché (« Politique de retour Jean Coutu : jusqu'à quand retourner un cadeau des Fêtes? »).
- 2 à 4 phrases utiles, en vouvoiement (le tutoiement est permis sur TikTok).
- Un appel à l'action ouvert qui donne une raison d'envoyer ou d'enregistrer (« Envoyez-le à la personne qui achète les petits cadeaux chez vous »).
- 5 mots-clics au maximum (sujet, marchand, #Québec si pertinent, #ReFound).
- Facebook : « Le guide complet est sur refoundapp.ca, section Blog. » (pas de lien complet dans le texte).
- Instagram : « Le guide complet : lien du blog dans la bio. »
- TikTok : « Le guide complet est sur refoundapp.ca, section Blog. » et un titre court avec le mot-clé.
- Un texte alternatif par diapo : ce que dit la diapo, avec les mots-clés naturels.

## 7. Validation avant de livrer

Fais lire le carrousel par 3 lecteurs types, joués séparément et sans complaisance :
- **Julie**, 38 ans, Laval, deux enfants, achète chez Canadian Tire, Costco, Walmart ; fait défiler Facebook et Instagram le soir, 1 à 2 secondes par publication.
- **Samuel**, 26 ans, Montréal, locataire, électronique et sport ; TikTok ; déteste les longs textes et ce qui ressemble à de la pub.
- **Gilles**, 63 ans, Sherbrooke, retraité propriétaire, outils et chauffage ; lit plus longtemps, déteste le confus ; partage des conseils à sa famille sur Facebook.

Pour chacun : ce sujet le concerne-t-il maintenant? S'arrête-t-il à la diapo 1? Comprend-il chaque diapo en 3 secondes? Où décroche-t-il? Enregistrerait-il, enverrait-il (à qui)? Note sur 10.
Corrige ce qui revient chez au moins deux d'entre eux, refais lire, jusqu'à 7/10 minimum pour chacun (3 rondes au maximum). N'applique jamais une suggestion qui inventerait un fait. Donne à David les notes de départ et finales.

## 8. Livraison à David

- Les images (FR et EN, formats Instagram/Facebook et TikTok), `slides` décrites en texte, et `caption.md`.
- Les notes des 3 lecteurs (départ → final) et ce qui a changé.
- Tout fait que tu n'as pas pu vérifier, signalé clairement.
- La planification se fait dans Buffer (Facebook 10 h, Instagram 12 h, TikTok 18 h, heure de Toronto), une publication par réseau et par jour, jamais en publication immédiate.
