# Oracle & Nombres

Site d'une page : un **thème numérologique offert** (chemin de vie, nombre d'expression, nombre intime, nombre de personnalité, année personnelle, planète dans l'Oracle Belline) et une **prestation de tirage de l'Oracle Belline** (formules, lame du jour selon la méthode du Mage Edmond, réservation).

Le nom « Oracle & Nombres » est provisoire.

## Voir le site

Le site est statique : il n'a besoin d'aucune installation. Dans ce dossier :

```bash
python3 -m http.server 8765
```

puis ouvrir <http://localhost:8765>. Il peut aussi être publié tel quel avec GitHub Pages.

## Fichiers

| Fichier | Contenu |
| --- | --- |
| `index.html` | la page |
| `styles.css` | le style : ciel de nuit bleu sombre, accents dorés, polices Bodoni Moda, EB Garamond et Jost ; une couleur de blason par planète |
| `app.js` | calculs numérologiques, ciel étoilé animé et constellations, dessin des cartes, lame du jour, réservation — **l'adresse e-mail de réservation se règle en haut du fichier** |
| `contenus.js` | tous les textes : interprétations des nombres, les sept familles planétaires, les 53 lames et leurs messages |
| `CONVERSATION.md` | la discussion avec Claude qui a mené au site |
| `recherche/oracle-belline.json` | la recherche vérifiée sur l'Oracle Belline : liste des cartes, identité visuelle, pratique des tirages, points juridiques, sources |

## À compléter avant la mise en ligne

- le nom du site ;
- l'adresse e-mail de réservation (`app.js`) ;
- les emplacements surlignés en jaune : prénom, années de pratique, ville, photo ;
- les tarifs (ce sont des exemples) ;
- les mentions légales, les conditions de vente et la politique de confidentialité, obligatoires pour vendre des consultations en France.

## Points juridiques à garder en tête

- « Belline » est une marque déposée qui couvre aussi les services de cartomancie : on peut écrire « tirage avec l'Oracle Belline », mais pas l'utiliser dans le nom du site, le nom de domaine ou un logo.
- Les cartes affichées sont des créations originales. Ne pas les remplacer par des scans du jeu Grimaud ni par les photos du Mucem sans autorisation.
- Les messages des cartes sont des textes originaux : ne pas y recopier le livret du jeu.
