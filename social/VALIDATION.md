# Validation des carrousels par des utilisateurs types

Avant de planifier un carrousel ou de le montrer à David, on le fait lire par 3 sous-agents qui jouent
des utilisateurs réels. Ils regardent les PNG, disent où ils comprennent, où ils décrochent et ce qu'ils
feraient (envoyer, enregistrer, commenter, s'abonner, aller sur le site). On corrige, puis on refait lire.

Premier essai (18 novembre 2026, carrousel `rappel-produit-recu`) : notes de 4, 4 et 6/10 au départ,
puis 8, 7,5 et 8,5/10 après trois rondes. David a ensuite jugé le sujet trop pointu : la validation vérifie aussi que le sujet concerne la persona (question 0).

## Quand
Étape obligatoire entre le rendu des PNG et la planification dans Metricool (ou l'envoi à David).

## Comment
1. Lancer les 3 personas **en parallèle** (outil Agent, un message avec 3 appels), chacun avec le
   gabarit ci-dessous. Leur donner les chemins des PNG et de `caption.md`, jamais nos conclusions.
2. Corriger ce qui revient chez au moins 2 personas, et tout ce qu'une persona « ne comprend pas ».
3. Refaire lire la nouvelle version (SendMessage aux mêmes agents, réponse courte) jusqu'à ce que
   **chaque persona donne au moins 7/10** et qu'aucune diapo ne soit « pas comprise ». Maximum 3 rondes.
4. Ne jamais appliquer une suggestion qui inventerait un fait : ligne de reçu fictive présentée comme
   vraie, photo de produit sans droits, fausse capture d'écran de l'app, promesse absente de
   `facts/product.md`. La signaler plutôt à David.
5. Dans le message à David : les notes de départ et finales, et ce qui a changé.

## Les 3 personas
- **Julie**, 38 ans, Laval, mère de deux enfants, travaille à temps plein, achète chez Canadian Tire,
  Costco, Walmart ; fait défiler Facebook et Instagram le soir, 1 à 2 secondes par publication ;
  garde ses reçus dans un tiroir. Images : `fr-NN.png`. Légende : ligne [Instagram].
- **Samuel**, 26 ans, Montréal, locataire, électronique et sport (Best Buy, Canadian Tire, Amazon) ;
  TikTok, swipe seulement si la 1re image intrigue ; déteste les longs textes et ce qui ressemble à de
  la pub. Images : `tt-fr-NN.png`. Légende : ligne [TikTok].
- **Gilles**, 63 ans, Sherbrooke, retraité propriétaire, outils, souffleuse, chauffage (Canadian Tire,
  RONA) ; lit plus longtemps mais déteste le confus et le technique ; partage des conseils pratiques à
  sa famille sur Facebook. Images : `fr-NN.png`. Légende : ligne [Facebook].

## Gabarit de consigne (à adapter avec la persona et les chemins)
> Tu joues un utilisateur réel qui voit passer un carrousel dans son fil [réseau]. Reste dans le
> personnage et sois franc, même sévère : on veut savoir si le contenu marche vraiment.
> Personnage : [description]. Il/elle ne connaît pas l'app ReFound.
> Regarde dans l'ordre ces images (outil Read) : [chemins]. Puis lis la légende FR dans [caption.md].
> Réponds en français :
> 0. Ce sujet te concerne-t-il, toi, en ce moment (oui/non, pourquoi)?
> 1. Première image : t'arrêtes-tu? Pourquoi (une phrase)?
> 2. Pour chaque diapo : compris en moins de 3 secondes (oui/non), ce que tu retiens en 5 mots,
>    continues-tu (oui/non, pourquoi)?
> 3. Où décroches-tu?
> 4. Actions : enregistrer, envoyer (à qui?), commenter (quoi?), t'abonner, aller sur le site :
>    oui/non et pourquoi.
> 5. Les 3 diapos les plus faibles et pourquoi.
> 6. 3 suggestions concrètes.
> Note globale sur 10 pour « je m'arrête, je comprends, je fais quelque chose ».

## Leçons du deuxième essai (19 novembre 2026, `retourner-cadeau-noel` : 5,5 / 6 / 7 → 8 / 7,5 / 9)
- **Choisir un sujet qui concerne beaucoup de monde maintenant** (saison, Vendredi fou, Fêtes, déménagement, impôts). David a refusé le carrousel sur un rappel de souffleuse vieux d'un an : trop pointu, pas actuel. Le carrousel n'est pas obligé de reprendre l'article du jour : s'il est trop pointu, prendre un article du blog plus large et de saison.
- **Montrer les magasins des gens** : Canadian Tire, Walmart, Costco, RONA, Home Depot, Best Buy. Chaque persona cherche « ses » magasins ; sans eux, ni enregistrement ni partage.
- **Le calcul en clair** (« 27 novembre + 30 jours = 27 décembre ») rend un chiffre-choc crédible en une seconde.
- **Une liste de magasins ne doit pas avoir de numéros** (`plain: true`) : sinon elle ressemble à des étapes.
- **Les conseils que tout le monde connaît font décrocher.** Les remplacer par ce que l'app fait de plus qu'une photo dans la galerie (recherche, mode retour, partage), seulement avec `facts/product.md`.
- **Un exemple de reçu hors sujet (bâton de hockey dans un carrousel sur l'électronique) et un code de caisse brut perdent les gens.** Mieux vaut aucun exemple.
- **Dernière diapo : une action précise** (« Téléchargez ReFound avant le Vendredi fou »), pas seulement une adresse web.
- **L'app seulement à la dernière diapo** (demande de David), nommée « l'app ReFound », et reliée au problème posé juste avant (ici : envoyer le reçu à la personne qui fait l'échange). Avant, une diapo « ce que fait l'app » au milieu n'était pas comprise comme parlant d'une app.
- **Un seul sujet, des titres génériques** (remarque de David) : ne pas commencer par un magasin et finir par un autre. Les titres parlent à tout le monde (« un cadeau électronique », « pas de reçu? ») ; les magasins précis vont dans le contenu (liste de dates) ou en petit (« Exemple : la politique d'IKEA »).
- **Un geste réaliste** : personne ne prend son reçu en photo à la caisse (remarque de David). Proposer un moment naturel : en rentrant, en déballant les achats, en emballant le cadeau.
- **Pas de paragraphe de conseils à la dernière diapo** : une phrase, une action.
- Pour ce carrousel seulement, les personas voulaient voir l'app : on a ajouté une capture du partage d'un reçu, parce que la fin parlait justement d'envoyer le reçu. Ce n'est pas une règle : une capture de l'app ne s'ajoute que si la diapo parle de cette fonction et qu'une capture adaptée existe. Toute capture doit être nettoyée (aucun nom, numéro de carte, code-barres, adresse ni numéro de transaction lisibles) et ne jamais présenter une fonction Pro comme gratuite. Capture disponible : `tools/assets/app-partage-recu.png` (partage d'un reçu).

## Leçons du premier essai (à appliquer dès la première version)
- **Un seul sujet concret du début à la fin** : un produit, un magasin, un modèle nommés. Une accroche
  générique (« un rappel 6 ans après ») accroche moins qu'un produit qu'on reconnaît.
- **Tenir la promesse de l'accroche à la diapo 2** : l'action concrète (« remboursement complet,
  n'importe quel magasin, 1-800… »). Ne pas faire attendre.
- **Jamais de message qui semble contredire l'app** (« le reçu n'est pas toujours exigé ») sans le
  résoudre honnêtement dans la même diapo (« l'avis n'en parle pas : apportez-le, il prouve votre
  modèle et votre date »).
- **Une idée par diapo, sans jargon** (« au même format que les numéros d'article » a perdu tout le
  monde). Un visuel simple vaut mieux qu'un paragraphe : un reçu dessiné avec la ligne surlignée a été
  compris par les trois.
- **Pas de diapo qui répète** : 5 à 7 diapos suffisent. Les personas sautent ce qu'elles ont déjà vu.
- **Un exemple doit coller à l'histoire** ; sinon, l'étiqueter « Exemple : un vrai reçu ». Des produits
  hors sujet (bâton de hockey, butane) sans explication font croire qu'ils sont rappelés.
- **Dernière diapo : ce que fait l'app, concrètement** (photo du reçu → copie lisible → vrai nom du
  produit), « Gratuit, iPhone et Android ». Ne pas renvoyer ailleurs dans la phrase qui présente l'app.
- **Sources du pied de page : seulement celles du carrousel** (une source hors sujet a fait douter).
- **Promesses exactes** : « une copie lisible, même si le papier pâlit » plutôt que « pour toujours ».
- **Ce qui fait partager** : une alerte précise qu'on envoie à quelqu'un (« check ta souffleuse »).
  La légende le dit : « Envoyez-le à quelqu'un qui a une souffleuse. »

## Leçons du troisième essai (19 novembre 2026, `politique-retour-dollarama` : 5 / 4 / 5,5 → 8 / 6,5 / 8)
- **Un calcul évident sur une diapo entière (« 1er déc. + 30 jours = 31 déc. ») a été jugé condescendant par les trois.** Le calcul marche quand il révèle une surprise (cadeaux de Noël), pas quand il est attendu.
- **Ce qui manquait le plus : le « comment ».** Où signaler, avec quoi. Une diapo de marche à suivre est celle que les personas enregistrent.
- **Un mot de la politique officielle peut sembler contradictoire** (« inutilisé » pour un article défectueux) : l'enlever de la diapo s'il n'est pas essentiel, le garder dans l'article.
- **La garantie légale du Québec, avec une action** (« même après 30 jours, magasin ou fabricant, avec le reçu »), est ce qui fait partager Gilles et Julie.
- **Ne pas donner la réponse dans l'accroche** si la diapo 2 la donne : sinon la 2 devient un doublon.
- **L'exemple avant/après de l'app (ligne du reçu → produit identifié, avec photo) rend la dernière diapo claire**, mais un nom de produit en anglais dans un carrousel français accroche les trois personas : choisir de préférence un exemple du kit dont le nom identifié est en français.
- Samuel (TikTok) reste sous 7 : une 1re image texte sur fond noir ne l'arrête pas, et un article à 4 $ ne le concerne pas.

## Leçons du quatrième essai (20 novembre 2026)
- **Souffleuse à neige** (`politique-retour-bmr`, non planifié) : 4,5 / 3 / 6,5. Seul Gilles (propriétaire) était concerné ; Julie a un contrat de déneigement, Samuel est locataire. Une liste de vérifications évidentes (« le bon modèle ») fait décrocher.
- **Ajustement de prix avant le Vendredi fou** (`ajustement-de-prix`) : 7 / 7 / 6 → 8 / 7,5 / 7,5. De l'argent à récupérer, une semaine avant le Vendredi fou, avec Walmart et Best Buy : les trois se sentent concernés.
- La diapo **« Comment réclamer »** (3 étapes) a fait le plus gagner : sans elle, personne ne savait quoi faire.
- Une ligne exacte mais neutre (« sa politique n'en parle pas ») n'est pas comprise : dire quoi faire (« aucun ajustement annoncé · demandez au comptoir »).
- Fin qui marche : un geste concret dans l'app (« Tapez “Best Buy” : le reçu sort ») plutôt qu'une description.
- Encore demandé : un montant en dollars à la diapo 1 et une capture de l'app (recherche) ; Costco et RONA.

## Leçons du cinquième essai (21 novembre 2026, `politique-retour-joe-fresh` : 5 / 3 / 5 → 7,5 / 6 / 8)
- **Le reçu dessiné avec la ligne surlignée en diapo 1** (« Un chandail acheté chez Maxi? Il est caché ici. ») a arrêté les trois, alors qu'une accroche texte sur fond noir ressemblait à une pub. Expliquer le code juste en dessous (« il s'appelle “SW HOODY” »).
- **Une diapo de calculs (77, 58, 30 jours) après la date-choc répète la diapo 2** : la fusionner (« Acheté au Vendredi fou (27 nov.)? 58 jours au lieu de 30 »). Toujours dater le Vendredi fou.
- **« Peu importe où vous l'avez acheté » n'est pas compris** ; « Acheté chez Maxi, rapporté chez Loblaws? C'est accepté » l'est.
- **Une réserve (« Provigo : appelez avant ») sur une diapo fait douter** : la mettre dans la légende.
- **Le geste de fin doit dire où** : « Dans l'app, tapez “Maxi” » (et non « Au comptoir, tapez… », compris comme la caisse).
- Samuel (26 ans, TikTok) reste sous 7 sur un sujet d'épicerie familiale : ce n'est pas sa cible.

## Leçons du sixième essai (22 novembre 2026, `politique-retour-walmart` : 4 / 4,5 / 5,5 → 7,5 / 7 / 8)
- **Un produit trop précis en accroche (« une console ») exclut** : Julie et Gilles ont décroché. Nommer une catégorie large mais exacte (« votre électronique »).
- **Une accroche plus large que la règle (« vos achats ») est jugée survendue** par les trois quand la diapo suivante restreint : l'accroche doit déjà porter la condition principale.
- **Une contradiction entre deux diapos (« non ouvert » / « cadeau déballé ») ruine la crédibilité** juste avant l'app.
- **Les exclusions en jargon (« Marché électronique », « postpayé ») ne sont pas comprises** : « un vendeur tiers sur walmart.ca », « cellulaire avec forfait », et dire explicitement « en magasin : oui ».
- **« Le reçu, il sera où? » ne fait pas peur** (« dans mon tiroir ») ; **« le papier d'un reçu pâlit »** oui, et il prépare la fin (« les garde lisibles »).
- **Fin : le geste d'abord** (« Prenez vos reçus en photo en rentrant »), l'app ensuite.

## Leçons du septième essai (23 novembre 2026)
- **Reitmans** (`politique-retour-reitmans`, non planifié) : 5,5 / 4 / 5. La règle du ,97 $ (diapo 2) est jugée « LE truc à envoyer », mais aucune persona ne magasine chez Reitmans : un magasin de vêtements pour femmes ne rejoint pas Gilles ni Samuel. La diapo « deux T-Shirts, impossible de savoir lequel » n'a pas été comprise (le prix dit lequel ; le vrai problème, quel morceau dans le sac, n'était pas montré).
- **Canadian Tire, Vendredi fou** (`politique-retour-canadian-tire`) : 7,5 / 7 / 7,5 → 8,5 / 8 / 8,5. Bon magasin, bon moment, exemples concrets (démarreur à distance, écouteurs, télé). Les trois ont demandé que les jours de la diapo 1 (14, 30, 90) se retrouvent à côté des dates de la diapo 2 (« 14 jours → 11 déc. »).
- **« Aucune prolongation des Fêtes » est une non-information** pour qui ne savait pas qu'il pouvait y en avoir une : remplacée par « Il brise après la date limite? » (garantie légale, le reçu prouve la date et le prix), la diapo la plus forte pour Gilles et Samuel.
- **« Sans reçu : recherche avec votre carte » affaiblit la fin** (« alors je n'ai pas besoin de l'app ») : préciser « carte de crédit ou de débit », et ne pas en faire un argument.
- **Le pied de page doit citer la source de chaque diapo** : la garantie légale vient de l'OPC, pas du marchand (relevé par les trois).

## Leçons du huitième essai (24 novembre 2026, `garantie-bon-fonctionnement-quebec` : v1 outils 5 / 4,5 / 7 → v3 8 / 7,5 / 8,5)
- **« Outil » et Princess Auto excluent Julie et Samuel** (« c'est mon chum qui achète les outils »). La même idée (le recours après le délai de retour) passe chez les trois avec une télé et une console du Vendredi fou.
- **Un chiffre précis bat une règle floue** : « 4 ans de réparation gratuite pour une télé » arrête les trois ; « durée raisonnable » et l'exemple du marteau de 100 $ ont été jugés vagues. Garder la durée raisonnable comme dernière ligne d'une liste, pas comme diapo.
- **Une date de début (« depuis le 5 octobre 2026 ») inquiète ceux qui ont acheté avant** : dire tout de suite ce qui s'applique alors (« Acheté avant? La durée raisonnable s'applique »).
- **Une diapo de magasins seule n'apprend rien** : les magasins vont en sous-ligne de l'étape « Allez au magasin ».
- Encore demandé par les trois : un visuel autre que du texte sur fond noir (reçu effacé, capture de l'app à la dernière diapo).
