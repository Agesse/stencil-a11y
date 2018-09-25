Pea11y Rating
=============

Ce composant permet de noter ou d'afficher une note, naviguable au clavier.

Congiguration
-------------
Liste des parametres :
* **max** : *number: 5* nombre d'icones a afficher
* **value** : *number: null* force la valeur selectionnee 
* **allow-empty** : *boolean: true* autorise ou non 0 comme valeur
* **readonly** : *boolean: false* Mode lecture seule 
* **text-values** : *string[]: null* Donne des alternatives textuelles aux valeurs numériques.
* **labelled-by** : *string: null* Indique l'id d'un element qui sert de label au composant
* **label** : *string: null* Label du composant
* **template-selected** : *string: ★* Template HTML appliqué de la 1ère icône à l'icône dont la valeur est sélectionnée.
* **template-empty** : *string: ☆* Template HTML appliqué aux icônes après la valeur sélectionnée.
* **template-hover** : *string: ★* Template HTML appliqué de la 1ère icône à l'icône survolée.


Evenements du composant
-----------------------
* **on-hover** : fonction permettant de connaitre la valeur survolee
