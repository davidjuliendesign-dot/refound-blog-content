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
- **Pas de paragraphe de conseils à la dernière diapo** : une phrase, une action.
- Demande récurrente, à combler par David : une vraie capture d'écran de l'app (mode retour).

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
